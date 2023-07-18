import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { CommerceContext } from '../../context/CommerceContext';

import ItemListContainer from '../../components/ItemListContainer/ItemListContainer';

import { getProductsByCategory, getProducts } from "../../service/firebaseService";

import {Typography, CircularProgress } from "@mui/material";
import './ShopPage.css'

function ShopPage() {
  const { state, dispatch } = useContext(CommerceContext);
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    if (category) {
      const getProducts = async () => {
        const docs = await getProductsByCategory(category);
        setProducts(docs);
        setProductCount(docs.length ? docs.length : 0);
        setLoading(false)
      };
      getProducts();
    } else {
      if (!state.allProducts.length) {
        const getAllProducts = async () => {
          const docs = await getProducts();
          dispatch({ type: 'SET_ALL_PRODUCTS', payload: docs })
          setProducts(state.allProducts);
          setProductCount(state.allProducts.length ? state.allProducts.length : 0);
          setLoading(false)
        };
        getAllProducts()
      } else {
        setLoading(true)
        setProducts(state.allProducts);
        setProductCount(state.allProducts.length ? state.allProducts.length : 0);
        setLoading(false)
      }
    }
  }, [state.allProducts, category]);

  return (
    <>
    {loading ? (
      <div className="loading-container">
          <CircularProgress color="inherit" sx={{marginTop:20}}/>
      </div>
    ) : (
      <>
        <Typography
          sx={{
            fontSize: 'h5.fontSize',
            fontStyle: 'oblique',
            padding: 2,
            fontWeight: 'bold',
            marginLeft: 20
          }}
        >
          {category ? category.toUpperCase() : 'ALL'} PRODUCTS [{productCount}]
        </Typography>
        <ItemListContainer products={products}></ItemListContainer>
      </>
    )}
  </>
  );
}

export default ShopPage;