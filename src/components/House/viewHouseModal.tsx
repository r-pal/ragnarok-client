import { Box, Button, Typography, Stack, TextField, Divider, Collapse, useTheme, Link } from "@mui/material";
import { useState, useEffect } from "react";
import { IHouse, IPostHouse } from "types/house";
import { IScore } from "types/shared";
import { getHouses } from "mockAPI/getHouses";
import { HouseGameHistory } from "./houseGameHistory";
import { CenteredModal } from "components/shared/CenteredModal";
import { HumourSelect } from "components/shared/HumourSelect";
import { CrestSearch } from "components/shared/CrestSearch";
import { UnitType } from "../../App";

interface ViewHouseModalProps {
  open: boolean;
  house: IHouse;
  adminMode: boolean;
  onClose: () => void;
  onDelete: () => void;
  humourScores: (score: IScore) => React.ReactElement;
  unitType: UnitType;
}

export const ViewHouseModal: React.FC<ViewHouseModalProps> = ({
  open,
  house,
  adminMode,
  onClose,
  onDelete,
  humourScores,
  unitType,
}) => {
  const theme = useTheme();
  const [isEditMode, setIsEditMode] = useState(false);
  const [openGameHistory, setOpenGameHistory] = useState(false);
  const [showCrestSearch, setShowCrestSearch] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [editHouse, setEditHouse] = useState<IPostHouse>({
    name: "",
    motto: "",
    crestUrl: "",
    strength: "choleric",
    weakness: "phlegmatic",
    password: ""
  });

  // Initialize edit state when house changes
  useEffect(() => {
    if (house) {
      setEditHouse({
        name: house.name,
        motto: house.motto,
        crestUrl: house.crestUrl || "",
        strength: house.strength,
        weakness: house.weakness,
        password: house.password
      });
    }
  }, [house]);

  const handleClose = () => {
    setIsEditMode(false);
    onClose();
  };

  const handleEditClick = () => {
    if (adminMode) {
      setIsEditMode(true);
      setIsPasswordVerified(true);
    } else {
      setShowPasswordPrompt(true);
    }
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === house.password) {
      setIsPasswordVerified(true);
      setShowPasswordPrompt(false);
      setIsEditMode(true);
      setPasswordInput("");
    } else {
      alert("Incorrect password! Thy sacred key doth not match.");
    }
  };

  const handleSaveEdit = () => {
    // Validate that strength and weakness are different
    if (editHouse.strength === editHouse.weakness) {
      alert("Strength and weakness cannot be the same humour!");
      return;
    }

    const houseToUpdate = getHouses.find(h => h.id === house.id);
    if (houseToUpdate && editHouse.strength && editHouse.weakness) {
      houseToUpdate.name = editHouse.name;
      houseToUpdate.motto = editHouse.motto;
      houseToUpdate.crestUrl = editHouse.crestUrl;
      houseToUpdate.strength = editHouse.strength;
      houseToUpdate.weakness = editHouse.weakness;
      
      setIsEditMode(false);
      alert(`House "${editHouse.name}" updated successfully!`);
    }
  };

  const handleCancelEdit = () => {
    setEditHouse({
      name: house.name,
      motto: house.motto,
      crestUrl: house.crestUrl || "",
      strength: house.strength,
      weakness: house.weakness,
      password: house.password
    });
    setIsEditMode(false);
    setIsPasswordVerified(false);
    setPasswordInput("");
  };
  return (
    <>
      <CenteredModal open={open} onClose={handleClose} width={500} height="auto" maxHeight="90vh" backgroundColor={theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff'}>
          {isEditMode ? (
            <Stack spacing={3}>
              <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>Edit House</Typography>
              
              <TextField
                fullWidth
                label="Name"
                value={editHouse.name}
                onChange={(e) => setEditHouse({...editHouse, name: e.target.value})}
                sx={{
                  '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                  '& .MuiOutlinedInput-root': {
                    color: theme.palette.text.primary,
                    '& fieldset': { borderColor: theme.palette.divider },
                    '&:hover fieldset': { borderColor: theme.palette.text.secondary },
                    '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main }
                  }
                }}
              />
              
              <TextField
                fullWidth
                label="Motto"
                value={editHouse.motto}
                onChange={(e) => setEditHouse({...editHouse, motto: e.target.value})}
                sx={{
                  '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                  '& .MuiOutlinedInput-root': {
                    color: theme.palette.text.primary,
                    '& fieldset': { borderColor: theme.palette.divider },
                    '&:hover fieldset': { borderColor: theme.palette.text.secondary },
                    '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main }
                  }
                }}
              />
              
              <Box>
                <TextField
                  fullWidth
                  label="Crest URL"
                  value={editHouse.crestUrl}
                  onChange={(e) => setEditHouse({...editHouse, crestUrl: e.target.value})}
                  sx={{
                    '& .MuiInputLabel-root': { color: theme.palette.text.secondary },
                    '& .MuiOutlinedInput-root': {
                      color: theme.palette.text.primary,
                      '& fieldset': { borderColor: theme.palette.divider },
                      '&:hover fieldset': { borderColor: theme.palette.text.secondary },
                      '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main }
                    }
                  }}
                />
                <Button 
                  onClick={() => setShowCrestSearch(!showCrestSearch)}
                  sx={{ mt: 1 }}
                  variant="outlined"
                  size="small"
                >
                  {showCrestSearch ? "Hide Search" : "Search Wikimedia Commons"}
                </Button>
              </Box>
              
              <Collapse in={showCrestSearch}>
                <CrestSearch 
                  onSelectCrest={(url) => {
                    setEditHouse({...editHouse, crestUrl: url});
                    setShowCrestSearch(false);
                  }}
                />
              </Collapse>
              
              {editHouse.crestUrl && (
                <Box>
                  <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>Preview:</Typography>
                  <img src={editHouse.crestUrl} style={{ height: 64, borderRadius: 4 }} alt="Crest preview" />
                </Box>
              )}
              <HumourSelect
                label="Strength"
                name="strength"
                value={editHouse.strength}
                onChange={(e) => setEditHouse({...editHouse, strength: e.target.value as any})}
                required
                disabled={!adminMode}
              />
              
              <HumourSelect
                label="Weakness"
                name="weakness"
                value={editHouse.weakness}
                onChange={(e) => setEditHouse({...editHouse, weakness: e.target.value as any})}
                required
                disabled={!adminMode}
              />

              {!adminMode && (
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontStyle: 'italic', opacity: 0.8 }}>
                  * Strength and Weakness can only be changed by{' '}
                  <Box 
                    component="a" 
                    href="#divine-clemency"
                    onClick={(e) => {
                      e.preventDefault();
                      // Open Sacred Rules modal (handled by parent)
                      const event = new CustomEvent('openSacredRules', { detail: { scrollTo: 'divine-clemency' } });
                      window.dispatchEvent(event);
                    }}
                    sx={{ 
                      color: theme.palette.primary.main, 
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      '&:hover': {
                        color: theme.palette.secondary.main
                      }
                    }}
                  >
                    Divine Clemency
                  </Box>
                </Typography>
              )}

              <TextField
                fullWidth
                label="House Password"
                type="password"
                value={editHouse.password}
                onChange={(e) => setEditHouse({...editHouse, password: e.target.value})}
                required
                helperText="Change password to protect thy house"
              />
              
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button onClick={handleCancelEdit} variant="outlined" sx={{ color: theme.palette.text.primary, borderColor: theme.palette.divider }}>CANCEL</Button>
                <Button onClick={handleSaveEdit} variant="contained">SAVE</Button>
              </Stack>
            </Stack>
          ) : (
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <img src={house.crestUrl} style={{ height: 64, borderRadius: 4 }} alt="House crest" />
                <Box>
                  <Typography variant="h5" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>{house.name}</Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontStyle: 'italic', opacity: 0.8 }}>"{house.motto}"</Typography>
                </Box>
              </Box>
              
              <Divider sx={{ borderColor: theme.palette.divider }} />
              
              <Box>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  <strong style={{ color: theme.palette.primary.main }}>Blessed Affliction:</strong> {house.strength?.charAt(0).toUpperCase() + house.strength?.slice(1)}{' '}

                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 1 }}>
                  <strong style={{ color: theme.palette.secondary.main }}>Sacred Weakness:</strong> {house.weakness?.charAt(0).toUpperCase() + house.weakness?.slice(1)}{' '}
                </Typography>
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      const event = new CustomEvent('openSacredRules', { detail: { scrollTo: 'thy-house-and-glory' } });
                      window.dispatchEvent(event);
                    }}
                    sx={{ 
                      fontSize: '0.75rem',
                      color: theme.palette.secondary.main,
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      '&:hover': { color: theme.palette.secondary.dark }
                    }}
                  >
                    come ye here, seeker of knowledge
                  </Link>
              </Box>
              
              {house.score && (
                <Box>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>Humour Scores:</Typography>
                  {humourScores(house.score)}
                </Box>
              )}
              
              <Divider sx={{ borderColor: theme.palette.divider }} />
              
              <Stack direction="row" spacing={0} gap={2} flexWrap="wrap" sx={{ '& > button': { flex: { xs: '1 1 100%', sm: '1 1 0' } } }}>
                <Button onClick={() => setOpenGameHistory(true)} variant="outlined" sx={{ color: theme.palette.text.primary, borderColor: theme.palette.divider }}>VIEW GAME HISTORY</Button>
                <Button onClick={handleEditClick} variant="contained" color="primary">EDIT</Button>
                <Button onClick={handleClose} variant="outlined" sx={{ color: theme.palette.text.primary, borderColor: theme.palette.divider }}>CLOSE</Button>
                {adminMode && (
                  <Button onClick={onDelete} variant="contained" color="error">DELETE</Button>
                )}
              </Stack>
            </Stack>
          )}
      </CenteredModal>

      {/* Password Prompt Dialog */}
      <CenteredModal open={showPasswordPrompt} onClose={() => setShowPasswordPrompt(false)} width={400} height="auto">
        <Stack spacing={3}>
          <Typography variant="h6">Enter House Password</Typography>
          <Typography variant="body2" color="text.secondary">
            To edit this house without admin access, enter the sacred key.
          </Typography>
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
            autoFocus
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={() => setShowPasswordPrompt(false)} variant="outlined">CANCEL</Button>
            <Button onClick={handlePasswordSubmit} variant="contained">SUBMIT</Button>
          </Stack>
        </Stack>
      </CenteredModal>

      <HouseGameHistory
        open={openGameHistory}
        house={house}
        onClose={() => setOpenGameHistory(false)}
        unitType={unitType}
      />
    </>
  );
};
