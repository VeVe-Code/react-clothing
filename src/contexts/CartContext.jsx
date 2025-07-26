import { createContext, useEffect, useState } from "react";
const CartContext= createContext();

let CartcontextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let storedProducts = JSON.parse(localStorage.getItem("products"));
      setProducts(storedProducts);
  
  }, []);

  return (
    <CartContext.Provider value={{ products, setProducts }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartcontextProvider };