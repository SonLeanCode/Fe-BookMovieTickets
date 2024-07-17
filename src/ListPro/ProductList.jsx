import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ProductList = ({ activeTab }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/pro"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data); // Assuming your API returns an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeTab) {
      const filtered = products.filter(
        (product) => product.category === activeTab,
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [activeTab, products]);

  return (
    <div className="grid grid-cols-4 gap-8">
      {filteredProducts.map((product) => (
        <div key={product.id} className="relative">
          <img
            className="border-1 h-[360px] w-[250px] rounded-md object-cover"
            src={product.image} // Assuming each product object has an 'image' field
            alt={product.name} // Assuming each product object has a 'name' field
          />
          <div className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-50 p-2 text-white">
            {product.name}
          </div>
        </div>
      ))}
    </div>
  );
};

ProductList.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export default ProductList;
