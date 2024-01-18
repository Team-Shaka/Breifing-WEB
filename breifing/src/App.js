import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import BriefChat from "./pages/BriefChat";
import Storage from "./pages/Storage";
import Ready from "./pages/Ready";
import BriefList from "./pages/ManagePages/BriefList";
import Home from "./pages/HomePages/Home";
import BriefingCardDetail from "./pages/HomePages/BriefingCardDetail";
import ManageBriefDetail from "./pages/ManagePages/ManageBriefDetail";

function App() {
    return (
        <div>
            <Routes>
                {/* <Route path="/briefChat" element={<Ready />} />
                <Route path="/storage" element={<Storage />} /> */}
                <Route path="/managing" element={<BriefList />}></Route>
                <Route
                    path="/managing/briefing/:id"
                    element={<ManageBriefDetail />}
                />
                <Route path="/" element={<Home />} />
                <Route path="/briefingCard/:id" element={<BriefingCardDetail />} />
            </Routes>
        </div>
    );
}

export default App;
