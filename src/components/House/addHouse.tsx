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
    // Validate that strength and weakness are selected
    if (!values.strength || !values.weakness) {
      alert("Thou must select both blessed affliction and sacred weakness");
      return;
    }

    // Validate that strength and weakness are different
    if (values.strength === values.weakness) {
      alert("Thy blessed affliction and sacred weakness cannot dwell in the same humour—such is forbidden!");
      return;
    }

    console.log("New house:", values);
    // TODO: Add API call to create house
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Consecrate a New House
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Establish a noble house and inscribe its blessed afflictions upon the sacred scrolls
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <Stack spacing={3}>
              <TextField
                fullWidth
                name="name"
                label="House Name (Noble Title)"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              <TextField
                fullWidth
                name="motto"
                label="House Motto (Sacred Oath)"
                value={values.motto}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              <TextField
                fullWidth
                name="crestUrl"
                label="Crest URL (Sigil of Thy House)"
                value={values.crestUrl}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Stack direction="row" spacing={2}>
                <FormControl fullWidth required>
                  <InputLabel>Blessed Affliction</InputLabel>
                  <Select
                    name="strength"
                    value={values.strength}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Blessed Affliction"
                  >
                    {humourOptions.map((humour) => (
                      <MenuItem key={humour} value={humour}>
                        {humour.charAt(0).toUpperCase() + humour.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth required>
                  <InputLabel>Sacred Weakness</InputLabel>
                  <Select
                    name="weakness"
                    value={values.weakness}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Sacred Weakness"
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
                    Sigil Preview:
                  </Typography>
                  <img
                    src={values.crestUrl}
                    alt="House sigil preview"
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
                Consecrate House
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
