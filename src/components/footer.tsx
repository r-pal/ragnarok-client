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
import { useState, useEffect, useRef } from "react";
import { AddHouse } from "./House/addHouse";
import { AddFaction } from "./Faction/addFaction";
import { GameHistory } from "./Game/gameHistory";
import { NewGame } from "./Game/newGame";
import { Explainer } from "./explainer";
import { FestivalBalance } from "./festivalBalance";
import { CrestGallery } from "./House/crestGallery";
import { SortBy } from "./header";
import { useThemeContext } from "../ThemeProviderWrapper";
import { UnitType } from "../App";

interface IFooter {
  adminMode: boolean;
  setAdminMode: (x: boolean) => void;
  sortBy: SortBy;
  onSortChange: (sortBy: SortBy) => void;
  unitType: UnitType;
  onUnitTypeChange: (unitType: UnitType) => void;
}

const SECRET_PASSWORD = "1234";

export const Footer: React.FC<IFooter> = ({ adminMode, setAdminMode, sortBy, onSortChange, unitType, onUnitTypeChange }) => {
  const [openAdminModeModal, setOpenAdminModeModal] = useState(false);
  const [openNewHouseModal, setOpenNewHouseModal] = useState(false);
  const [openNewFactionModal, setOpenNewFactionModal] = useState(false);
  const [openNewGameModal, setOpenNewGameModal] = useState(false);
  const [openGameHistoryModal, setOpenGameHistoryModal] = useState(false);
  const [openExplainer, setOpenExplainer] = useState(false);
  const [openFestivalBalance, setOpenFestivalBalance] = useState(false);
  const [openCrestGallery, setOpenCrestGallery] = useState(false);
  const [password, setPassword] = useState("");
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [isAutoCycling, setIsAutoCycling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const theme = useTheme();
  const { toggleTheme, currentTheme } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Listen for custom event to open Sacred Rules
  useEffect(() => {
    const handleOpenSacredRules = (e: any) => {
      setOpenExplainer(true);
      // Scroll to section after modal opens
      setTimeout(() => {
        const element = document.getElementById(e.detail?.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    };
    
    window.addEventListener('openSacredRules', handleOpenSacredRules);
    return () => window.removeEventListener('openSacredRules', handleOpenSacredRules);
  }, []);
  
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

  // Auto-cycle through sort options
  const sortOptions: SortBy[] = ["balance", "total", "choleric", "phlegmatic", "melancholic", "sanguine", "hot", "cold", "moist", "dry"];
  
  useEffect(() => {
    if (isAutoCycling) {
      const currentIndex = sortOptions.indexOf(sortBy);
      
      intervalRef.current = setInterval(() => {
        const nextIndex = (currentIndex + 1) % sortOptions.length;
        const nextSort = sortOptions[nextIndex];
        onSortChange(nextSort);
      }, 15000); // 15 seconds
      
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [isAutoCycling, sortBy, onSortChange]);

  const toggleAutoCycle = () => {
    setIsAutoCycling(!isAutoCycling);
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
                <MenuItem onClick={() => { setOpenCrestGallery(true); handleMobileMenuClose(); }}>
                  GALLERY OF CRESTS
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
                <MenuItem onClick={() => { toggleTheme(); handleMobileMenuClose(); }}>
                  {currentTheme === "light" ? "🌙 DARK MODE" : "☀️ LIGHT MODE"}
                </MenuItem>
                <MenuItem onClick={() => { toggleAutoCycle(); handleMobileMenuClose(); }}>
                  {isAutoCycling ? "⏸ STOP SLIDESHOW" : "▶ START SLIDESHOW"}
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
              <Button
                onClick={() => setOpenCrestGallery(true)}
                sx={{ color: "white" }}
              >
                GALLERY OF CRESTS
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

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
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
              <MenuItem value="balance">Balance ⚖️ (Holiest)</MenuItem>
              <MenuItem value="total">Fluid Weight 🥂</MenuItem>
              <MenuItem value="choleric">Choleric 🟡</MenuItem>
              <MenuItem value="phlegmatic">Phlegmatic 🟢</MenuItem>
              <MenuItem value="melancholic">Melancholic ⚫</MenuItem>
              <MenuItem value="sanguine">Sanguine 🔴</MenuItem>
              <MenuItem value="hot">Hot (Choleric + Sanguine)</MenuItem>
              <MenuItem value="cold">Cold (Phlegmatic + Melancholic)</MenuItem>
              <MenuItem value="moist">Moist (Sanguine + Phlegmatic)</MenuItem>
              <MenuItem value="dry">Dry (Choleric + Melancholic)</MenuItem>
            </Select>
          </FormControl>
          
          {isMobile && (
            <IconButton
              onClick={() => onUnitTypeChange(unitType === "fluidOunces" ? "pints" : "fluidOunces")}
              sx={{
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)"
                }
              }}
              title={unitType === "fluidOunces" ? "Switch to pints" : "Switch to fluid ounces"}
            >
              {unitType === "fluidOunces" ? "fl oz" : "pt"}
            </IconButton>
          )}
          
          {!isMobile && (
            <IconButton
              onClick={toggleAutoCycle}
              sx={{
                color: "white",
                backgroundColor: isAutoCycling ? "rgba(255, 215, 0, 0.3)" : "transparent",
                border: isAutoCycling ? "2px solid gold" : "2px solid rgba(255, 255, 255, 0.3)",
                "&:hover": {
                  backgroundColor: isAutoCycling ? "rgba(255, 215, 0, 0.4)" : "rgba(255, 255, 255, 0.1)"
                }
              }}
              title={isAutoCycling ? "Stop auto-cycle" : "Auto-cycle rankings (15s each)"}
            >
              {isAutoCycling ? "⏸" : "▶"}
            </IconButton>
          )}
        </Box>

        {!isMobile && (
          <>
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)"
                }
              }}
              title={`Switch to ${currentTheme === "light" ? "dark" : "light"} mode`}
            >
              {currentTheme === "light" ? "🌙" : "☀️"}
            </IconButton>
            
            <IconButton
              onClick={() => onUnitTypeChange(unitType === "fluidOunces" ? "pints" : "fluidOunces")}
              sx={{
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)"
                }
              }}
              title={`Switch to ${unitType === "fluidOunces" ? "pints" : "fluid ounces"}`}
            >
              {unitType === "fluidOunces" ? "fl oz" : "pt"}
            </IconButton>
            
            <Button
              onClick={() => setOpenExplainer(true)}
              sx={{ color: "white", minWidth: "120px" }}
            >
              THE SACRED RULES OF ASCENSION
            </Button>
          </>
        )}
      </div>
      <Dialog
        open={openAdminModeModal}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{ sx: { backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary } }}
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
        PaperProps={{ sx: { backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary } }}
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
        PaperProps={{ sx: { backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary } }}
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
        PaperProps={{ sx: { backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary } }}
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
        PaperProps={{ sx: { backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary } }}
      >
        <DialogContent>
          <GameHistory unitType={unitType} adminMode={adminMode} />
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
        PaperProps={{ sx: { backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary } }}
      >
        <Explainer />
      </Dialog>

      <Dialog
        open={openFestivalBalance}
        onClose={() => setOpenFestivalBalance(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary } }}
      >
        <FestivalBalance />
      </Dialog>

      <CrestGallery
        open={openCrestGallery}
        onClose={() => setOpenCrestGallery(false)}
      />
    </>
  );
};
