import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Agro from "./Agro";
import Hospitality from "./Hospitality";
import Booking from "./Booking";
import Founder from "./Founder";
import ConfirmBooking from "./ConfirmBooking";
import View from "./View";
import OrderPlaced from "./OrderPlaced";
import Explore from "./Explore";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/agro" element={<Agro />} />

        <Route path="/agro/:id" element={<View />} />

        <Route path="/view/:id" element={<View />} />

        <Route path="/order-placed" element={<OrderPlaced />} />

        <Route path="/hospitality" element={<Hospitality />} />

        <Route path="/booking" element={<Booking />} />

        <Route path="/founder" element={<Founder />} />

        <Route path="/confirmbooking" element={<ConfirmBooking />} />

        <Route path="/explore" element={<Explore />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;