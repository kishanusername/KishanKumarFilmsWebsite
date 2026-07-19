import { Routes, Route } from "react-router-dom";

import Home from "./page/Home";
import Enquiry from "./page/Enquiry";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/enquiry" element={<Enquiry />} />

    </Routes>
  );
}

export default App;