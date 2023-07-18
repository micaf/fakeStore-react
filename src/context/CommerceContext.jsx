import { useReducer, createContext } from "react";
import { productReducer } from "../reducer/productsReducer";

export const CommerceContext = createContext();

const initialState = {
  allProducts: [],
  productsSelected: {},
  productsFavorites: [],
  totalItems: {
    amount: 0,
    quantity: 0,
  }
};

export const CommerceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <CommerceContext.Provider value={{ state, dispatch }}>
      {children}
    </CommerceContext.Provider>
  );

};
