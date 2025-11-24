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
import { useData } from "../../context/DataContext";
import { IGame } from "types/game";
import { UnitType } from "../../App";
import { convertValue } from "helpers/scoreHelpers";

interface GameHistoryProps {
  unitType: UnitType;
}

export const GameHistory: React.FC<GameHistoryProps> = ({ unitType }) => {
  const { games } = useData();
  const [selectedGameId, setSelectedGameId] = useState<number | "">("");

  const selectedGame = selectedGameId
    ? games.find((game) => game.id === selectedGameId)
    : null;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Chronicle of Sacred Rites
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Behold the record of trials past and humours bestowed
      </Typography>

      <Stack spacing={3}>
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
    </Box>
  );
};
