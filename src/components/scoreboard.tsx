import {
  Box,
  Button,
  Dialog,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Modal,
  ModalManager
} from "@mui/material";
import { housesDummy } from "inputs/housesDummy";
import { scoreboardDummy } from "inputs/scoreboardDummy";
import { useEffect, useState } from "react";
import { IHouse, IScore } from "types";

interface Scoreboard {}

export const Scoreboard: React.FC<Scoreboard> = () => {
  const [houses, setHouse] = useState<IHouse[] | undefined>(undefined);
  const [openHouseModal, setopenHouseModal] = useState(false);
  const [openFactionModal, setOpenFactionModal] = useState(false);

  const rankedScoreboardData = scoreboardDummy.sort(
    (a, b) => a.ranking - b.ranking
  );

  const openModal = (houseIds: number[]) => {
    setOpenFactionModal(false);
    setHouse(
      houseIds.map((id) => housesDummy.find((house) => house.id === id)!)
    );
    if (houseIds.length === 1) {
      setopenHouseModal(true);
    } else {
      setOpenFactionModal(true);
    }
  };

  const handleCloseHouseModal = () => setopenHouseModal(false);
  const handleCloseFactionModal = () => setOpenFactionModal(false);

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
          {score.sangine}
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
      housesDummy.find((house) => house.id === id)
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

  // const crests = houses?.map(house => house)

  return (
    <>
      <Grid style={{ display: "flex", flexDirection: "column" }}>{scores}</Grid>
      {houses && (
        <Modal
          open={openHouseModal}
          onClose={handleCloseHouseModal}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            // backgroundColor: "brown",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Box
            style={{
              gap: 4,
              height: 400,
              width: 300
            }}
          >
            <img src={houses[0].crestUrl} style={{ height: 48 }} />
            <div>{houses[0].name}</div>
            <div>{houses[0].motto}</div>
            <div>{`Strong Humour: ${houses[0].strength}`}</div>
            <div>{`Weak Humour: ${houses[0].weakness}`}</div>
            {humourScores(houses[0].score)}
            <Button onClick={() => handleCloseHouseModal()}>CLOSE</Button>
          </Box>
        </Modal>
      )}
      <Modal
        open={openFactionModal}
        onClose={handleCloseFactionModal}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          backgroundColor: "brown",
          transform: "translate(-50%, -50%)"
        }}
      >
        <List>
          {houses?.map((house) => (
            <ListItem disablePadding key={house.id}>
              <ListItemButton onClick={() => openModal([house.id])}>
                <ListItemAvatar>
                  <img src={house.crestUrl} style={{ height: 24 }} />
                </ListItemAvatar>
                {house.name}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Modal>
    </>
  );
};
