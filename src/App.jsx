import { useState } from "react";
import { Map } from "./components/map";
import { Info } from "./components/Info";
import "./app.css";

function App() {

  const [regionCurrent, setRegeionCurrent] = useState("lisbon");
  //const [regionCurrent, setRegeionCurrent] = useState("lisboa");

  return (
    <div className="container">
      <div className="content">
        <Map setRegeionCurrent={setRegeionCurrent}></Map>
        <Info regionCurrent={regionCurrent}></Info>
      </div>
    </div>
  );
}

export default App;
