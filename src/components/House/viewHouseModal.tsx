import { Box, Button, Typography, Stack, TextField, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { IHouse, IPostHouse } from "types/house";
import { IScore } from "types/shared";
import { getHouses } from "mockAPI/getHouses";
import { HouseGameHistory } from "./houseGameHistory";
import { CenteredModal } from "components/shared/CenteredModal";
import { HumourSelect } from "components/shared/HumourSelect";

interface ViewHouseModalProps {
  open: boolean;
  house: IHouse;
  adminMode: boolean;
  onClose: () => void;
  onDelete: () => void;
  humourScores: (score: IScore) => React.ReactElement;
}

export const ViewHouseModal: React.FC<ViewHouseModalProps> = ({
  open,
  house,
  adminMode,
  onClose,
  onDelete,
  humourScores,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [openGameHistory, setOpenGameHistory] = useState(false);
  const [editHouse, setEditHouse] = useState<IPostHouse>({
    name: "",
    motto: "",
    crestUrl: "",
    strength: "choleric",
    weakness: "phlegmatic"
  });

  // Initialize edit state when house changes
  useEffect(() => {
    if (house) {
      setEditHouse({
        name: house.name,
        motto: house.motto,
        crestUrl: house.crestUrl || "",
        strength: house.strength,
        weakness: house.weakness
      });
    }
  }, [house]);

  const handleClose = () => {
    setIsEditMode(false);
    onClose();
  };

  const handleEditClick = () => {
    setIsEditMode(true);
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
      weakness: house.weakness
    });
    setIsEditMode(false);
  };
  return (
    <>
      <CenteredModal open={open} onClose={handleClose} width={500} height="auto" backgroundColor="rgba(20, 20, 20, 0.98)">
          {isEditMode ? (
            <Stack spacing={3}>
              <Typography variant="h5" sx={{ color: "white" }}>Edit House</Typography>
              
              <TextField
                fullWidth
                label="Name"
                value={editHouse.name}
                onChange={(e) => setEditHouse({...editHouse, name: e.target.value})}
                sx={{
                  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: 'white' }
                  }
                }}
              />
              
              <TextField
                fullWidth
                label="Motto"
                value={editHouse.motto}
                onChange={(e) => setEditHouse({...editHouse, motto: e.target.value})}
                sx={{
                  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: 'white' }
                  }
                }}
              />
              
              <TextField
                fullWidth
                label="Crest URL"
                value={editHouse.crestUrl}
                onChange={(e) => setEditHouse({...editHouse, crestUrl: e.target.value})}
                sx={{
                  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: 'white' }
                  }
                }}
              />
              
              {editHouse.crestUrl && (
                <Box>
                  <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>Preview:</Typography>
                  <img src={editHouse.crestUrl} style={{ height: 64, borderRadius: 4 }} alt="Crest preview" />
                </Box>
              )}
              <HumourSelect
                label="Strength"
                name="strength"
                value={editHouse.strength}
                onChange={(e) => setEditHouse({...editHouse, strength: e.target.value as any})}
                required
              />
              
              <HumourSelect
                label="Weakness"
                name="weakness"
                value={editHouse.weakness}
                onChange={(e) => setEditHouse({...editHouse, weakness: e.target.value as any})}
                required
              />
              
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button onClick={handleCancelEdit} variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.3)' }}>CANCEL</Button>
                <Button onClick={handleSaveEdit} variant="contained">SAVE</Button>
              </Stack>
            </Stack>
          ) : (
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <img src={house.crestUrl} style={{ height: 64, borderRadius: 4 }} alt="House crest" />
                <Box>
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>{house.name}</Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontStyle: 'italic' }}>"{house.motto}"</Typography>
                </Box>
              </Box>
              
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              
              <Box>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  <strong style={{ color: 'gold' }}>Blessed Affliction:</strong> {house.strength?.charAt(0).toUpperCase() + house.strength?.slice(1)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1 }}>
                  <strong style={{ color: 'silver' }}>Sacred Weakness:</strong> {house.weakness?.charAt(0).toUpperCase() + house.weakness?.slice(1)}
                </Typography>
              </Box>
              
              {house.score && (
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>Humour Scores:</Typography>
                  {humourScores(house.score)}
                </Box>
              )}
              
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Button onClick={() => setOpenGameHistory(true)} variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.3)' }}>VIEW GAME HISTORY</Button>
                <Button onClick={handleClose} variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.3)' }}>CLOSE</Button>
                {adminMode && (
                  <Button onClick={handleEditClick} variant="contained" color="primary">EDIT</Button>
                )}
                {adminMode && (
                  <Button onClick={onDelete} variant="contained" color="error">DELETE</Button>
                )}
              </Stack>
            </Stack>
          )}
      </CenteredModal>
      <HouseGameHistory
        open={openGameHistory}
        house={house}
        onClose={() => setOpenGameHistory(false)}
      />
    </>
  );
};
