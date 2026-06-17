import "./Agro.css";

function Agro() {
  const products = [
    {
      name: "Premium Basmati Rice",
      price: "₹1,200 / Bag",
      image: "https://via.placeholder.com/250"
    },
    {
      name: "Organic Turmeric",
      price: "₹500 / Kg",
      image: "https://via.placeholder.com/250"
    },
    {
      name: "Coffee Beans",
      price: "₹800 / Kg",
      image: "https://via.placeholder.com/250"
    },
    {
      name: "Red Chilli",
      price: "₹450 / Kg",
      image: "https://via.placeholder.com/250"
    }
  ];

  return (
    <div className="agro-page">
      <h1>🌾 Varun Agro Exports</h1>

      <input
        type="text"
        placeholder="Search Products..."
        className="search"
      />

      <div className="product-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Agro;