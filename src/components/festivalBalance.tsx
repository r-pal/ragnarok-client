import {
  Box,
  Typography,
  Paper
} from "@mui/material";
import { getHouses } from "mockAPI/getHouses";
import { getStandardDeviation } from "helpers/maths";

export const FestivalBalance: React.FC = () => {
  // Calculate total scores across all houses
  const totalScores = getHouses.reduce(
    (acc, house) => {
      if (house.score) {
        acc.choleric += house.score.choleric;
        acc.phlegmatic += house.score.phlegmatic;
        acc.melancholic += house.score.melancholic;
        acc.sanguine += house.score.sanguine;
      }
      return acc;
    },
    { choleric: 0, phlegmatic: 0, melancholic: 0, sanguine: 0 }
  );

  // Calculate overall balance (standard deviation)
  const overallBalance = getStandardDeviation([
    totalScores.choleric,
    totalScores.phlegmatic,
    totalScores.melancholic,
    totalScores.sanguine
  ]);

  // Calculate grand total
  const grandTotal = 
    totalScores.choleric + 
    totalScores.phlegmatic + 
    totalScores.melancholic + 
    totalScores.sanguine;

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 3 }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        Festival Balance
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph sx={{ textAlign: "center", mb: 4 }}>
        The combined humour scores across all houses in Ragnarök, representing the overall balance of the festival.
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Total Humour Scores
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
          <Box>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 2, 
                textAlign: "center",
                border: "2px solid",
                borderColor: "gold"
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Choleric 🟡
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold", color: "goldenrod" }}>
                {totalScores.choleric.toLocaleString()}
              </Typography>
            </Paper>
          </Box>

          <Box>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 2, 
                textAlign: "center",
                border: "2px solid",
                borderColor: "green"
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Phlegmatic 🟢
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold", color: "green" }}>
                {totalScores.phlegmatic.toLocaleString()}
              </Typography>
            </Paper>
          </Box>

          <Box>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 2, 
                textAlign: "center",
                border: "2px solid",
                borderColor: "gray"
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Melancholic ⚫
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold", color: "gray" }}>
                {totalScores.melancholic.toLocaleString()}
              </Typography>
            </Paper>
          </Box>

          <Box>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 2, 
                textAlign: "center",
                border: "2px solid",
                borderColor: "crimson"
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Sanguine 🔴
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold", color: "crimson" }}>
                {totalScores.sanguine.toLocaleString()}
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: "rgba(0, 0, 0, 0.02)" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
          <Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Grand Total
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                {grandTotal.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Overall Balance (σ)
              </Typography>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: "bold",
                  color: overallBalance < 100 ? "green" : overallBalance < 200 ? "orange" : "red"
                }}
              >
                {overallBalance.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 2, bgcolor: "rgba(255, 215, 0, 0.1)", border: "1px solid rgba(255, 215, 0, 0.3)" }}>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          <strong>Balance Interpretation:</strong> Lower is better. A perfectly balanced festival would have a balance (σ) of 0, 
          meaning all four humours are in perfect harmony across all houses.
        </Typography>
      </Paper>
    </Box>
  );
};
