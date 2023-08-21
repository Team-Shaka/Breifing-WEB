import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import BreifChat from "./pages/BreifChat";
import Storage from "./pages/Storage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/breifChat" element={<BreifChat />} />
        <Route path="/storage" element={<Storage />} />
      </Routes>
    </div>
  );
}

export default App;
