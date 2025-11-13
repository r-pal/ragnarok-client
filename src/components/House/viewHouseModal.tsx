import { Box, Button } from "@mui/material";
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
      <CenteredModal open={open} onClose={handleClose} width={400} height="auto">
          {isEditMode ? (
            <>
              <div>Edit House</div>
              <div>
                <label>Name: </label>
                <input 
                  type="text" 
                  value={editHouse.name} 
                  onChange={(e) => setEditHouse({...editHouse, name: e.target.value})}
                  style={{ width: "100%" }}
                />
              </div>
              <div>
                <label>Motto: </label>
                <input 
                  type="text" 
                  value={editHouse.motto} 
                  onChange={(e) => setEditHouse({...editHouse, motto: e.target.value})}
                  style={{ width: "100%" }}
                />
              </div>
              <div>
                <label>Crest URL: </label>
                <input 
                  type="text" 
                  value={editHouse.crestUrl} 
                  onChange={(e) => setEditHouse({...editHouse, crestUrl: e.target.value})}
                  style={{ width: "100%" }}
                />
              </div>
              {editHouse.crestUrl && (
                <div>
                  <div>Preview:</div>
                  <img src={editHouse.crestUrl} style={{ height: 48 }} />
                </div>
              )}
              <Box sx={{ mt: 2, mb: 2 }}>
                <HumourSelect
                  label="Strength"
                  name="strength"
                  value={editHouse.strength}
                  onChange={(e) => setEditHouse({...editHouse, strength: e.target.value as any})}
                  required
                />
              </Box>
              <Box sx={{ mt: 2, mb: 2 }}>
                <HumourSelect
                  label="Weakness"
                  name="weakness"
                  value={editHouse.weakness}
                  onChange={(e) => setEditHouse({...editHouse, weakness: e.target.value as any})}
                  required
                />
              </Box>
              <Button onClick={handleCancelEdit}>CANCEL</Button>
              <Button onClick={handleSaveEdit}>SAVE</Button>
            </>
          ) : (
            <>
              <img src={house.crestUrl} style={{ height: 48 }} />
              <div>{house.name}</div>
              <div>{house.motto}</div>
              <div>{`Strong Humour: ${house.strength}`}</div>
              <div>{`Weak Humour: ${house.weakness}`}</div>
              {house.score && humourScores(house.score)}
              <Button onClick={() => setOpenGameHistory(true)}>VIEW GAME HISTORY</Button>
              <Button onClick={handleClose}>CLOSE</Button>
              {adminMode && (
                <Button onClick={handleEditClick}>EDIT</Button>
              )}
              {adminMode && (
                <Button onClick={onDelete}>DELETE</Button>
              )}
            </>
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
