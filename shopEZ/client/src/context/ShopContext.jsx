import { createContext, useContext, useEffect, useState } from "react";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("shopezUser")) || null;
  });
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("shopezCart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("shopezCart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("shopezUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("shopezUser");
    }
  }, [user]);

  const addToCart = (product, qty = 1) => {
    setCart((oldCart) => {
      const item = oldCart.find((x) => x._id === product._id);

      if (item) {
        return oldCart.map((x) => (x._id === product._id ? { ...x, qty: x.qty + qty } : x));
      }

      return [...oldCart, { ...product, qty }];
    });
  };

  const removeFromCart = (id) => {
    setCart((oldCart) => oldCart.filter((item) => item._id !== id));
  };

  const updateQty = (id, qty) => {
    setCart((oldCart) => oldCart.map((item) => (item._id === id ? { ...item, qty } : item)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const logout = () => {
    setUser(null);
  };

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <ShopContext.Provider
      value={{
        user,
        setUser,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        cartTotal
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
