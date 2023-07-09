import { useState, createContext } from "react";

export const CartContext = createContext();

const initialState = () => [];

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(initialState);

  return (
    <CartContext.Provider value={[items, setItems ]}>
      {children}
    </CartContext.Provider>
  );

};
