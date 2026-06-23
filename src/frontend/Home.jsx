import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  // #region agent log
  fetch("http://127.0.0.1:7482/ingest/f7d09ab7-b4ee-4723-aaac-cc302df10b38", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "d35c8a" },
    body: JSON.stringify({
      sessionId: "d35c8a",
      runId: "pages-fix",
      hypothesisId: "HOME",
      location: "src/frontend/Home.jsx",
      message: "home page rendered with sections",
      data: { sections: ["agro", "hospitality"] },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  return (
    <div className="home">
      <h1 className="title">Varun Agro Exports and Hospitality</h1>

      <div className="sections">
        <div className="agro">
          <h2>🌾 Agro Exports</h2>
          <p>Premium agricultural products for global markets</p>
          <Link to="/agro">
            <button type="button">Explore Agro</button>
          </Link>
        </div>

        <div className="hospitality">
          <h2>🏨 Hospitality</h2>
          <p>Luxury stays and resort experiences</p>
          <Link to="/hospitality">
            <button type="button">Explore Hospitality</button>
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
