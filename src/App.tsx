import { Footer } from "components/footer";
import { Scoreboard } from "components/scoreboard";
import { useState } from "react";

function App() {
  const [adminMode, setAdminMode] = useState(false);

  return (
    <>
      <header>Ragnarök</header>
      <Scoreboard {...{ adminMode }} />
      <Footer {...{ adminMode, setAdminMode }} />
    </>
  );
}

export default App;
