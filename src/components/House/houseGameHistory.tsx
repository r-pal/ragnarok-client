import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from "@mui/material";
import { getGames } from "mockAPI/getGames";
import { IHouse } from "types/house";
import { UnitType } from "../../App";
import { convertValue } from "helpers/scoreHelpers";

interface HouseGameHistoryProps {
  open: boolean;
  house: IHouse;
  onClose: () => void;
  unitType: UnitType;
}

export const HouseGameHistory: React.FC<HouseGameHistoryProps> = ({
  open,
  house,
  onClose,
  unitType,
}) => {
  // Filter games where this house participated
  const houseGames = getGames
    .map(game => {
      const houseScore = game.scores.find(s => s.houseId === house.id);
      if (!houseScore) return null;
      
      const total = 
        houseScore.score.choleric +
        houseScore.score.phlegmatic +
        houseScore.score.melancholic +
        houseScore.score.sanguine;
      
      return {
        gameId: game.id,
        gameName: game.name,
        score: houseScore.score,
        total
      };
    })
    .filter(game => game !== null);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Game History - {house.name}
      </DialogTitle>
      <DialogContent>
        {houseGames.length === 0 ? (
          <Typography>No game history found for this house.</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Game</strong></TableCell>
                  <TableCell align="right"><strong>Choleric</strong></TableCell>
                  <TableCell align="right"><strong>Phlegmatic</strong></TableCell>
                  <TableCell align="right"><strong>Melancholic</strong></TableCell>
                  <TableCell align="right"><strong>Sanguine</strong></TableCell>
                  <TableCell align="right"><strong>Total</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {houseGames.map((game) => (
                  <TableRow key={game!.gameId}>
                    <TableCell component="th" scope="row">
                      {game!.gameName}
                    </TableCell>
                    <TableCell align="right">{Math.round(convertValue(game!.score.choleric, unitType))}</TableCell>
                    <TableCell align="right">{Math.round(convertValue(game!.score.phlegmatic, unitType))}</TableCell>
                    <TableCell align="right">{Math.round(convertValue(game!.score.melancholic, unitType))}</TableCell>
                    <TableCell align="right">{Math.round(convertValue(game!.score.sanguine, unitType))}</TableCell>
                    <TableCell align="right">
                      <strong>{Math.round(convertValue(game!.total, unitType))}</strong>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose}>Close</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
