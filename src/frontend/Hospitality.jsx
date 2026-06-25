import "./Hospitality.css";
import { Link } from "react-router-dom";

function Hospitality() {
  const hotels = [
    {
      name: "Luxury Grand Hotel",
      location: "Hyderabad",
      rating: "⭐ 4.8",
      image: "https://via.placeholder.com/300"
    },
    {
      name: "Beach Resort",
      location: "Goa",
      rating: "⭐ 4.6",
      image: "https://via.placeholder.com/300"
    },
    {
      name: "Mountain View Resort",
      location: "Ooty",
      rating: "⭐ 4.7",
      image: "https://via.placeholder.com/300"
    }
  ];

  return (
    <div className="hospitality-page">
      <h1>🏨 Hospitality Services</h1>

      <div className="search-box">
        <input type="text" placeholder="Where are you going?" />
        <button>Search</button>
      </div>

      <div className="hotel-list">
        {hotels.map((hotel, index) => (
          <div className="hotel-card" key={index}>
            <img src={hotel.image} alt={hotel.name} />

            <div className="hotel-info">
              <h2>{hotel.name}</h2>
              <p>📍 {hotel.location}</p>
              <p>{hotel.rating}</p>

              <Link to="/booking">
                <button>Book Now</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Link to="/" className="hotel-back">← Back to Home</Link>
    </div>
  );
}

export default Hospitality;