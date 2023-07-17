import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { CommerceContext } from '../../context/CommerceContext';

import ItemListContainer from '../../components/ItemListContainer/ItemListContainer';

import { getProductsByCategory, getProducts } from "../../service/firebaseService";

import Typography from "@mui/material/Typography";

function ShopPage() {
  const { state, dispatch } = useContext(CommerceContext);
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    if (category) {
      const getProducts = () => {
        const docs = getProductsByCategory(category);
        setProducts(docs);
        setProductCount(docs.length);
      };
      getProducts();
    } else {
      if (!state.allProducts.length) {
        const getAllProducts = () => {
          const docs = getProducts();
          dispatch({ type: 'SET_ALL_PRODUCTS', payload: docs })
          setProducts(state.allProducts);
          setProductCount(state.allProducts.length);
        };
        getAllProducts()
      } else {
        setProducts(state.allProducts);
        setProductCount(state.allProducts.length);
      }
    }
  }, [state.allProducts, category]);

  return (
    <>
      <Typography sx={{ fontSize: 'h5.fontSize', fontStyle: 'oblique', padding: 2, fontWeight: 'bold', marginLeft: 20 }}>
        {category ? category.toUpperCase() : 'ALL'} PRODUCTS [{productCount}]
      </Typography>
      <ItemListContainer products={products}></ItemListContainer>
    </>
  );
}

export default ShopPage;