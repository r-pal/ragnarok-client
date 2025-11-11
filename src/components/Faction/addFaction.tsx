import {
  Button,
  TextField,
  Typography,
  Box,
  Stack,
  Chip,
  Autocomplete,
} from "@mui/material";
import { Formik, Form } from "formik";
import { IFaction } from "types/faction";
import { getHouses } from "mockAPI/getHouses";

const initialValues: Omit<IFaction, "houseIds"> & { houseIds: number[] } = {
  name: "",
  motto: "",
  houseIds: [],
};

export const AddFaction: React.FC = () => {
  const handleSubmit = (values: typeof initialValues) => {
    console.log("New faction:", values);
    // TODO: Add API call to create faction
  };

  // Only show houses that don't already belong to a faction
  const availableHouses = getHouses
    .filter((house) => !house.factionId)
    .map((house) => ({
      id: house.id,
      label: house.name,
    }));

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add New Faction
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Stack spacing={3}>
              <TextField
                fullWidth
                name="name"
                label="Faction Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              <TextField
                fullWidth
                name="motto"
                label="Faction Motto"
                value={values.motto}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              <Autocomplete
                multiple
                options={availableHouses}
                getOptionLabel={(option) => option.label}
                value={availableHouses.filter((house) =>
                  values.houseIds.includes(house.id)
                )}
                onChange={(_, newValue) => {
                  setFieldValue(
                    "houseIds",
                    newValue.map((house) => house.id)
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Houses"
                    placeholder="Choose houses for this faction"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option.label}
                      {...getTagProps({ index })}
                      key={option.id}
                    />
                  ))
                }
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Create Faction
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
