import {
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
  Menu,
  useMediaQuery,
  useTheme,
  Box
} from "@mui/material";
import { useState } from "react";
import { AddHouse } from "./House/addHouse";
import { AddFaction } from "./Faction/addFaction";
import { GameHistory } from "./Game/gameHistory";
import { NewGame } from "./Game/newGame";
import { Explainer } from "./explainer";
import { FestivalBalance } from "./festivalBalance";
import { SortBy } from "./header";

interface IFooter {
  adminMode: boolean;
  setAdminMode: (x: boolean) => void;
  sortBy: SortBy;
  onSortChange: (sortBy: SortBy) => void;
}

const SECRET_PASSWORD = "1234";

export const Footer: React.FC<IFooter> = ({ adminMode, setAdminMode, sortBy, onSortChange }) => {
  const [openAdminModeModal, setOpenAdminModeModal] = useState(false);
  const [openNewHouseModal, setOpenNewHouseModal] = useState(false);
  const [openNewFactionModal, setOpenNewFactionModal] = useState(false);
  const [openNewGameModal, setOpenNewGameModal] = useState(false);
  const [openGameHistoryModal, setOpenGameHistoryModal] = useState(false);
  const [openExplainer, setOpenExplainer] = useState(false);
  const [openFestivalBalance, setOpenFestivalBalance] = useState(false);
  const [password, setPassword] = useState("");
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };
  
  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

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
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: "12px 16px",
          display: "flex",
          gap: "16px",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 1000
        }}
      >
        <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
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
              transition: "background-color 0.3s ease"
            }}
          >
            <img src="assets/images/quill-img.svg" alt="Q" style={{ height: 24 }} />
          </ButtonBase>
          
          {isMobile ? (
            <>
              <IconButton
                onClick={handleMobileMenuOpen}
                sx={{ color: "white" }}
              >
                ☰
              </IconButton>
              <Menu
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={handleMobileMenuClose}
                PaperProps={{
                  sx: {
                    backgroundColor: "rgba(0, 0, 0, 0.95)",
                    color: "white"
                  }
                }}
              >
                <MenuItem onClick={() => { setOpenGameHistoryModal(true); handleMobileMenuClose(); }}>
                  CHRONICLE OF RITES
                </MenuItem>
                <MenuItem onClick={() => { setOpenFestivalBalance(true); handleMobileMenuClose(); }}>
                  THE GREAT RECKONING
                </MenuItem>
                {adminMode && (
                  <>
                    <MenuItem onClick={() => { setOpenNewHouseModal(true); handleMobileMenuClose(); }}>
                      CONSECRATE HOUSE
                    </MenuItem>
                    <MenuItem onClick={() => { setOpenNewFactionModal(true); handleMobileMenuClose(); }}>
                      FORGE COVENANT
                    </MenuItem>
                    <MenuItem onClick={() => { setOpenNewGameModal(true); handleMobileMenuClose(); }}>
                      RECORD RITE
                    </MenuItem>
                  </>
                )}
                <MenuItem onClick={() => { setOpenExplainer(true); handleMobileMenuClose(); }}>
                  THE SACRED RULES
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                onClick={() => setOpenGameHistoryModal(true)}
                sx={{ color: "white" }}
              >
                CHRONICLE OF RITES
              </Button>
              <Button
                onClick={() => setOpenFestivalBalance(true)}
                sx={{ color: "white" }}
              >
                THE GREAT RECKONING
              </Button>
              {adminMode && (
                <>
                  <Button onClick={() => setOpenNewHouseModal(true)} sx={{ color: "white" }}>
                    CONSECRATE HOUSE
                  </Button>
                  <Button onClick={() => setOpenNewFactionModal(true)} sx={{ color: "white" }}>
                    FORGE COVENANT
                  </Button>
                  <Button onClick={() => setOpenNewGameModal(true)} sx={{ color: "white" }}>
                    RECORD RITE
                  </Button>
                </>
              )}
            </>
          )}
        </Box>

        <FormControl sx={{ minWidth: isMobile ? 150 : 200 }}>
          <InputLabel sx={{ color: "white" }}>Rank By</InputLabel>
          <Select
            value={sortBy}
            label="Rank By"
            onChange={(e) => onSortChange(e.target.value as SortBy)}
            sx={{
              color: "white",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.3)"
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.5)"
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white"
              },
              ".MuiSvgIcon-root": {
                color: "white"
              }
            }}
          >
            <MenuItem value="balance">Balance (σ)</MenuItem>
            <MenuItem value="total">Total Points</MenuItem>
            <MenuItem value="choleric">Choleric</MenuItem>
            <MenuItem value="phlegmatic">Phlegmatic</MenuItem>
            <MenuItem value="melancholic">Melancholic</MenuItem>
            <MenuItem value="sanguine">Sanguine</MenuItem>
          </Select>
        </FormControl>

        {!isMobile && (
          <Button
            onClick={() => setOpenExplainer(true)}
            sx={{ color: "white", minWidth: "120px" }}
          >
            THE SACRED RULES OF ASCENSION
          </Button>
        )}
      </div>
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
        <DialogContent>
          <NewGame />
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

      <Dialog
        open={openExplainer}
        onClose={() => setOpenExplainer(false)}
        maxWidth="md"
        fullWidth
      >
        <Explainer />
      </Dialog>

      <Dialog
        open={openFestivalBalance}
        onClose={() => setOpenFestivalBalance(false)}
        maxWidth="md"
        fullWidth
      >
        <FestivalBalance />
      </Dialog>
    </>
  );
};
