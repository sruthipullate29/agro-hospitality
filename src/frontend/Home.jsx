import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
return (
  <div className="home">
    <div className="hero">
      <h1 className="title">Varun Agro Exports & Hospitality</h1>
      <p className="subtitle">
        Delivering Excellence in Agriculture and Luxury Hospitality
      </p>
    </div>

    <div className="sections">
      <div className="agro card">
        <h2>🌾 Agro Exports</h2>
        <p>
          Premium agricultural products sourced with quality and sustainability
          for global markets.
        </p>
        <Link to="/agro">
          <button>Explore Agro</button>
        </Link>
      </div>

      <div className="hospitality card">
        <h2>🏨 Hospitality</h2>
        <p>
          Luxury stays, memorable experiences, and exceptional hospitality
          services.
        </p>
        <Link to="/hospitality">
          <button>Explore Hospitality</button>
        </Link>
      </div>
    </div>

    <div className="founder-link">
      <Link to="/founder">About Founder</Link>
    </div>
  </div>
);
}

export default Home;
