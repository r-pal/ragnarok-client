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
import { useData } from "../../context/DataContext";

const initialValues: Omit<IFaction, "houseIds"> & { houseIds: number[] } = {
  name: "",
  motto: "",
  houseIds: [],
};

export const AddFaction: React.FC = () => {
  const { houses, factions, createFaction } = useData();

  const handleSubmit = async (values: typeof initialValues, { resetForm }: any) => {
    try {
      await createFaction(values);
      resetForm();
    } catch (error) {
      console.error("Error creating faction:", error);
    }
  };

  // Check if any selected house is already in a faction
  const housesInFactions = factions.flatMap((f) => f.houseIds);

  // Only show houses that don't already belong to a faction
  const availableHouses = houses
    .filter((house) => !housesInFactions.includes(house.id))
    .map((house) => ({
      id: house.id,
      label: house.name,
    }));

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Forge a Sacred Covenant
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Bind noble houses in oath and fortitude to compete as one flesh
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Stack spacing={3}>
              <TextField
                fullWidth
                name="name"
                label="Covenant Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              <TextField
                fullWidth
                name="motto"
                label="Covenant Oath"
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
                    label="Houses to Bind"
                    placeholder="Choose houses to unite in sacred covenant"
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
                Forge Covenant
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
