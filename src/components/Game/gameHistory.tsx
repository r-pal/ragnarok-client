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
} from "@mui/material";
import { useState } from "react";
import { getGames } from "mockAPI/getGames";
import { IGame } from "types/game";

export const GameHistory: React.FC = () => {
  const [selectedGameId, setSelectedGameId] = useState<number | "">("");

  const selectedGame = selectedGameId
    ? getGames.find((game) => game.id === selectedGameId)
    : null;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Game History
      </Typography>

      <Stack spacing={3}>
        <FormControl fullWidth>
          <InputLabel>Select Game</InputLabel>
          <Select
            value={selectedGameId}
            onChange={(e) => setSelectedGameId(e.target.value as number)}
            label="Select Game"
          >
            <MenuItem value="">
              <em>Choose a game...</em>
            </MenuItem>
            {getGames.map((game) => (
              <MenuItem key={game.id} value={game.id}>
                {game.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
                          {houseScore.score.choleric}
                        </TableCell>
                        <TableCell align="right">
                          {houseScore.score.phlegmatic}
                        </TableCell>
                        <TableCell align="right">
                          {houseScore.score.melancholic}
                        </TableCell>
                        <TableCell align="right">
                          {houseScore.score.sanguine}
                        </TableCell>
                        <TableCell align="right">
                          <strong>{total}</strong>
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
    </Box>
  );
};
