import { Footer } from "components/footer";
import { Scoreboard } from "components/scoreboard";
import { useState } from "react";
import { SortBy } from "components/header";

function App() {
  const [adminMode, setAdminMode] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>("balance");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden"
      }}
    >
      <header>Ragnarök</header>
      <div style={{ flex: 1, overflow: "hidden", paddingBottom: "80px" }}>
        <Scoreboard adminMode={adminMode} sortBy={sortBy} />
      </div>
      <Footer 
        adminMode={adminMode} 
        setAdminMode={setAdminMode}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
    </div>
  );
}

export default App;
