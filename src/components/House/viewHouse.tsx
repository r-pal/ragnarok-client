import { Grid } from "@mui/material";
import { housesDummy } from "inputs/housesDummy";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const ViewHouse: React.FC = () => {
  const addCrest = () => {};

  const house = housesDummy[0];

  return (
    <Grid>
      {house.crestUrl ? (
        <>
          <img src={house.crestUrl} />
          <AddCircleIcon onClick={() => addCrest()} />
        </>
      ) : (
        <AddCircleIcon onClick={() => addCrest()} />
      )}
      <Grid>{house.name}</Grid>
      <Grid>{house.motto}</Grid>
      <Grid>Strength: {house.strength}</Grid>
      <Grid>Weakness: {house.weakness}</Grid>
    </Grid>
  );
};
