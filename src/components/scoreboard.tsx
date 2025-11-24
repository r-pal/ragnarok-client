import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Grid,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useState } from "react";
import { useData } from "../context/DataContext";
import { IHouse } from "types/house";
import { IScore } from "types/shared";
import { ViewHouseModal } from "./House/viewHouseModal";
import { ViewFactionModal } from "./Faction/viewFactionModal";
import { SortBy } from "./header";
import { applyMultipliers, aggregateScores, calculateTotal, calculatePropertyScore, getStandardDeviation, getHumoursWithProperty, convertValue } from "helpers/scoreHelpers";
import { HUMOUR_ORDER, HumourProperty } from "config/humourConfig";
import { HumourScoreBox } from "./shared/HumourScoreBox";
import { HighlightedMetric } from "./shared/HighlightedMetric";
import { UnitType } from "../App";

interface Scoreboard {
  adminMode: boolean;
  sortBy: SortBy;
  unitType: UnitType;
}

interface ScoreboardItem {
  name: string;
  score: IScore;
  houseIds: number[];
  factionId?: number;
}

export const Scoreboard: React.FC<Scoreboard> = ({ adminMode, sortBy, unitType }) => {
  const { houses: allHouses, factions, deleteHouse: apiDeleteHouse, deleteFaction: apiDeleteFaction } = useData();
  const [houses, setHouse] = useState<IHouse[] | undefined>(undefined);
  const [openHouseModal, setopenHouseModal] = useState(false);
  const [openFactionModal, setOpenFactionModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedFactionName, setSelectedFactionName] = useState<string | undefined>(undefined);
  const [selectedFactionId, setSelectedFactionId] = useState<number | undefined>(undefined);
  
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // >= 900px
  const isXL = useMediaQuery('(min-width:1500px)'); // >= 1500px
  
  // Font scale: mobile (1x), medium (1.25x), XL (1.5x)
  let fontScale = 1;
  if (isXL) {
    fontScale = 1.5;
  } else if (isDesktop) {
    fontScale = 1.25;
  }

  // Helper function to calculate balance

  const calculateBalance = (score: IScore) => {
    return getStandardDeviation([
      score.choleric,
      score.phlegmatic,
      score.melancholic,
      score.sanguine
    ]);
  };


  // Build scoreboard from houses and factions
  const buildScoreboard = (): ScoreboardItem[] => {
    const housesInFactions = factions.flatMap(f => f.houseIds);
    const scoreboardItems: ScoreboardItem[] = [];

    // Add factions
    factions.forEach(faction => {
      const factionHouses = faction.houseIds
        .map(id => allHouses.find(h => h.id === id))
        .filter(h => h && h.score) as IHouse[];
      
      if (factionHouses.length > 0) {
        // Aggregate scores from all houses in faction (with strength/weakness multipliers)
        const aggregatedScore = aggregateScores(factionHouses);

        scoreboardItems.push({
          name: faction.name,
          score: aggregatedScore,
          houseIds: faction.houseIds,
          factionId: faction.id
        });
      }
    });

    // Add individual houses (not in factions)
    allHouses.forEach(house => {
      if (!housesInFactions.includes(house.id) && house.score) {
        scoreboardItems.push({
          name: house.name,
          score: applyMultipliers(house),
          houseIds: [house.id]
        });
      }
    });

    return scoreboardItems;
  };

  // Sort scoreboard based on selected criteria
  const rankedScoreboardData = buildScoreboard()
    .sort((a, b) => {
      switch (sortBy) {
        case "balance":
          // Lower balance (std dev) is better
          return calculateBalance(a.score) - calculateBalance(b.score);
        case "total":
          // Higher total is better
          return calculateTotal(b.score) - calculateTotal(a.score);
        case "choleric":
          return b.score.choleric - a.score.choleric;
        case "phlegmatic":
          return b.score.phlegmatic - a.score.phlegmatic;
        case "melancholic":
          return b.score.melancholic - a.score.melancholic;
        case "sanguine":
          return b.score.sanguine - a.score.sanguine;
        case "hot":
          return calculatePropertyScore(b.score, "hot") - calculatePropertyScore(a.score, "hot");
        case "cold":
          return calculatePropertyScore(b.score, "cold") - calculatePropertyScore(a.score, "cold");
        case "moist":
          return calculatePropertyScore(b.score, "moist") - calculatePropertyScore(a.score, "moist");
        case "dry":
          return calculatePropertyScore(b.score, "dry") - calculatePropertyScore(a.score, "dry");
        default:
          return calculateBalance(a.score) - calculateBalance(b.score);
      }
    })
    .map((item, index) => ({
      ...item,
      ranking: index + 1
    }));

  const openModal = (houseIds: number[], factionName?: string, factionId?: number) => {
    setOpenFactionModal(false);
    const selectedHouses = houseIds.map((id) => allHouses.find((house) => house.id === id)!);
    setHouse(selectedHouses);
    if (houseIds.length === 1) {
      setopenHouseModal(true);
      setSelectedFactionName(undefined);
      setSelectedFactionId(undefined);
    } else {
      // Multiple houses = faction
      setOpenFactionModal(true);
      setSelectedFactionName(factionName);
      setSelectedFactionId(factionId);
    }
  };

  const handleCloseHouseModal = () => setopenHouseModal(false);
  const handleCloseFactionModal = () => setOpenFactionModal(false);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  const deleteHouse = async () => {
    if (houses && houses[0]) {
      try {
        await apiDeleteHouse(houses[0].id);
        handleCloseDeleteDialog();
        setopenHouseModal(false);
      } catch (error) {
        console.error('Failed to delete house:', error);
        alert('Failed to delete house. Please try again.');
      }
    }
  };

  const humourScores = (score: IScore) => {
    // Check if sortBy is a property (hot, cold, moist, dry)
    const propertyHumours = ["hot", "cold", "moist", "dry"].includes(sortBy)
      ? getHumoursWithProperty(sortBy as HumourProperty)
      : [];
    
    return (
      <Grid style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: isDesktop ? 4 : 0
      }}>
        {HUMOUR_ORDER.map(humour => {
          // Highlight if:
          // 1. sortBy matches the humour directly, OR
          // 2. sortBy is a property and this humour has that property
          const isHighlighted = sortBy === humour || propertyHumours.includes(humour);
          
          return (
            <HumourScoreBox
              key={humour}
              humour={humour}
              value={score[humour]}
              isHighlighted={isHighlighted}
              unitType={unitType}
              isMobile={!isDesktop}
            />
          );
        })}
      </Grid>
    );
  };

  const scores = rankedScoreboardData.map((team: ScoreboardItem & { ranking: number }) => {
    const teams = team.houseIds.map((id: number) =>
      allHouses.find((house) => house.id === id)
    );

    // Dynamic crest width based on number of houses and screen size
    // At 375px screen width, we have ~100px available for crests
    // Desktop: larger crests with more space
    const baseDesktopWidth = 80 * fontScale;
    let crestWidth: number;
    if (isDesktop) {
      // Desktop: keep large size for up to 6 houses
      if (teams.length <= 6) {
        crestWidth = baseDesktopWidth;
      } else {
        crestWidth = baseDesktopWidth * 0.625; // 62.5% of base for many houses
      }
    } else {
      // Mobile: calculate width based on available space (100px at 375px width)
      // For 4+ crests, display on two lines (2 crests per line)
      const availableWidth = 100;
      const gap = 4; // Gap between crests
      if (teams.length === 1) {
        crestWidth = availableWidth;
      } else if (teams.length >= 4) {
        // Two lines: calculate width for 2 crests per row
        const crestsPerRow = 2;
        crestWidth = (availableWidth - (gap * (crestsPerRow - 1))) / crestsPerRow;
      } else {
        // Single line for 2-3 crests
        crestWidth = (availableWidth - (gap * (teams.length - 1))) / teams.length;
      }
    }
    
    const crests = teams.map((house) => (
      <img 
        src={house?.crestUrl} 
        style={{ 
          width: crestWidth,
          height: 'auto',
          objectFit: 'contain'
        }} 
        key={house?.id} 
      />
    ));

    return (
      <>
       <Grid style={{ 
            minWidth: "auto", 
            textAlign: "right", 
            fontSize: 20 * fontScale,
            fontWeight: "bold",
            textShadow: theme.palette.mode === 'dark' ? '2px 2px 4px rgba(0, 0, 0, 0.8)' : 'none'
          }}>
            {team.name}
      </Grid>
      <Button
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          color: theme.palette.text.primary,
          fontWeight: "bold",
          fontFamily: "'Medieval Sharp Bold', serif",
          textShadow: theme.palette.mode === 'dark' ? '2px 2px 4px rgba(0, 0, 0, 0.8)' : 'none',
          padding: "12px 16px",
          minHeight: isDesktop ? `${baseDesktopWidth + 24}px` : 'auto'
        }}
        onClick={() => {
          team.houseIds && openModal(team.houseIds, team.name, team.factionId);
          console.log("1", team);
        }}
      >
        <Grid style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
          <Grid style={{ 
            fontSize: isDesktop ? baseDesktopWidth : 60, 
            lineHeight: isDesktop ? `${baseDesktopWidth}px` : '60px',
            color: theme.palette.text.primary, 
            fontWeight: "bold",
            textShadow: theme.palette.mode === 'dark' ? '3px 3px 6px rgba(0, 0, 0, 0.9)' : 'none'
          }}>{team.ranking}</Grid>
          <Grid style={{ 
            display: "flex", 
            gap: isDesktop ? 8 : 4, 
            alignItems: "center",
            flexWrap: isDesktop ? "nowrap" : "wrap",
            justifyContent: "flex-start",
            height: isDesktop ? `${baseDesktopWidth}px` : 'auto',
            maxWidth: isDesktop ? 'none' : '150px'
          }}>
            {crests}
          </Grid>
        </Grid>
        <Grid
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 16,
            alignItems: "center",
            flex: 1,
            justifyContent: "flex-end",
            flexWrap: "wrap",
            minWidth: 0
          }}
        >
          <Grid style={{ display: "flex", gap: 4, flexShrink: 0 }}>
            {humourScores(team.score)}
          </Grid>
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 16,
              fontSize: 14 * fontScale,
              minWidth: "auto",
              flexShrink: 0,
              textShadow: theme.palette.mode === 'dark' ? '1px 1px 3px rgba(0, 0, 0, 0.8)' : 'none'
            }}
          >
            <HighlightedMetric
              label="Total"
              value={Math.round(convertValue(calculateTotal(team.score), unitType))}
              isHighlighted={sortBy === "total"}
            />
            <HighlightedMetric
              label="Balance"
              value={Math.round(calculateBalance(team.score))}
              isHighlighted={sortBy === "balance"}
            />
          </Grid>
        </Grid>
      </Button>
    </>

    );
  });

  const handleDeleteFaction = async () => {
    if (!selectedFactionId) return;
    
    const confirmDelete = window.confirm(
      `Are you sure you want to dissolve ${selectedFactionName}? The houses will remain but the faction will be destroyed.`
    );
    
    if (confirmDelete) {
      try {
        await apiDeleteFaction(selectedFactionId);
        handleCloseFactionModal();
      } catch (error) {
        console.error('Failed to delete faction:', error);
        alert('Failed to dissolve faction. Please try again.');
      }
    }
  };

  return (
    <>
      <Grid 
        style={{ 
          display: "flex", 
          flexDirection: "column",
          overflowY: "auto",
          height: "100%"
        }}
      >
        {scores}
      </Grid>
      {houses && houses.length === 1 && (
        <ViewHouseModal
          open={openHouseModal}
          house={houses[0]}
          adminMode={adminMode}
          onClose={handleCloseHouseModal}
          onDelete={() => setOpenDeleteDialog(true)}
          humourScores={humourScores}
          unitType={unitType}
        />
      )}
      {houses && houses.length > 1 && (
        <ViewFactionModal
          open={openFactionModal}
          houses={houses}
          factionName={selectedFactionName}
          adminMode={adminMode}
          onClose={handleCloseFactionModal}
          onHouseClick={(houseId) => openModal([houseId])}
          onDelete={handleDeleteFaction}
        />
      )}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} PaperProps={{ sx: { backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary } }}>
        <DialogTitle>{`Are you sure - delete ${houses && houses[0].name}?`}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>No</Button>
          <Button variant="contained" onClick={deleteHouse}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
