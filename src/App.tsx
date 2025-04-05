import "./App.css";
import { Route, Routes } from "react-router";
import HomePage from "./components/HomePage";
import VendorMagement from "./components/VendorMagement";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<VendorMagement />} />
    </Routes>
  );
}

export default App;
