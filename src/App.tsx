import { Footer } from "components/footer";
import { Scoreboard } from "components/scoreboard";
import { useState } from "react";

function App() {
  const [adminMode, setAdminMode] = useState(false);

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
      <Scoreboard {...{ adminMode }} />
      <Footer {...{ adminMode, setAdminMode }} />
    </div>
  );
}

export default App;
