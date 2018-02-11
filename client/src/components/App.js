import React from 'react';
import Converter from "../containers/Converter.js";
import Stats from "../containers/Stats.js";

const App = () => (
  <div className="container">
    <h1><span style={{fontWeight: "100"}}>Currency</span>Converter</h1>
    <Converter />
    <Stats />
  </div>
);

export default App;