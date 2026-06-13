import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api.js";
import { useShop } from "../context/ShopContext.jsx";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useShop();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      const { data } = await API.get(`/api/products/${id}`);
      setProduct(data);
    };

    loadProduct();
  }, [id]);

  if (!product) {
    return <p className="notice">Loading product...</p>;
  }

  const addHandler = () => {
    addToCart(product, Number(qty));
    navigate("/cart");
  };

  return (
    <section className="details">
      <img src={product.image} alt={product.name} />
      <div>
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <h2>Rs. {product.price}</h2>
        <p>{product.countInStock > 0 ? `${product.countInStock} items available` : "Out of stock"}</p>
        <div className="qty-row">
          <label>Quantity</label>
          <input min="1" max={product.countInStock} type="number" value={qty} onChange={(e) => setQty(e.target.value)} />
        </div>
        <button disabled={product.countInStock === 0} onClick={addHandler}>
          Add to Cart
        </button>
      </div>
    </section>
  );
};

export default ProductDetails;
