import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton
} from "@mui/material";
import { IHouse } from "types/house";
import { CenteredModal } from "components/shared/CenteredModal";

interface ViewFactionModalProps {
  open: boolean;
  houses: IHouse[];
  factionName?: string;
  adminMode: boolean;
  onClose: () => void;
  onHouseClick: (houseId: number) => void;
  onDelete: () => void;
}

export const ViewFactionModal: React.FC<ViewFactionModalProps> = ({
  open,
  houses,
  factionName,
  adminMode,
  onClose,
  onHouseClick,
  onDelete,
}) => {
  return (
    <CenteredModal
      open={open}
      onClose={onClose}
      width={400}
      height="auto"
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
            {`Delete ${factionName || 'faction'}?`}
          </ListItemButton>
        )}
      </List>
    </CenteredModal>
  );
};
