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
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
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

interface RiteType {
  name: string;
  day: string;
  humour: Humours | 'per_item' | 'balanced';
  category?: string;
}

const RITE_TYPES: RiteType[] = [
  { name: 'Ranarama', day: 'Thu', humour: 'phlegmatic' },
  { name: 'Ranarama X', day: 'Thu', humour: 'sanguine' },
  { name: 'Dancing Plague', day: 'Thu', humour: 'choleric' },
  { name: 'Measure Me This', day: 'Thu', humour: 'phlegmatic' },
  { name: 'Antiques Roadshow', day: 'Fri', humour: 'per_item', category: 'per antique' },
  { name: 'Beauty Pageant', day: 'Fri', humour: 'per_item', category: 'per beauty' },
  { name: 'Phrasewave', day: 'Fri', humour: 'per_item', category: 'Fungasm Gameshow - per phrase' },
  { name: 'Cuntdown', day: 'Fri', humour: 'choleric', category: 'Fungasm Gameshow' },
  { name: 'Arranged marriage courtship', day: 'Fri', humour: 'sanguine', category: 'Fungasm Gameshow' },
  { name: 'Onion Dome', day: 'Fri', humour: 'melancholic' },
  { name: 'Plague', day: 'Sat', humour: 'melancholic' },
  { name: 'Custom Rite', day: '', humour: 'balanced' }
];

const MAX_FLUID_OUNCES = 16;

const steps = ["The Sacred Rite", "Houses Partaking", "Bestow Humours"];

export const NewGame: React.FC = () => {
  const { houses, createGame } = useData();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedRiteType, setSelectedRiteType] = useState<string>("");
  const [gameName, setGameName] = useState("");
  const [description, setDescription] = useState("");
  const [participatingHouseIds, setParticipatingHouseIds] = useState<number[]>([]);
  const [houseScores, setHouseScores] = useState<Map<number, IGameScores>>(new Map());
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

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

  const handleRiteTypeChange = (riteTypeName: string) => {
    setSelectedRiteType(riteTypeName);
    const rite = RITE_TYPES.find(r => r.name === riteTypeName);
    if (rite && rite.name !== 'Custom Rite') {
      setGameName(rite.name);
    } else {
      setGameName("");
    }
  };

  const handleScoreChange = (houseId: number, humour: keyof IGameScores["score"], value: number) => {
    const newScores = new Map(houseScores);
    const houseScore = newScores.get(houseId);
    if (houseScore) {
      houseScore.score[humour] = Math.max(0, Math.min(MAX_FLUID_OUNCES, value));
      newScores.set(houseId, houseScore);
      setHouseScores(newScores);
    }
  };

  const validateScores = (): boolean => {
    const errors: string[] = [];
    const selectedRite = RITE_TYPES.find(r => r.name === selectedRiteType);
    
    if (!selectedRite) return true;

    // Calculate totals for each humour across all houses
    const totals = {
      choleric: 0,
      phlegmatic: 0,
      melancholic: 0,
      sanguine: 0
    };

    houseScores.forEach(houseScore => {
      totals.choleric += houseScore.score.choleric;
      totals.phlegmatic += houseScore.score.phlegmatic;
      totals.melancholic += houseScore.score.melancholic;
      totals.sanguine += houseScore.score.sanguine;
    });

    // Calculate grand total
    const grandTotal = totals.choleric + totals.phlegmatic + totals.melancholic + totals.sanguine;

    // Check if total exceeds 16 fl oz
    if (grandTotal > MAX_FLUID_OUNCES) {
      errors.push(`Total humours (${grandTotal} fl oz) exceeds the sacred limit of ${MAX_FLUID_OUNCES} fl oz. Over by ${grandTotal - MAX_FLUID_OUNCES} fl oz.`);
    }

    // For rites with a specific humour, check that only that humour has points
    if (selectedRite.humour !== 'per_item' && selectedRite.humour !== 'balanced') {
      const primaryHumour = selectedRite.humour as Humours;
      
      // Check that other humours are zero
      Object.entries(totals).forEach(([humour, total]) => {
        if (humour !== primaryHumour && total > 0) {
          errors.push(`This rite only praises ${HUMOUR_CONFIG[primaryHumour].label}. ${HUMOUR_CONFIG[humour as Humours].label} must be 0.`);
        }
      });

      // Check that primary humour doesn't exceed 16
      if (totals[primaryHumour] > MAX_FLUID_OUNCES) {
        errors.push(`${HUMOUR_CONFIG[primaryHumour].label} total (${totals[primaryHumour]} fl oz) exceeds the limit of ${MAX_FLUID_OUNCES} fl oz`);
      }
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async () => {
    if (!validateScores()) {
      return;
    }

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
      setSelectedRiteType("");
      setGameName("");
      setDescription("");
      setParticipatingHouseIds([]);
      setHouseScores(new Map());
      setValidationErrors([]);
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
        const selectedRite = RITE_TYPES.find(r => r.name === selectedRiteType);
        return (
          <Stack spacing={3}>
            <FormControl fullWidth required>
              <InputLabel>Select Rite Type</InputLabel>
              <Select
                value={selectedRiteType}
                onChange={(e) => handleRiteTypeChange(e.target.value)}
                label="Select Rite Type"
              >
                {RITE_TYPES.map((rite) => (
                  <MenuItem key={rite.name} value={rite.name}>
                    {rite.name} {rite.day && `(${rite.day})`}
                    {rite.category && ` - ${rite.category}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedRite && selectedRite.humour !== 'balanced' && selectedRite.humour !== 'per_item' && (
              <Alert severity="info">
                This sacred rite doth praise <strong>{HUMOUR_CONFIG[selectedRite.humour as Humours].label}</strong> alone. 
                Thou mayest only bestow points unto this humour. Maximum <strong>{MAX_FLUID_OUNCES} fluid ounces</strong>.
              </Alert>
            )}

            {selectedRite && (selectedRite.humour === 'balanced' || selectedRite.humour === 'per_item') && (
              <Alert severity="info">
                This rite doth distribute humours as befits the occasion. 
                Maximum <strong>{MAX_FLUID_OUNCES} fluid ounces</strong> in total across all humours.
              </Alert>
            )}

            <TextField
              fullWidth
              label="Name of Rite"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              required
              disabled={selectedRiteType !== 'Custom Rite' && selectedRiteType !== ''}
              placeholder="e.g., The Leeching Trials, The Contest of Bloodletting"
            />
            <TextField
              fullWidth
              label="Description of Rite (If it pleaseth thee)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              placeholder="Inscribe herein the nature of this sacred trial..."
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
        const currentRite = RITE_TYPES.find(r => r.name === selectedRiteType);
        
        // Calculate totals for display
        const totals = {
          choleric: 0,
          phlegmatic: 0,
          melancholic: 0,
          sanguine: 0
        };
        houseScores.forEach(houseScore => {
          totals.choleric += houseScore.score.choleric;
          totals.phlegmatic += houseScore.score.phlegmatic;
          totals.melancholic += houseScore.score.melancholic;
          totals.sanguine += houseScore.score.sanguine;
        });

        return (
          <Stack spacing={2}>
            <Alert severity="warning">
              <strong>Hark!</strong> Inscribe points in <strong>fluid ounces (fl oz)</strong>. 
              Maximum <strong>{MAX_FLUID_OUNCES} fl oz</strong> in total across all houses.
              {currentRite && currentRite.humour !== 'per_item' && currentRite.humour !== 'balanced' && (
                <> Only <strong>{HUMOUR_CONFIG[currentRite.humour as Humours].label}</strong> may receiveth points for this rite.</>
              )}
            </Alert>

            {validationErrors.length > 0 && (
              <Alert severity="error">
                {validationErrors.map((error, idx) => (
                  <div key={idx}>{error}</div>
                ))}
              </Alert>
            )}

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>House</strong></TableCell>
                    {HUMOUR_ORDER.map(humour => {
                      const config = HUMOUR_CONFIG[humour];
                      const isPrimary = currentRite?.humour === humour;
                      const isDisabled = currentRite && currentRite.humour !== 'per_item' && currentRite.humour !== 'balanced' && currentRite.humour !== humour;
                      return (
                        <TableCell key={humour} align="center" sx={isPrimary ? { bgcolor: 'action.selected' } : isDisabled ? { bgcolor: 'action.disabledBackground', opacity: 0.5 } : {}}>
                          <strong>{config.label} {config.emoji}</strong>
                          {isPrimary && <div style={{ fontSize: '0.7rem' }}>(Only)</div>}
                          {isDisabled && <div style={{ fontSize: '0.7rem' }}>(Locked)</div>}
                          <div style={{ fontSize: '0.7rem', color: 'text.secondary' }}>fl oz</div>
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
                        {HUMOUR_ORDER.map(humour => {
                          const isDisabled = currentRite && currentRite.humour !== 'per_item' && currentRite.humour !== 'balanced' && currentRite.humour !== humour;
                          return (
                            <TableCell key={humour} align="center">
                              <TextField
                                type="number"
                                value={score[humour]}
                                onChange={(e) => handleScoreChange(house.id, humour as Humours, Number(e.target.value))}
                                disabled={isDisabled}
                                inputProps={{ 
                                  step: 1,
                                  min: 0,
                                  max: MAX_FLUID_OUNCES
                                }}
                                size="small"
                                sx={{ width: 80 }}
                                helperText={score[humour] > MAX_FLUID_OUNCES ? 'Max!' : ''}
                                error={score[humour] > MAX_FLUID_OUNCES}
                              />
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                  <TableRow sx={{ bgcolor: 'action.hover' }}>
                    <TableCell><strong>Total (fl oz)</strong></TableCell>
                    {HUMOUR_ORDER.map(humour => {
                      const total = totals[humour];
                      const isPrimary = currentRite?.humour === humour;
                      const shouldBeZero = currentRite && currentRite.humour !== 'per_item' && currentRite.humour !== 'balanced' && currentRite.humour !== humour;
                      const hasError = shouldBeZero ? total > 0 : false;
                      return (
                        <TableCell 
                          key={humour} 
                          align="center"
                          sx={{ 
                            color: hasError ? 'error.main' : (isPrimary ? 'primary.main' : 'inherit'),
                            fontWeight: 'bold'
                          }}
                        >
                          {total}
                          {hasError && ' ⚠️'}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  <TableRow sx={{ bgcolor: 'warning.light' }}>
                    <TableCell colSpan={5} align="right">
                      <strong>Grand Total: {totals.choleric + totals.phlegmatic + totals.melancholic + totals.sanguine} / {MAX_FLUID_OUNCES} fl oz</strong>
                      {(totals.choleric + totals.phlegmatic + totals.melancholic + totals.sanguine) <= MAX_FLUID_OUNCES && ' ✓'}
                      {(totals.choleric + totals.phlegmatic + totals.melancholic + totals.sanguine) > MAX_FLUID_OUNCES && ' ⚠️ EXCEEDS LIMIT'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Inscribe a New Sacred Rite
      </Typography>

      <Typography variant="body2" color="text.secondary" paragraph>
        Chronicle the trials most sacred, and bestow humours upon the houses worthy of such blessings
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
