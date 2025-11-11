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
import { getScoreboard } from "mockAPI/getScoreboard";
import { useState } from "react";
import { IHouse } from "types/house";
import { IScore } from "types/shared";
import { ViewHouseModal } from "./House/viewHouseModal";
import { ViewFactionModal } from "./Faction/viewFactionModal";

interface Scoreboard {
  adminMode: boolean;
}

export const Scoreboard: React.FC<Scoreboard> = ({ adminMode }) => {
  const [houses, setHouse] = useState<IHouse[] | undefined>(undefined);
  const [openHouseModal, setopenHouseModal] = useState(false);
  const [openFactionModal, setOpenFactionModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const rankedScoreboardData = getScoreboard.sort(
    (a, b) => a.ranking - b.ranking
  );

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

  const scores = rankedScoreboardData.map((team) => {
    const teams = team.houseIds?.map((id) =>
      getHouses.find((house) => house.id === id)
    );

    const crests = teams?.map((team) => (
      <img src={team?.crestUrl} style={{ height: 24 }} />
    ));

    return (
      <Button
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          justifyContent: "flex-start",
          alignItems: "last baseline"
        }}
        onClick={() => {
          team.houseIds && openModal(team.houseIds);
          console.log("1", team);
        }}
      >
        <Grid style={{ fontSize: 60 }}>{team.ranking}</Grid>
        {crests}
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            justifyContent: "flex-start"
          }}
        >
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
              justifyContent: "flex-end"
            }}
          >
            {team.name}
          </Grid>
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
              justifyContent: "flex-end"
            }}
          >
            {humourScores(team.score)}
            <Divider />
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
      <Grid style={{ display: "flex", flexDirection: "column" }}>{scores}</Grid>
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
