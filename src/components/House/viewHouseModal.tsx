import { Box, Button, Modal } from "@mui/material";
import { useState, useEffect } from "react";
import { IHouse, IPostHouse } from "types/house";
import { IScore, Humours, humourOptions } from "types/shared";
import { getHouses } from "mockAPI/getHouses";
import { getScoreboard } from "mockAPI/getScoreboard";
import { HouseGameHistory } from "./houseGameHistory";

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
      
      const scoreboardEntry = getScoreboard.find(entry => 
        entry.houseIds && entry.houseIds.length === 1 && entry.houseIds[0] === house.id
      );
      if (scoreboardEntry) {
        scoreboardEntry.name = editHouse.name;
      }
      
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
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Box
          style={{
            gap: 4,
            height: 400,
            width: 300
          }}
        >
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
              <div>
                <label>Strength: </label>
                <select 
                  value={editHouse.strength} 
                  onChange={(e) => setEditHouse({...editHouse, strength: e.target.value as Humours})}
                >
                  {humourOptions.map((humour) => (
                    <option key={humour} value={humour}>
                      {humour.charAt(0).toUpperCase() + humour.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Weakness: </label>
                <select 
                  value={editHouse.weakness} 
                  onChange={(e) => setEditHouse({...editHouse, weakness: e.target.value as Humours})}
                >
                  {humourOptions.map((humour) => (
                    <option key={humour} value={humour}>
                      {humour.charAt(0).toUpperCase() + humour.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
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
        </Box>
      </Modal>
      <HouseGameHistory
        open={openGameHistory}
        house={house}
        onClose={() => setOpenGameHistory(false)}
      />
    </>
  );
};
