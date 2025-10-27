import { Box, Divider, Grid } from "@mui/material";
import { scoreboardDummy } from "inputs/scoreboardDummy";

interface Scoreboard {}

export const Scoreboard: React.FC<Scoreboard> = () => {
  const rankedScoreboardData = scoreboardDummy.sort(
    (a, b) => a.ranking - b.ranking
  );

  const scores = rankedScoreboardData.map((team) => (
    <Grid
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 4,
        justifyContent: "flex-start",
        alignItems: "last baseline"
      }}
    >
      <Grid style={{ fontSize: 60 }}>{team.ranking}</Grid>
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
          {team.houseOrFactionName}
        </Grid>
        <Grid
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            justifyContent: "flex-end"
          }}
        >
          <Box
            sx={{ border: 1 }}
            style={{ borderColor: "green" }}
            width={48}
            height={48}
          >
            {team.score.phlegmatic}
          </Box>
          <Box
            sx={{ border: 1 }}
            style={{ borderColor: "crimson" }}
            width={48}
            height={48}
          >
            {team.score.sangine}
          </Box>
          <Box
            sx={{ border: 1 }}
            style={{ borderColor: "yellow" }}
            width={48}
            height={48}
          >
            {team.score.choleric}
          </Box>
          <Box
            sx={{ border: 1 }}
            style={{
              borderColor: "linear-gradient(90deg, #ffffff 0%, #000000 100%)"
            }}
            width={48}
            height={48}
          >
            {team.score.melancholic}
          </Box>
          <Divider />
        </Grid>
      </Grid>
    </Grid>
  ));

  return (
    <Grid style={{ display: "flex", flexDirection: "column" }}>{scores}</Grid>
  );
};
