import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  useTheme,
  Link,
} from "@mui/material";
import { useState } from "react";
import { useData } from "../../context/DataContext";
import { IGame } from "types/game";
import { UnitType } from "../../App";
import { convertValue } from "helpers/scoreHelpers";

interface GameHistoryProps {
  unitType: UnitType;
  adminMode?: boolean;
}

export const GameHistory: React.FC<GameHistoryProps> = ({ unitType, adminMode = false }) => {
  const { games, deleteGame } = useData();
  const [selectedGameId, setSelectedGameId] = useState<number | "">("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [gameToDelete, setGameToDelete] = useState<IGame | null>(null);
  const theme = useTheme();

  const selectedGame = selectedGameId
    ? games.find((game) => game.id === selectedGameId)
    : null;

  const handleDeleteClick = (game: IGame) => {
    setGameToDelete(game);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (gameToDelete) {
      try {
        await deleteGame(gameToDelete.id);
        setDeleteDialogOpen(false);
        setGameToDelete(null);
        // Clear selection if deleted game was selected
        if (selectedGameId === gameToDelete.id) {
          setSelectedGameId("");
        }
      } catch (error) {
        console.error('Failed to delete game:', error);
        alert('Failed to delete rite. Please try again.');
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setGameToDelete(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Chronicle of Sacred Rites
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Behold the record of trials past and humours bestowed.{' '}
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            const event = new CustomEvent('openSacredRules', { detail: { scrollTo: 'rite-types-table' } });
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
          Look ye! to all Great Rites and their humours
        </Link>
      </Typography>

      <Stack spacing={3}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <FormControl fullWidth>
            <InputLabel>Select Sacred Rite</InputLabel>
            <Select
              value={selectedGameId}
              onChange={(e) => setSelectedGameId(e.target.value as number)}
              label="Select Sacred Rite"
            >
              <MenuItem value="">
                <em>Choose a rite...</em>
              </MenuItem>
              {games.map((game) => (
                <MenuItem key={game.id} value={game.id}>
                  {game.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {adminMode && selectedGame && (
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeleteClick(selectedGame)}
              sx={{ minWidth: '120px', height: '56px' }}
            >
              DELETE RITE
            </Button>
          )}
        </Box>

        {selectedGame && (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
              {selectedGame.name}
            </Typography>
            
            {selectedGame.description && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontStyle: "italic" }}>
                {selectedGame.description}
              </Typography>
            )}

            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>House</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Choleric</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Phlegmatic</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Melancholic</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Sanguine</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Total</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedGame.scores.map((houseScore) => {
                    const total =
                      houseScore.score.choleric +
                      houseScore.score.phlegmatic +
                      houseScore.score.melancholic +
                      houseScore.score.sanguine;

                    return (
                      <TableRow key={houseScore.houseId}>
                        <TableCell component="th" scope="row">
                          {houseScore.houseName || `House ${houseScore.houseId}`}
                        </TableCell>
                        <TableCell align="right">
                          {Math.round(convertValue(houseScore.score.choleric, unitType))}
                        </TableCell>
                        <TableCell align="right">
                          {Math.round(convertValue(houseScore.score.phlegmatic, unitType))}
                        </TableCell>
                        <TableCell align="right">
                          {Math.round(convertValue(houseScore.score.melancholic, unitType))}
                        </TableCell>
                        <TableCell align="right">
                          {Math.round(convertValue(houseScore.score.sanguine, unitType))}
                        </TableCell>
                        <TableCell align="right">
                          <strong>{Math.round(convertValue(total, unitType))}</strong>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Stack>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary
          }
        }}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: theme.palette.text.secondary }}>
            Art thou certain thou wishest to erase this sacred rite from the chronicles?
            <br />
            <br />
            <strong style={{ color: theme.palette.error.main }}>
              "{gameToDelete?.name}"
            </strong>
            <br />
            <br />
            This action cannot be undone, and all recorded humours shall be lost forever.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} sx={{ color: theme.palette.text.primary }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            Delete Forever
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
