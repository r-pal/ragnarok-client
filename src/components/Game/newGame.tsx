import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper
} from "@mui/material";
import { useState } from "react";
import { getHouses } from "mockAPI/getHouses";
import { IGameScores } from "types/game";

interface GameResult {
  gameName: string;
  description: string;
  participatingHouseIds: number[];
  houseScores: IGameScores[];
}

const steps = ["Rite Information", "Houses Afflicted", "Reckon Humours"];

export const NewGame: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [gameName, setGameName] = useState("");
  const [description, setDescription] = useState("");
  const [participatingHouseIds, setParticipatingHouseIds] = useState<number[]>([]);
  const [houseScores, setHouseScores] = useState<Map<number, IGameScores>>(new Map());

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleHouseToggle = (houseId: number) => {
    setParticipatingHouseIds((prev) => {
      if (prev.includes(houseId)) {
        // Remove house
        const newScores = new Map(houseScores);
        newScores.delete(houseId);
        setHouseScores(newScores);
        return prev.filter((id) => id !== houseId);
      } else {
        // Add house
        const house = getHouses.find(h => h.id === houseId);
        const newScores = new Map(houseScores);
        newScores.set(houseId, {
          houseId,
          houseName: house?.name,
          score: {
            choleric: 0,
            phlegmatic: 0,
            melancholic: 0,
            sanguine: 0
          }
        });
        setHouseScores(newScores);
        return [...prev, houseId];
      }
    });
  };

  const handleScoreChange = (houseId: number, humour: keyof IGameScores["score"], value: number) => {
    const newScores = new Map(houseScores);
    const houseScore = newScores.get(houseId);
    if (houseScore) {
      houseScore.score[humour] = value;
      newScores.set(houseId, houseScore);
      setHouseScores(newScores);
    }
  };

  const handleSubmit = () => {
    const scoresArray = Array.from(houseScores.values());
    
    // Update scores for each house
    scoresArray.forEach(gameScore => {
      const house = getHouses.find(h => h.id === gameScore.houseId);
      if (house && house.score) {
        house.score.choleric += gameScore.score.choleric;
        house.score.phlegmatic += gameScore.score.phlegmatic;
        house.score.melancholic += gameScore.score.melancholic;
        house.score.sanguine += gameScore.score.sanguine;
      }
    });
    
    alert(`Sacred rite "${gameName}" inscribed! Humours bestowed upon ${scoresArray.length} house(s).`);
    // TODO: Add API call to save game result
    
    // Reset form
    setActiveStep(0);
    setGameName("");
    setDescription("");
    setParticipatingHouseIds([]);
    setHouseScores(new Map());
  };

  const isStep1Valid = gameName.trim().length > 0;
  const isStep2Valid = participatingHouseIds.length > 0;

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        // Step 1: Game Information
        return (
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Rite Name"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              required
              placeholder="e.g., The Leeching Trials, The Bleeding Contest"
            />
            <TextField
              fullWidth
              label="Rite Description (Optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              placeholder="Describe the sacred trial and its afflictions..."
            />
          </Stack>
        );

      case 1:
        // Step 2: Select Houses
        return (
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              Select all houses that endured this sacred trial:
            </Typography>
            {getHouses.map((house) => (
              <FormControlLabel
                key={house.id}
                control={
                  <Checkbox
                    checked={participatingHouseIds.includes(house.id)}
                    onChange={() => handleHouseToggle(house.id)}
                  />
                }
                label={house.name}
              />
            ))}
          </Stack>
        );

      case 2:
        // Step 3: Enter Scores
        const participatingHouses = getHouses.filter(h => participatingHouseIds.includes(h.id));
        return (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>House</strong></TableCell>
                  <TableCell align="center"><strong>Choleric 🟡</strong></TableCell>
                  <TableCell align="center"><strong>Phlegmatic 🟢</strong></TableCell>
                  <TableCell align="center"><strong>Melancholic ⚫</strong></TableCell>
                  <TableCell align="center"><strong>Sanguine 🔴</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participatingHouses.map((house) => {
                  const score = houseScores.get(house.id)?.score || {
                    choleric: 0,
                    phlegmatic: 0,
                    melancholic: 0,
                    sanguine: 0
                  };
                  return (
                    <TableRow key={house.id}>
                      <TableCell>{house.name}</TableCell>
                      <TableCell align="center">
                        <TextField
                          type="number"
                          value={score.choleric}
                          onChange={(e) => handleScoreChange(house.id, "choleric", Number(e.target.value))}
                          inputProps={{ step: 1 }}
                          size="small"
                          sx={{ width: 80 }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          type="number"
                          value={score.phlegmatic}
                          onChange={(e) => handleScoreChange(house.id, "phlegmatic", Number(e.target.value))}
                          inputProps={{ step: 1 }}
                          size="small"
                          sx={{ width: 80 }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          type="number"
                          value={score.melancholic}
                          onChange={(e) => handleScoreChange(house.id, "melancholic", Number(e.target.value))}
                          inputProps={{ step: 1 }}
                          size="small"
                          sx={{ width: 80 }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          type="number"
                          value={score.sanguine}
                          onChange={(e) => handleScoreChange(house.id, "sanguine", Number(e.target.value))}
                          inputProps={{ step: 1 }}
                          size="small"
                          sx={{ width: 80 }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Record Sacred Rite
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Inscribe the outcome of a trial and bestow humours upon the worthy
      </Typography>
      
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ minHeight: 300, mb: 3 }}>
        {renderStepContent()}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        <Box>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Inscribe Sacred Rite
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={
                (activeStep === 0 && !isStep1Valid) ||
                (activeStep === 1 && !isStep2Valid)
              }
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};
