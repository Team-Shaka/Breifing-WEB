import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import BriefChat from "./pages/BriefChat";
import Storage from "./pages/Storage";
import Ready from "./pages/Ready";
import BriefDetail from "./pages/BriefDetail";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/briefChat" element={<Ready />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/managing/briefing/:id" element={<BriefDetail />} />
      </Routes>
    </div>
  );
}

export default App;
