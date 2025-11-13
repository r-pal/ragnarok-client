interface HighlightedMetricProps {
  label: string;
  value: string | number;
  isHighlighted: boolean;
}

export const HighlightedMetric: React.FC<HighlightedMetricProps> = ({ 
  label, 
  value, 
  isHighlighted 
}) => {
  return (
    <div
      style={{
        backgroundColor: isHighlighted ? "rgba(93, 64, 55, 0.3)" : "transparent",
        padding: isHighlighted ? "4px 8px" : "0",
        borderRadius: "4px",
        fontWeight: isHighlighted ? "bold" : "normal"
      }}
    >
      <strong>{label}:</strong> {value}
    </div>
  );
};
