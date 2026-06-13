import { useEffect, useState } from "react";
import API from "../api.js";
import ProductCard from "../components/ProductCard.jsx";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/api/products?keyword=${keyword}`);
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [keyword]);

  return (
    <section>
      <div className="hero">
        <div>
          <p className="eyebrow">Simple MERN shopping app</p>
          <h1>Buy daily products without making it complicated.</h1>
          <p>ShopEZ has products, cart, checkout, orders and admin product management.</p>
        </div>
        <div className="search-box">
          <label htmlFor="search">Search Products</label>
          <input
            id="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Try sneakers or watch"
          />
        </div>
      </div>

      {loading ? (
        <p className="notice">Loading products...</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
