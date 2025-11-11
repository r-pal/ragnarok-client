import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Modal
} from "@mui/material";
import { IHouse } from "types/house";

interface ViewFactionModalProps {
  open: boolean;
  houses: IHouse[];
  adminMode: boolean;
  onClose: () => void;
  onHouseClick: (houseId: number) => void;
  onDelete: () => void;
}

export const ViewFactionModal: React.FC<ViewFactionModalProps> = ({
  open,
  houses,
  adminMode,
  onClose,
  onHouseClick,
  onDelete,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        backgroundColor: "brown",
        transform: "translate(-50%, -50%)"
      }}
    >
      <List>
        {houses?.map((house) => (
          <ListItem disablePadding key={house.id}>
            <ListItemButton onClick={() => onHouseClick(house.id)}>
              <ListItemAvatar>
                <img src={house.crestUrl} style={{ height: 24 }} />
              </ListItemAvatar>
              {house.name}
            </ListItemButton>
          </ListItem>
        ))}
        {adminMode && (
          <ListItemButton onClick={onDelete}>
            {`delete faction of ${houses?.map((h) => h.name).join(" + ")}?`}
          </ListItemButton>
        )}
      </List>
    </Modal>
  );
};
