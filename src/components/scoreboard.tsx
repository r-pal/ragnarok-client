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
import { getHouses } from "mockAPI/getHouses";
import { getFactions } from "mockAPI/getFactions";
import { useState } from "react";
import { IHouse } from "types/house";
import { IScore } from "types/shared";
import { ViewHouseModal } from "./House/viewHouseModal";
import { ViewFactionModal } from "./Faction/viewFactionModal";
import { SortBy } from "./header";
import { applyMultipliers, aggregateScores, calculateTotal, calculatePropertyScore, getStandardDeviation, getHumoursWithProperty } from "helpers/scoreHelpers";
import { HUMOUR_ORDER, HumourProperty } from "config/humourConfig";
import { HumourScoreBox } from "./shared/HumourScoreBox";
import { HighlightedMetric } from "./shared/HighlightedMetric";

interface Scoreboard {
  adminMode: boolean;
  sortBy: SortBy;
}

interface ScoreboardItem {
  name: string;
  score: IScore;
  houseIds: number[];
}

export const Scoreboard: React.FC<Scoreboard> = ({ adminMode, sortBy }) => {
  const [houses, setHouse] = useState<IHouse[] | undefined>(undefined);
  const [openHouseModal, setopenHouseModal] = useState(false);
  const [openFactionModal, setOpenFactionModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedFactionName, setSelectedFactionName] = useState<string | undefined>(undefined);
  
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const fontScale = isDesktop ? 1.5 : 1;

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
    const housesInFactions = getFactions.flatMap(f => f.houseIds);
    const scoreboardItems: ScoreboardItem[] = [];

    // Add factions
    getFactions.forEach(faction => {
      const factionHouses = faction.houseIds
        .map(id => getHouses.find(h => h.id === id))
        .filter(h => h && h.score) as IHouse[];
      
      if (factionHouses.length > 0) {
        // Aggregate scores from all houses in faction (with strength/weakness multipliers)
        const aggregatedScore = aggregateScores(factionHouses);

        scoreboardItems.push({
          name: faction.name,
          score: aggregatedScore,
          houseIds: faction.houseIds
        });
      }
    });

    // Add individual houses (not in factions)
    getHouses.forEach(house => {
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

  const openModal = (houseIds: number[], factionName?: string) => {
    setOpenFactionModal(false);
    const selectedHouses = houseIds.map((id) => getHouses.find((house) => house.id === id)!);
    setHouse(selectedHouses);
    if (houseIds.length === 1) {
      setopenHouseModal(true);
      setSelectedFactionName(undefined);
    } else {
      // Multiple houses = faction
      setOpenFactionModal(true);
      setSelectedFactionName(factionName);
    }
  };

  const handleCloseHouseModal = () => setopenHouseModal(false);
  const handleCloseFactionModal = () => setOpenFactionModal(false);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  const deleteHouse = () => {
    handleCloseDeleteDialog();
    console.log(`Deleted ${houses && houses[0].name}`);
  };

  const humourScores = (score: IScore) => {
    // Check if sortBy is a property (hot, cold, moist, dry)
    const propertyHumours = ["hot", "cold", "moist", "dry"].includes(sortBy)
      ? getHumoursWithProperty(sortBy as HumourProperty)
      : [];
    
    return (
      <Grid style={{ display: "flex", gap: 4 }}>
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
            />
          );
        })}
      </Grid>
    );
  };

  const scores = rankedScoreboardData.map((team: ScoreboardItem & { ranking: number }) => {
    const teams = team.houseIds.map((id: number) =>
      getHouses.find((house) => house.id === id)
    );

    // Dynamic crest size: big if single house, smaller if multiple
    const crestSize = teams.length === 1 ? 60 * fontScale : 32 * fontScale;
    const crests = teams.map((house) => (
      <img src={house?.crestUrl} style={{ height: crestSize }} key={house?.id} />
    ));

    return (
      <Button
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          color: "#000000",
          fontWeight: "bold",
          fontFamily: "'Medieval Sharp Bold', serif"
        }}
        onClick={() => {
          team.houseIds && openModal(team.houseIds, team.name);
          console.log("1", team);
        }}
      >
        <Grid style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
          <Grid style={{ fontSize: 60, color: "#000000", fontWeight: "bold" }}>{team.ranking}</Grid>
          <Grid style={{ 
            display: "flex", 
            gap: 4, 
            alignItems: "center",
            flexWrap: "wrap",
            maxWidth: "100px"
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
          <Grid style={{ minWidth: "auto", textAlign: "right", fontSize: 16 * fontScale }}>
            {team.name}
          </Grid>
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
              flexShrink: 0
            }}
          >
            <HighlightedMetric
              label="Total"
              value={calculateTotal(team.score)}
              isHighlighted={sortBy === "total"}
            />
            <HighlightedMetric
              label="Balance"
              value={calculateBalance(team.score).toFixed(2)}
              isHighlighted={sortBy === "balance"}
            />
          </Grid>
        </Grid>
      </Button>
    );
  });

  const handleDeleteFaction = () => {
    console.log(
      `delete faction of ${houses?.map((h) => h.name).join(" + ")}`
    );
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
