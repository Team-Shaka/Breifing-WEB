import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import BriefChat from "./pages/BriefChat";
import Storage from "./pages/Storage";
import Ready from "./pages/Ready";
import BriefList from "./pages/ManagePages/BriefList";
import About from "./pages/AboutPages/About";
import BriefingCardDetail from "./pages/AboutPages/BriefingCardDetail";
import ManageBriefDetail from "./pages/ManagePages/ManageBriefDetail";
import Home from "./pages/Home";
import { useEffect } from "react";
import SetDateAndTimeOfDay from "./utils/setDateAndTimeOfDay";

function App() {
    return (
        <div>
            <SetDateAndTimeOfDay />
            <Routes>
                {/* <Route path="/briefChat" element={<Ready />} />
                <Route path="/storage" element={<Storage />} /> */}
                <Route path="/managing" element={<BriefList />}></Route>
                <Route
                    path="/managing/briefing/:id"
                    element={<ManageBriefDetail />}
                />
                <Route path="/about" element={<About />} />
                <Route
                    path="/briefingCard/:id"
                    element={<BriefingCardDetail />}
                />
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
