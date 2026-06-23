import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Agro from "./Agro";
import Hospitality from "./Hospitality";
import Booking from "./Booking";
import Founder from "./Founder";
import ConfirmBooking from "./ConfirmBooking";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/agro" element={<Agro />} />

        <Route path="/hospitality" element={<Hospitality />} />

        <Route path="/booking" element={<Booking />} />

        <Route path="/founder" element={<Founder />} />

        <Route
          path="/booking-confirmed"
          element={<ConfirmBooking />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;