import { 
  Box, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  useTheme,
  SelectChangeEvent
} from "@mui/material";
import { useState, useEffect } from "react";
import { IHouse } from "types/house";
import { useData } from "../../context/DataContext";
import { CenteredModal } from "components/shared/CenteredModal";

interface CrestGalleryProps {
  open: boolean;
  onClose: () => void;
}

export const CrestGallery: React.FC<CrestGalleryProps> = ({ open, onClose }) => {
  const { houses } = useData();
  const theme = useTheme();
  const [selectedHouseId, setSelectedHouseId] = useState<number | null>(null);
  
  // Set first house as default when houses load
  useEffect(() => {
    if (houses.length > 0 && selectedHouseId === null) {
      setSelectedHouseId(houses[0].id);
    }
  }, [houses, selectedHouseId]);

  const selectedHouse = houses.find(h => h.id === selectedHouseId);

  const handleHouseChange = (event: SelectChangeEvent<number>) => {
    setSelectedHouseId(event.target.value as number);
  };

  return (
    <CenteredModal 
      open={open} 
      onClose={onClose} 
      width="95vw" 
      height="95vh" 
      maxHeight="95vh"
      backgroundColor={theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff'}
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        gap: 3
      }}>
        {/* Header with dropdown */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: theme.palette.text.primary,
              fontWeight: 'bold'
            }}
          >
            Gallery of Crests
          </Typography>
          
          <FormControl sx={{ minWidth: 250 }}>
            <InputLabel sx={{ color: theme.palette.text.secondary }}>
              Select House
            </InputLabel>
            <Select
              value={selectedHouseId || ''}
              label="Select House"
              onChange={handleHouseChange}
              sx={{
                color: theme.palette.text.primary,
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.divider
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.text.secondary
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main
                },
                '.MuiSvgIcon-root': {
                  color: theme.palette.text.secondary
                }
              }}
            >
              {houses.map((house) => (
                <MenuItem key={house.id} value={house.id}>
                  {house.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Crest Display */}
        {selectedHouse && (
          <Box sx={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            overflow: 'hidden'
          }}>
            {/* House Name */}
            <Typography 
              variant="h3" 
              sx={{ 
                color: theme.palette.text.primary,
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              {selectedHouse.name}
            </Typography>

            {/* Motto */}
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.text.secondary,
                fontStyle: 'italic',
                textAlign: 'center',
                opacity: 0.9
              }}
            >
              "{selectedHouse.motto}"
            </Typography>

            {/* Crest Image */}
            <Box sx={{ 
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxHeight: 'calc(100% - 200px)',
              overflow: 'hidden'
            }}>
              {selectedHouse.crestUrl ? (
                <img 
                  src={selectedHouse.crestUrl} 
                  alt={`${selectedHouse.name} crest`}
                  style={{ 
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    borderRadius: '8px'
                  }} 
                />
              ) : (
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    fontStyle: 'italic'
                  }}
                >
                  No crest available for this house
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {houses.length === 0 && (
          <Box sx={{ 
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.text.secondary,
                fontStyle: 'italic'
              }}
            >
              No houses have been consecrated yet
            </Typography>
          </Box>
        )}
      </Box>
    </CenteredModal>
  );
};
