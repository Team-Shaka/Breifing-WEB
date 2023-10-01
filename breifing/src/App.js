import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import BriefChat from "./pages/BriefChat";
import Storage from "./pages/Storage";
import Ready from "./pages/Ready";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/briefChat" element={<Ready />} />
        <Route path="/storage" element={<Storage />} />
      </Routes>
    </div>
  );
}

export default App;
