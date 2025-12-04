import { Box, Typography, Paper, useTheme, Divider } from "@mui/material";
import { useState } from "react";
import { IScore, Humours } from "types/shared";
import { HUMOUR_CONFIG, HUMOUR_ORDER } from "config/humourConfig";
import { HumourSelect } from "components/shared/HumourSelect";
import { NumberWithFraction } from "components/shared/NumberWithFraction";
import { UnitToggle } from "components/shared/UnitToggle";
import { getStandardDeviation, convertValue } from "helpers/scoreHelpers";
import { UnitType } from "../../App";

interface BalanceVisualizerProps {
  baseScore: IScore;
  currentStrength: Humours;
  currentWeakness: Humours;
  unitType: UnitType;
  onUnitTypeChange: (unitType: UnitType) => void;
}

export const BalanceVisualizer: React.FC<BalanceVisualizerProps> = ({
  baseScore,
  currentStrength,
  currentWeakness,
  unitType,
  onUnitTypeChange
}) => {
  const theme = useTheme();
  const [previewStrength, setPreviewStrength] = useState<Humours>(currentStrength);
  const [previewWeakness, setPreviewWeakness] = useState<Humours>(currentWeakness);

  // Calculate modified scores with current strength/weakness
  const currentModifiedScore: IScore = { ...baseScore };
  currentModifiedScore[currentStrength] = baseScore[currentStrength] * 2;
  currentModifiedScore[currentWeakness] = baseScore[currentWeakness] / 2;

  // Calculate modified scores with preview strength/weakness
  const previewModifiedScore: IScore = { ...baseScore };
  previewModifiedScore[previewStrength] = baseScore[previewStrength] * 2;
  previewModifiedScore[previewWeakness] = baseScore[previewWeakness] / 2;

  // Calculate balance (standard deviation)
  const currentBalance = getStandardDeviation([
    currentModifiedScore.choleric,
    currentModifiedScore.phlegmatic,
    currentModifiedScore.melancholic,
    currentModifiedScore.sanguine
  ]);

  const previewBalance = getStandardDeviation([
    previewModifiedScore.choleric,
    previewModifiedScore.phlegmatic,
    previewModifiedScore.melancholic,
    previewModifiedScore.sanguine
  ]);

  const getBalanceColor = (balance: number) => {
    if (balance < 100) return "green";
    if (balance < 200) return "orange";
    return "red";
  };

  const isPreviewDifferent = previewStrength !== currentStrength || previewWeakness !== currentWeakness;

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
        The Sacred Scales of Equilibrium
      </Typography>
      <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block', mb: 2 }}>
        Behold how thy Divine Gifts and Holy Burdens doth shape the balance of humours most sacred
      </Typography>

      {/* Base Scores */}
      <Paper elevation={2} sx={{ p: 2, mb: 2, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>
            Thy Base Humours (Ere Multipliers)
          </Typography>
          <UnitToggle
            unitType={unitType}
            onUnitTypeChange={onUnitTypeChange}
            size="small"
          />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {HUMOUR_ORDER.map(humour => {
            const config = HUMOUR_CONFIG[humour];
            return (
              <Box key={humour} sx={{ flex: '1 1 45%', minWidth: '150px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                    {config.emoji} {config.label}:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                    <NumberWithFraction value={convertValue(baseScore[humour], unitType)} />
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Paper>

      {/* Current Modified Scores */}
      <Paper elevation={2} sx={{ p: 2, mb: 2, border: `2px solid ${theme.palette.primary.main}` }}>
        <Typography variant="subtitle2" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
          Thy Current Humours (As Blessed and Burdened)
        </Typography>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block', mb: 1, fontStyle: 'italic' }}>
          Divine Gift: {HUMOUR_CONFIG[currentStrength].label} (×2) | Holy Burden: {HUMOUR_CONFIG[currentWeakness].label} (÷2)
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {HUMOUR_ORDER.map(humour => {
            const config = HUMOUR_CONFIG[humour];
            const isStrength = humour === currentStrength;
            const isWeakness = humour === currentWeakness;
            return (
              <Box key={humour} sx={{ flex: '1 1 45%', minWidth: '150px' }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  bgcolor: isStrength ? 'rgba(76, 175, 80, 0.1)' : isWeakness ? 'rgba(244, 67, 54, 0.1)' : 'transparent',
                  p: 0.5,
                  borderRadius: 1
                }}>
                  <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                    {config.emoji} {config.label}:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '1.25rem', color: isStrength ? 'green' : isWeakness ? 'red' : 'inherit' }}>
                    <NumberWithFraction value={convertValue(currentModifiedScore[humour], unitType)} />
                    {isStrength && ' ↑'}
                    {isWeakness && ' ↓'}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            Sacred Balance (σ): <strong style={{ color: getBalanceColor(currentBalance) }}><NumberWithFraction value={convertValue(currentBalance, unitType)} /></strong>
          </Typography>
        </Box>
      </Paper>

            {/* Preview Modified Scores */}
      {isPreviewDifferent && previewStrength !== previewWeakness && (
        <Paper elevation={2} sx={{ p: 2, border: `2px dashed ${theme.palette.secondary.main}` }}>
          <Typography variant="subtitle2" gutterBottom sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>
            Thy Contemplated Humours
          </Typography>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block', mb: 1, fontStyle: 'italic' }}>
            Divine Gift: {HUMOUR_CONFIG[previewStrength].label} (×2) | Holy Burden: {HUMOUR_CONFIG[previewWeakness].label} (÷2)
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {HUMOUR_ORDER.map(humour => {
              const config = HUMOUR_CONFIG[humour];
              const isStrength = humour === previewStrength;
              const isWeakness = humour === previewWeakness;
              const valueChanged = previewModifiedScore[humour] !== currentModifiedScore[humour];
              return (
                <Box key={humour} sx={{ flex: '1 1 45%', minWidth: '150px' }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    bgcolor: isStrength ? 'rgba(76, 175, 80, 0.1)' : isWeakness ? 'rgba(244, 67, 54, 0.1)' : 'transparent',
                    p: 0.5,
                    borderRadius: 1,
                    border: valueChanged ? `1px solid ${theme.palette.secondary.main}` : 'none'
                  }}>
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                      {config.emoji} {config.label}:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '1.25rem', color: isStrength ? 'green' : isWeakness ? 'red' : 'inherit' }}>
                      <NumberWithFraction value={convertValue(previewModifiedScore[humour], unitType)} />
                      {isStrength && ' ↑'}
                      {isWeakness && ' ↓'}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              Contemplated Balance (σ): <strong style={{ color: getBalanceColor(previewBalance) }}><NumberWithFraction value={convertValue(previewBalance, unitType)} /></strong>
            </Typography>
            <Typography variant="caption" sx={{ 
              color: previewBalance < currentBalance ? 'green' : previewBalance > currentBalance ? 'red' : theme.palette.text.secondary,
              display: 'block',
              mt: 0.5
            }}>
              {previewBalance < currentBalance && '✓ A more harmonious balance! (Lower doth bless thee)'}
              {previewBalance > currentBalance && '⚠️ A lesser balance (Higher doth curse thee)'}
              {previewBalance === currentBalance && '= The balance remaineth unchanged'}
            </Typography>
          </Box>
        </Paper>
      )}

      {/* Preview Selector */}
      <Paper elevation={2} sx={{ p: 2, mb: 2, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}>
        <Typography variant="subtitle2" gutterBottom sx={{ color: theme.palette.text.primary }}>
          Contemplate Alternate Blessings
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <HumourSelect
              label="Contemplate Divine Gift"
              name="previewStrength"
              value={previewStrength}
              onChange={(e) => setPreviewStrength(e.target.value as Humours)}
              required
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <HumourSelect
              label="Contemplate Holy Burden"
              name="previewWeakness"
              value={previewWeakness}
              onChange={(e) => setPreviewWeakness(e.target.value as Humours)}
              required
            />
          </Box>
        </Box>

        {previewStrength === previewWeakness && (
          <Typography variant="caption" sx={{ color: 'error.main', display: 'block', mt: 1 }}>
            ⚠️ Thy Divine Gift and Holy Burden cannot dwell in the same humour—such is forbidden!
          </Typography>
        )}
      </Paper>
    </Box>
  );
};
