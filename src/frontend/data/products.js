export const products = [
  {
    id: "basmati-rice",
    name: "Premium Basmati Rice",
    price: "₹1,200 / Bag",
    stockKg: 1000,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    description:
      "Aged long-grain basmati rice with rich aroma, ideal for export and premium retail markets.",
    origin: "India",
    stock: "In Stock",
  },
  {
    id: "organic-turmeric",
    name: "Organic Turmeric",
    price: "₹500 / Kg",
    stockKg: 1000,
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=300&fit=crop",
    description:
      "High-curcumin organic turmeric powder sourced directly from certified farms.",
    origin: "Telangana, India",
    stock: "In Stock",
  },
  {
    id: "coffee-beans",
    name: "Coffee Beans",
    price: "₹800 / Kg",
    stockKg: 1000,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop",
    description:
      "Arabica coffee beans with balanced acidity, roasted for wholesale and export.",
    origin: "Coorg, India",
    stock: "Limited",
  },
  {
    id: "red-chilli",
    name: "Red Chilli",
    price: "₹450 / Kg",
    stockKg: 1000,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop",
    description:
      "Sun-dried red chillies with vibrant color and consistent heat levels.",
    origin: "Guntur, India",
    stock: "In Stock",
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === id);
}
