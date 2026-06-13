import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext.jsx";

const ProductCard = ({ product }) => {
  const { addToCart } = useShop();

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="product-body">
        <span>{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="card-bottom">
          <strong>Rs. {product.price}</strong>
          <button onClick={() => addToCart(product)}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
