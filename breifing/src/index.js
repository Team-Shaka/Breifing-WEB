import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

const rootElement = document.getElementById("root");

const app = (
    <React.StrictMode>
        <RecoilRoot>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </RecoilRoot>
    </React.StrictMode>
);

if (rootElement?.hasChildNodes()) {
    ReactDOM.hydrateRoot(rootElement, app);
} else {
    const root = ReactDOM.createRoot(rootElement);
    root.render(app);
}

reportWebVitals();
