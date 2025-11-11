import {
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import { useState } from "react";
import { AddHouse } from "./House/addHouse";
import { AddFaction } from "./Faction/addFaction";
import { GameHistory } from "./Game/gameHistory";

interface IFooter {
  adminMode: boolean;
  setAdminMode: (x: boolean) => void;
}

const SECRET_PASSWORD = "1234";

export const Footer: React.FC<IFooter> = ({ adminMode, setAdminMode }) => {
  const [openAdminModeModal, setOpenAdminModeModal] = useState(false);
  const [openNewHouseModal, setOpenNewHouseModal] = useState(false);
  const [openNewFactionModal, setOpenNewFactionModal] = useState(false);
  const [openNewGameModal, setOpenNewGameModal] = useState(false);
  const [openGameHistoryModal, setOpenGameHistoryModal] = useState(false);
  const [password, setPassword] = useState("");

  const handleClose = () => setOpenAdminModeModal(false);
  const handleCloseNewHouse = () => setOpenNewHouseModal(false);
  const handleCloseNewFaction = () => setOpenNewFactionModal(false);
  const handleCloseNewGame = () => setOpenNewGameModal(false);
  const handleCloseGameHistory = () => setOpenGameHistoryModal(false);

  const handleSubmit = () => {
    console.log(password);
    if (password === SECRET_PASSWORD) {
      setAdminMode(true);
    }
    setOpenAdminModeModal(false);
    setPassword("");
  };

  return (
    <>
      <Button
        onClick={() => setOpenGameHistoryModal(true)}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 60
        }}
      >
        GAME HISTORY
      </Button>
      <ButtonBase
        onClick={
          adminMode
            ? () => setAdminMode(false)
            : () => setOpenAdminModeModal(!openAdminModeModal)
        }
        sx={{
          backgroundColor: adminMode ? "maroon" : "darkslategrey",
          borderRadius: "8px",
          p: 1,
          transition: "background-color 0.3s ease",
          position: "fixed",
          bottom: 0
        }}
      >
        <img src="assets/images/quill-img.svg" alt="Q" style={{ height: 24 }} />
      </ButtonBase>
      {adminMode && (
        <>
          <Button onClick={() => setOpenNewHouseModal(true)}>
            NEW HOUSE
          </Button>
          <Button onClick={() => setOpenNewFactionModal(true)}>
            NEW FACTION
          </Button>
          <Button onClick={() => setOpenNewGameModal(true)}>
            NEW GAME
          </Button>
        </>
      )}
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

      <Dialog
        open={openNewHouseModal}
        onClose={handleCloseNewHouse}
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <AddHouse />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewHouse}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openNewFactionModal}
        onClose={handleCloseNewFaction}
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <AddFaction />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewFaction}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openNewGameModal}
        onClose={handleCloseNewGame}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>New Game</DialogTitle>
        <DialogContent>
          {/* TODO: Add NewGame component */}
          <p>New Game form coming soon...</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewGame}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openGameHistoryModal}
        onClose={handleCloseGameHistory}
        fullWidth
        maxWidth="lg"
      >
        <DialogContent>
          <GameHistory />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGameHistory}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
