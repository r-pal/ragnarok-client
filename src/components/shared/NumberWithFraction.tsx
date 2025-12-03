import React from "react";

interface NumberWithFractionProps {
  value: number;
  style?: React.CSSProperties;
}

/**
 * Component to display numbers with fractions in smaller font
 * e.g., 1273.5 displays as "1,273" with "1/2" in smaller font
 */
export const NumberWithFraction: React.FC<NumberWithFractionProps> = ({ value, style }) => {
  const integerPart = Math.floor(value);
  const decimalPart = value - integerPart;
  
  // Helper to convert decimal to fraction
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
  
  if (decimalPart < 0.001) {
    // No significant decimal part
    return <span style={style}>{integerPart.toLocaleString()}</span>;
  }
  
  const fraction = decimalToFraction(decimalPart);
  
  return (
    <span style={style}>
      {integerPart.toLocaleString()}{' '}
      <span style={{ fontSize: '0.5em', verticalAlign: 'baseline' }}>
        {fraction}
      </span>
    </span>
  );
};
