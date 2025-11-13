import { IScore, Humours } from "types/shared";
import { IHouse } from "types/house";
import { HUMOUR_ORDER, HUMOUR_CONFIG, HumourProperty } from "config/humourConfig";

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
 * Format a number with locale string and dynamic font size
 */
export const formatScoreDisplay = (value: number): { 
  display: string; 
  fontSize: string;
} => {
  const display = value.toLocaleString();
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
