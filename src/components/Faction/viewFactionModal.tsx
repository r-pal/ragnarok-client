import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Typography,
  Box,
  useTheme
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
  const theme = useTheme();
  
  return (
    <CenteredModal
      open={open}
      onClose={onClose}
      width={400}
      height="auto"
    >
      {factionName && (
        <Typography variant="h6" sx={{ px: 2, pt: 2, pb: 1, fontWeight: 'bold' }}>
          {factionName}
        </Typography>
      )}
      
      <Typography variant="caption" sx={{ px: 2, pb: 1, display: 'block', fontStyle: 'italic' }}>
        Learn more about{' '}
        <Box 
          component="a" 
          href="#factions"
          onClick={(e) => {
            e.preventDefault();
            const event = new CustomEvent('openSacredRules', { detail: { scrollTo: 'factions' } });
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
          The Binding of Houses
        </Box>
      </Typography>

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
