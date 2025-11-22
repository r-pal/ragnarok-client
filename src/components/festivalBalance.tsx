import {
  Box,
  Typography,
  Paper,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { getHouses } from "mockAPI/getHouses";
import { getStandardDeviation } from "helpers/scoreHelpers";
import { HUMOUR_CONFIG, HUMOUR_ORDER } from "config/humourConfig";

export const FestivalBalance: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
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
    <Box sx={{ maxWidth: 700, mx: "auto", p: isMobile ? 2 : 3 }}>
      <Typography variant={isMobile ? "h4" : "h3"} gutterBottom sx={{ textAlign: "center", mb: isMobile ? 2 : 4 }}>
        The Great Reckoning
      </Typography>

      <Typography variant={isMobile ? "body2" : "body1"} color="text.secondary" paragraph sx={{ textAlign: "center", mb: isMobile ? 2 : 4 }}>
        Behold the combined humours of all houses in the Festival of Humoural Ascension—the measure of sacred balance ere the final rite.
      </Typography>

      <Paper elevation={3} sx={{ p: isMobile ? 2 : 3, mb: isMobile ? 2 : 3 }}>
        <Typography variant={isMobile ? "h6" : "h5"} gutterBottom sx={{ mb: isMobile ? 2 : 3 }}>
          The Four Humours Divine—Summed Across All Houses
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 2 : 3 }}>
          {HUMOUR_ORDER.map(humour => {
            const config = HUMOUR_CONFIG[humour];
            return (
              <Box key={humour}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 2, 
                    textAlign: "center",
                    border: "2px solid",
                    borderColor: config.borderColor
                  }}
                >
                  <Typography variant={isMobile ? "subtitle1" : "h6"} color="text.secondary">
                    {config.label} {config.emoji}
                  </Typography>
                  <Typography variant={isMobile ? "h4" : "h3"} sx={{ fontWeight: "bold", color: config.color }}>
                    {totalScores[humour].toLocaleString()}
                  </Typography>
                </Paper>
              </Box>
            );
          })}
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: isMobile ? 2 : 3, mb: isMobile ? 2 : 3, bgcolor: "rgba(0, 0, 0, 0.02)" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 2 : 3 }}>
          <Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant={isMobile ? "subtitle1" : "h6"} color="text.secondary" gutterBottom>
                Sum of All Humours
              </Typography>
              <Typography variant={isMobile ? "h4" : "h2"} sx={{ fontWeight: "bold" }}>
                {grandTotal.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant={isMobile ? "subtitle1" : "h6"} color="text.secondary" gutterBottom>
                Sacred Balance ⚖️
              </Typography>
              <Typography 
                variant={isMobile ? "h4" : "h2"} 
                sx={{ 
                  fontWeight: "bold",
                  color: overallBalance < 100 ? "green" : overallBalance < 200 ? "orange" : "red"
                }}
              >
                {overallBalance.toFixed()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 2, bgcolor: "rgba(255, 215, 0, 0.1)", border: "1px solid rgba(255, 215, 0, 0.3)" }}>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          <strong>The Doctrine of Balance:</strong> Lower is holier. A perfectly balanced festival achieves (σ) of 0, 
          wherein all four humours dwell in perfect harmony across all houses. Balance must be won ere the final rite, or all is unmade in pus and glory.
        </Typography>
      </Paper>
    </Box>
  );
};
