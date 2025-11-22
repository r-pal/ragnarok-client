import { Footer } from "components/footer";
import { Scoreboard } from "components/scoreboard";
import { useState } from "react";
import { SortBy } from "components/header";

export type UnitType = "fluidOunces" | "pints";

function App() {
  const [adminMode, setAdminMode] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>("balance");
  const [unitType, setUnitType] = useState<UnitType>("fluidOunces");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden"
      }}
    >
        <div style={{ flex: 1, overflow: "hidden", paddingBottom: "80px" }}>
        <Scoreboard adminMode={adminMode} sortBy={sortBy} unitType={unitType} />
      </div>
      <Footer 
        adminMode={adminMode} 
        setAdminMode={setAdminMode}
        sortBy={sortBy}
        onSortChange={setSortBy}
        unitType={unitType}
        onUnitTypeChange={setUnitType}
      />
    </div>
  );
}

export default App;
