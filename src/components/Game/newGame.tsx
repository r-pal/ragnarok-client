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
import { useData } from "../../context/DataContext";
import { IGameScores } from "types/game";
import { HUMOUR_CONFIG, HUMOUR_ORDER } from "config/humourConfig";
import { Humours } from "types/shared";

interface GameResult {
  gameName: string;
  description: string;
  participatingHouseIds: number[];
  houseScores: IGameScores[];
}

const steps = ["Rite Information", "Houses Afflicted", "Reckon Humours"];

export const NewGame: React.FC = () => {
  const { houses, createGame } = useData();
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
        const house = houses.find(h => h.id === houseId);
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

  const handleSubmit = async () => {
    const scoresArray = Array.from(houseScores.values());
    
    try {
      await createGame({
        name: gameName,
        description,
        scores: scoresArray
      });
      
      alert("Rite recorded successfully! The sacred humours have been distributed.");
      
      // Reset form
      setActiveStep(0);
      setGameName("");
      setDescription("");
      setParticipatingHouseIds([]);
      setHouseScores(new Map());
    } catch (error) {
      console.error('Failed to record rite:', error);
      alert('Failed to record rite. Please try again.');
    }
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
              placeholder="Describe the sacred trial and its fortitudes..."
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
            {houses.map((house) => (
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
        const participatingHouses = houses.filter(h => participatingHouseIds.includes(h.id));
        return (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>House</strong></TableCell>
                  {HUMOUR_ORDER.map(humour => {
                    const config = HUMOUR_CONFIG[humour];
                    return (
                      <TableCell key={humour} align="center">
                        <strong>{config.label} {config.emoji}</strong>
                      </TableCell>
                    );
                  })}
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
                      {HUMOUR_ORDER.map(humour => (
                        <TableCell key={humour} align="center">
                          <TextField
                            type="number"
                            value={score[humour]}
                            onChange={(e) => handleScoreChange(house.id, humour as Humours, Number(e.target.value))}
                            inputProps={{ step: 1 }}
                            size="small"
                            sx={{ width: 80 }}
                          />
                        </TableCell>
                      ))}
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
