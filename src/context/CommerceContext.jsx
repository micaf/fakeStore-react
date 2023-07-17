import { useReducer, createContext, useEffect } from "react";
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

  useEffect(() => {
   // const savedCartItems = localStorage.getItem('productsItems');
    // // if (savedCartItems) {
    // //   dispatch({ type: 'SET_PRODUCTS_SELECTED', payload: JSON.parse(savedCartItems) });
    // // }
  }, []);


  return (
    <CommerceContext.Provider value={{ state, dispatch }}>
      {children}
    </CommerceContext.Provider>
  );

};
