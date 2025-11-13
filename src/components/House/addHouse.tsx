import {
  Button,
  TextField,
  Typography,
  Box,
  Stack,
  Collapse,
} from "@mui/material";
import { useState } from "react";
import { Formik, Form } from "formik";
import { IPostHouse } from "types/house";
import { HumourSelect } from "components/shared/HumourSelect";
import { CrestSearch } from "components/shared/CrestSearch";

const initialValues: IPostHouse = {
  name: "",
  motto: "",
  crestUrl: "",
  strength: undefined,
  weakness: undefined,
  password: ""
};

export const AddHouse: React.FC = () => {
  const [showCrestSearch, setShowCrestSearch] = useState(false);
  
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

    // Validate password
    if (!values.password || values.password.length < 4) {
      alert("Thou must provide a password of at least 4 characters to protect thy house");
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

              <Box>
                <TextField
                  fullWidth
                  name="crestUrl"
                  label="Crest URL (Sigil of Thy House)"
                  value={values.crestUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Button 
                  onClick={() => setShowCrestSearch(!showCrestSearch)}
                  sx={{ mt: 1 }}
                  variant="outlined"
                  size="small"
                  type="button"
                >
                  {showCrestSearch ? "Hide Search" : "Search Wikimedia Commons"}
                </Button>
              </Box>
              
              <Collapse in={showCrestSearch}>
                <CrestSearch 
                  onSelectCrest={(url) => {
                    handleChange({ target: { name: 'crestUrl', value: url } });
                    setShowCrestSearch(false);
                  }}
                />
              </Collapse>

              <Stack direction="row" spacing={2}>
                <HumourSelect
                  label="Blessed Affliction"
                  name="strength"
                  value={values.strength}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                <HumourSelect
                  label="Sacred Weakness"
                  name="weakness"
                  value={values.weakness}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </Stack>

              <TextField
                fullWidth
                name="password"
                label="House Password (Sacred Key)"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                helperText="Required to edit house details without admin access"
              />

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
