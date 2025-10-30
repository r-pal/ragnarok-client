import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Grid } from "@mui/material";
import { getHouses } from "mockAPI/getHouses";

export const ViewHouse: React.FC = () => {
  const addCrest = () => {};

  const house = getHouses[0];

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
