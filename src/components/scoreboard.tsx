import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Grid
} from "@mui/material";
import { getHouses } from "mockAPI/getHouses";
import { getFactions } from "mockAPI/getFactions";
import { useState } from "react";
import { IHouse } from "types/house";
import { IScore } from "types/shared";
import { ViewHouseModal } from "./House/viewHouseModal";
import { ViewFactionModal } from "./Faction/viewFactionModal";
import { Header, SortBy } from "./header";
import { getStandardDeviation } from "helpers/maths";

interface Scoreboard {
  adminMode: boolean;
}

interface ScoreboardItem {
  name: string;
  score: IScore;
  houseIds: number[];
}

export const Scoreboard: React.FC<Scoreboard> = ({ adminMode }) => {
  const [houses, setHouse] = useState<IHouse[] | undefined>(undefined);
  const [openHouseModal, setopenHouseModal] = useState(false);
  const [openFactionModal, setOpenFactionModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>("balance");

  // Helper functions to calculate points
  const calculateTotal = (score: IScore) => {
    return score.choleric + score.phlegmatic + score.melancholic + score.sanguine;
  };

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
        // Aggregate scores from all houses in faction
        const aggregatedScore: IScore = {
          choleric: factionHouses.reduce((sum, h) => sum + (h.score?.choleric || 0), 0),
          phlegmatic: factionHouses.reduce((sum, h) => sum + (h.score?.phlegmatic || 0), 0),
          melancholic: factionHouses.reduce((sum, h) => sum + (h.score?.melancholic || 0), 0),
          sanguine: factionHouses.reduce((sum, h) => sum + (h.score?.sanguine || 0), 0)
        };

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
          score: house.score,
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
        default:
          return calculateBalance(a.score) - calculateBalance(b.score);
      }
    })
    .map((item, index) => ({
      ...item,
      ranking: index + 1
    }));

  const openModal = (houseIds: number[]) => {
    setOpenFactionModal(false);
    const selectedHouses = houseIds.map((id) => getHouses.find((house) => house.id === id)!);
    setHouse(selectedHouses);
    if (houseIds.length === 1) {
      setopenHouseModal(true);
    } else {
      // Multiple houses = faction
      setOpenFactionModal(true);
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
    return (
      <Grid
        style={{
          display: "flex",
          gap: 4
        }}
      >
        <Box
          sx={{ border: 1 }}
          style={{ borderColor: "green" }}
          width={48}
          height={48}
        >
          {score.phlegmatic}
        </Box>
        <Box
          sx={{ border: 1 }}
          style={{ borderColor: "crimson" }}
          width={48}
          height={48}
        >
          {score.sanguine}
        </Box>
        <Box
          sx={{ border: 1 }}
          style={{ borderColor: "yellow" }}
          width={48}
          height={48}
        >
          {score.choleric}
        </Box>
        <Box
          sx={{ border: 1 }}
          style={{
            borderColor: "linear-gradient(90deg, #ffffff 0%, #000000 100%)"
          }}
          width={48}
          height={48}
        >
          {score.melancholic}
        </Box>
      </Grid>
    );
  };

  const scores = rankedScoreboardData.map((team: ScoreboardItem & { ranking: number }) => {
    const teams = team.houseIds.map((id: number) =>
      getHouses.find((house) => house.id === id)
    );

    const crests = teams.map((house) => (
      <img src={house?.crestUrl} style={{ height: 24 }} key={house?.id} />
    ));

    return (
      <Button
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          justifyContent: "space-between",
          alignItems: "last baseline",
          width: "100%"
        }}
        onClick={() => {
          team.houseIds && openModal(team.houseIds);
          console.log("1", team);
        }}
      >
        <Grid style={{ fontSize: 60 }}>{team.ranking}</Grid>
        <Grid
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 16,
            alignItems: "center",
            flex: 1,
            justifyContent: "flex-end",
            flexWrap: "wrap"
          }}
        >
          <Grid style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {crests}
          </Grid>
          <Grid style={{ minWidth: 200, textAlign: "right" }}>
            {team.name}
          </Grid>
          <Grid style={{ display: "flex", gap: 4 }}>
            {humourScores(team.score)}
          </Grid>
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 16,
              fontSize: 14,
              minWidth: 250
            }}
          >
            <div>
              <strong>Total:</strong> {calculateTotal(team.score)}
            </div>
            <div>
              <strong>Balance (σ):</strong> {calculateBalance(team.score).toFixed(2)}
            </div>
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
      <Header sortBy={sortBy} onSortChange={setSortBy} />
      <Grid 
        style={{ 
          display: "flex", 
          flexDirection: "column",
          overflowY: "auto",
          flex: 1
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
          adminMode={adminMode}
          onClose={handleCloseFactionModal}
          onHouseClick={(houseId) => openModal([houseId])}
          onDelete={handleDeleteFaction}
        />
      )}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
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
