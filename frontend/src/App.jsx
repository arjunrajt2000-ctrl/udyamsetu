import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import Schemes from "./pages/Schemes";
import SchemeDetails from "./pages/SchemeDetails";
import ChannelPartners from "./pages/ChannelPartners";
import LoanCalculator from "./pages/LoanCalculator";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* ABOUT */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* ASSESSMENT */}
        <Route
          path="/assessment"
          element={<Assessment />}
        />

        {/* SCHEME RESULTS */}
        <Route
          path="/schemes"
          element={<Schemes />}
        />

        {/* SCHEME DETAILS */}
        <Route
          path="/scheme-details"
          element={<SchemeDetails />}
        />

        {/* CHANNEL PARTNER FINDER */}
        <Route
          path="/channel-partners"
          element={<ChannelPartners />}
        />

        {/* LOAN EMI CALCULATOR */}
        <Route
          path="/loan-calculator"
          element={<LoanCalculator />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;