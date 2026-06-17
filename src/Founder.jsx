import "./Founder.css";
import { Link } from "react-router-dom";
import founderImg from "./assets/varun-annaya.jpg";

function Founder() {
  return (
    <div className="founder-page">
      <div className="founder-card">

        <img
          className="founder-image"
          src={founderImg}
          alt="Founder"
        />

        <h1 className="founder-title">
          About The Founder
        </h1>

        <p className="founder-subtitle">
          Visionary Entrepreneur | Founder of Varun Agro Exports & Hospitality
        </p>

        <div className="founder-content">
          <p>
            <span className="highlight">
              Varun Agro Exports and Hospitality
            </span>{" "}
            was established in 2026 with a mission to bridge the gap between
            agriculture, exports, and hospitality services through innovation
            and technology.
          </p>

          <p>
            The founder, a resident of India, envisioned a platform where
            customers can access quality agricultural products and premium
            hospitality services in a fast, reliable, and convenient manner.
          </p>

          <p>
            The company focuses on promoting Indian agricultural excellence,
            supporting farmers, enhancing export opportunities, and delivering
            exceptional hospitality experiences.
          </p>
        </div>

        <div className="vision-box">
          <h2>Our Vision</h2>
          <p>
            To become a globally recognized brand that empowers farmers,
            businesses, travelers, and customers through sustainable growth,
            innovation, and trust.
          </p>
        </div>

        <div className="stats">
          <div className="stat-card">
            <h3>2026</h3>
            <p>Founded</p>
          </div>

          <div className="stat-card">
            <h3>2</h3>
            <p>Business Divisions</p>
          </div>

          <div className="stat-card">
            <h3>100%</h3>
            <p>Customer Focus</p>
          </div>
        </div>

        <Link to="/" className="back-btn">
          Back to Home
        </Link>

      </div>
    </div>
  );
}

export default Founder;