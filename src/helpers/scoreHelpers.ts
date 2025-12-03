import { IScore, Humours } from "types/shared";
import { IHouse } from "types/house";
import { HUMOUR_ORDER, HUMOUR_CONFIG, HumourProperty } from "config/humourConfig";
import { UnitType } from "../App";

/**
 * Apply strength (×2) and weakness (÷2) multipliers to a house's score
 */
export const applyMultipliers = (house: IHouse): IScore => {
  if (!house.score) return { choleric: 0, phlegmatic: 0, melancholic: 0, sanguine: 0 };
  
  const modifiedScore = { ...house.score };
  
  // Apply strength multiplier (×2)
  if (house.strength) {
    modifiedScore[house.strength] = house.score[house.strength] * 2;
  }
  
  // Apply weakness multiplier (÷2)
  if (house.weakness) {
    modifiedScore[house.weakness] = house.score[house.weakness] / 2;
  }
  
  return modifiedScore;
};

/**
 * Aggregate scores from multiple houses
 */
export const aggregateScores = (houses: IHouse[]): IScore => {
  return houses.reduce((acc, house) => {
    const modifiedScore = applyMultipliers(house);
    HUMOUR_ORDER.forEach(humour => {
      acc[humour] += modifiedScore[humour];
    });
    return acc;
  }, { choleric: 0, phlegmatic: 0, melancholic: 0, sanguine: 0 } as IScore);
};

/**
 * Calculate total points from a score
 */
export const calculateTotal = (score: IScore): number => {
  return HUMOUR_ORDER.reduce((sum, humour) => sum + score[humour], 0);
};

/**
 * Convert a value from fluid ounces to the specified unit type
 * 1 pint = 16 fluid ounces
 */
export const convertValue = (value: number, unitType: UnitType): number => {
  return unitType === "pints" ? value / 16 : value;
};

/**
 * Format a number with locale string and dynamic font size
 * Converts from fluid ounces to pints if unitType is "pints" (1 pint = 16 fl oz)
 * Uses fractions instead of decimals
 */
export const formatScoreDisplay = (value: number, unitType: UnitType): { 
  display: string; 
  fontSize: string;
} => {
  const convertedValue = convertValue(value, unitType);
  const display = formatNumberWithFraction(convertedValue);
  const fontSize = display.length > 4 ? "0.75rem" : "1rem";
  return { display, fontSize };
};

/**
 * Calculate standard deviation of an array of numbers
 */
export const getStandardDeviation = (array: number[]): number => {
  const n = array.length;
  const mean = array.reduce((a, b) => a + b) / n;
  return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
};

/**
 * Get all humours that have a specific property
 */
export const getHumoursWithProperty = (property: HumourProperty): Humours[] => {
  return HUMOUR_ORDER.filter(humour => 
    HUMOUR_CONFIG[humour].properties.includes(property)
  );
};

/**
 * Calculate property score (hot, cold, moist, dry) by summing relevant humours
 */
export const calculatePropertyScore = (score: IScore, property: HumourProperty): number => {
  const humours = getHumoursWithProperty(property);
  return humours.reduce((sum: number, humour: Humours) => sum + score[humour], 0);
};

/**
 * Convert decimal to fraction string
 * e.g., 0.5 -> "1/2", 0.25 -> "1/4", 0.75 -> "3/4"
 */
const decimalToFraction = (decimal: number): string => {
  const tolerance = 1.0e-6;
  let numerator = 1;
  let denominator = 1;
  let error = Math.abs(decimal - numerator / denominator);
  
  if (error < tolerance) return `${numerator}/${denominator}`;
  
  for (let d = 2; d <= 16; d++) {
    const n = Math.round(decimal * d);
    const currentError = Math.abs(decimal - n / d);
    if (currentError < error) {
      numerator = n;
      denominator = d;
      error = currentError;
      if (error < tolerance) break;
    }
  }
  
  // Simplify fraction
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(numerator, denominator);
  return `${numerator / divisor}/${denominator / divisor}`;
};

/**
 * Format a number with fractions instead of decimals
 * Returns JSX-ready string with HTML for smaller fraction
 * e.g., 1273.5 -> "1,273 <small>1/2</small>"
 */
export const formatNumberWithFraction = (value: number): string => {
  const integerPart = Math.floor(value);
  const decimalPart = value - integerPart;
  
  if (decimalPart < 0.001) {
    // No significant decimal part
    return integerPart.toLocaleString();
  }
  
  const fraction = decimalToFraction(decimalPart);
  return `${integerPart.toLocaleString()} ${fraction}`;
};
