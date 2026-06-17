import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Agro from "./agro";
import Hospitality from "./Hospitality";
import Founder from "./Founder";
import Booking from "./Booking";

function Home() {
  return (
    <>
      <div className="home">
        <h1 className="title">Varun Agro Exports and Hospitality</h1>

        <div className="sections">
          <div className="agro">
            <h2>🌾 Agro Exports</h2>
            <p>Export agricultural products worldwide.</p>

            <Link to="/agro">
              <button>Explore Agro</button>
            </Link>
          </div>

          <div className="hospitality">
            <h2>🏨 Hospitality</h2>
            <p>Hotels, Resorts, Restaurants & Travel.</p>

            <Link to="/hospitality">
              <button>Explore Hospitality</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="founder-link">
        <Link to="/founder">About Founder</Link>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agro" element={<Agro />} />
        <Route path="/hospitality" element={<Hospitality />} />
        <Route path="/founder" element={<Founder />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;