import { useNavigate, Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h1>Varun Agro Exports and Hospitality</h1>
      </div>

      <div className="founder-link">
        <Link to="/founder">About Founder</Link>
      </div>
    </>
  );
}

export default Home;