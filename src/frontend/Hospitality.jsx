import "./Hospitality.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Hospitality() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const hotels = [
    {
      name: "Jubilee Hills guest house",
      location: "Hyderabad",
      price: "₹ 12,000 per night",
      rating: "⭐ 4.8",
      mapUrl: "https://www.google.com/maps/place/The+Promised+Land/@17.424428,78.4073434,18.99z/data=!4m6!3m5!1s0x3bcb918490d330fb:0x1cce8eb4a61ca7c0!8m2!3d17.4245903!4d78.4071391!16s%2Fg%2F11pgt4zgwh?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D",
      images: [
        "/hotel-1.1.jpg",
        "/hotel-1.2.jpg",
        "/hotel-1.3.jpg"
      ]
    },
    {
      name: "Moinabad farm house",
      location: "Hyderabad",
      price: "₹ 10,000 per night",
      rating: "⭐ 4.6",
      mapUrl: "https://www.google.com/maps/place/Green+Meadows+Farm+House/@17.3588358,78.2374374,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcbebda08945e11:0x50d72ea9c2d3c90e!8m2!3d17.3588358!4d78.2400123!16s%2Fg%2F11h0ty_49q?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D",
      images: [
        "/hotel-2.1.jpg",
        "/hotel-2.2.jpg",
        "/hotel-2.3.jpg"
      ]
    },
    {
      name: "Mountain View Resort",
      location: "Ooty",
      price: "₹ 15,000 per night",
      rating: "⭐ 4.7",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Mountain+View+Resort+Ooty",
      images: [
        "/hotel-3.1.jpg",
        "/hotel-3.2.jpg",
        "/hotel-3.3.jpg"
      ]
    }
  ];

  const filteredHotels = hotels.filter((hotel) =>
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const applySearch = () => {
    setSearchTerm(searchInput.trim());
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    applySearch();
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applySearch();
    }
  };

  return (
    <div className="hospitality-page">
      <h1>🏨 Hospitality Services</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Where are you going?"
          value={searchInput}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
        />
        <button type="button" onClick={handleSearchClick}>Search</button>
      </div>

      <div className="hotel-list">
        {filteredHotels.length === 0 && searchTerm ? (
          <p className="search-no-results">
            No hotels found for &quot;{searchTerm}&quot;. Try Hyderabad or Ooty.
          </p>
        ) : null}
        {filteredHotels.map((hotel, index) => (
          <div className="hotel-card" key={index}>
            <div className="hotel-slider">
              {hotel.images.map((image, imageIndex) => (
                <img
                  src={image}
                  alt={`${hotel.name} ${imageIndex + 1}`}
                  key={imageIndex}
                />
              ))}
            </div>

            <div className="hotel-info">
            <h2>{hotel.name}</h2>
            <p>📍 {hotel.location}</p>
            <p className="hotel-price">{hotel.price}</p>
            <p>{hotel.rating}</p>

              <div className="hotel-actions">
                <a href={hotel.mapUrl} target="_blank" rel="noreferrer">
                  <button type="button">View Location</button>
                </a>

                <Link to="/booking" state={{ hotel }}>
                  <button type="button">Book Now</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link to="/" className="hotel-back">← Back to Home</Link>
    </div>
  );
}

export default Hospitality;