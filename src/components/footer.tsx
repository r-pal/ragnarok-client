import {
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField
} from "@mui/material";
import { useState } from "react";

interface IFooter {
  adminMode: boolean;
  setAdminMode: (x: boolean) => void;
}

const CORRECT_PASSWORD = "secret123";

export const Footer: React.FC<IFooter> = ({ adminMode, setAdminMode }) => {
  const [openAdminModeModal, setOpenAdminModeModal] = useState(false);
  const [password, setPassword] = useState("");

  const handleClose = () => setOpenAdminModeModal(false);

  const handleSubmit = () => {
    console.log(password);
    if (password === CORRECT_PASSWORD) {
      setAdminMode(true);
    }
    setOpenAdminModeModal(false);
    setPassword("");
  };

  return (
    <>
      <Divider />
      <ButtonBase
        onClick={
          adminMode
            ? () => setAdminMode(false)
            : () => setOpenAdminModeModal(!openAdminModeModal)
        }
        sx={{
          backgroundColor: adminMode ? "red" : "grey",
          borderRadius: "8px",
          p: 1,
          transition: "background-color 0.3s ease"
        }}
      >
        <img src="assets/images/quill-img.svg" alt="Q" style={{ height: 24 }} />
      </ButtonBase>
      <Dialog
        open={openAdminModeModal}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Enter Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && handleSubmit()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
