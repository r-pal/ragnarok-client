import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { Formik, Form } from "formik";
import { IPostHouse } from "types/house";
import { humourOptions } from "types/shared";

const initialValues: IPostHouse = {
  name: "",
  motto: "",
  crestUrl: "",
  strength: undefined,
  weakness: undefined
};

export const AddHouse: React.FC = () => {
  const handleSubmit = (values: IPostHouse) => {
    console.log("New house:", values);
    // TODO: Add API call to create house
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add New House
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <Stack spacing={3}>
              <TextField
                fullWidth
                name="name"
                label="House Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              <TextField
                fullWidth
                name="motto"
                label="House Motto"
                value={values.motto}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              <TextField
                fullWidth
                name="crestUrl"
                label="Crest URL (optional)"
                value={values.crestUrl}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Stack direction="row" spacing={2}>
                <FormControl fullWidth required>
                  <InputLabel>Strength</InputLabel>
                  <Select
                    name="strength"
                    value={values.strength}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Strength"
                  >
                    {humourOptions.map((humour) => (
                      <MenuItem key={humour} value={humour}>
                        {humour.charAt(0).toUpperCase() + humour.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth required>
                  <InputLabel>Weakness</InputLabel>
                  <Select
                    name="weakness"
                    value={values.weakness}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Weakness"
                  >
                    {humourOptions.map((humour) => (
                      <MenuItem key={humour} value={humour}>
                        {humour.charAt(0).toUpperCase() + humour.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              {values.crestUrl && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Crest Preview:
                  </Typography>
                  <img
                    src={values.crestUrl}
                    alt="House crest preview"
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                </Box>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Create House
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
