import { useContext } from "react";
import { Box, Typography } from "@mui/material";

import { CommerceContext } from '../../context/CommerceContext'
import ItemListCard from "../ItemListCard/ItemListCard";
import './ItemListContainer.css';


function ItemListContainer({ products }) {
  const { state, dispatch } = useContext(CommerceContext);

  const handleAddProduct = (product) => {
    const id = product.id
    const newState = { ...state.productsSelected };
    if (newState[id]) {
      newState[id].count += 1
    } else {
      newState[id] = {
        ...product,
        count: 1
      }
    }
    dispatch({ type: 'SET_PRODUCTS_SELECTED', payload: newState });
  }

  const handleFavorite = (productSelected) => {
    let newState = [...state.productsFavorites];
    const existingIndex = state.productsFavorites.findIndex((product) => product.id == productSelected.id)
    if (existingIndex !== -1) {
      newState = newState.splice(1, existingIndex)
    } else {
      newState.push(productSelected)
    }

    dispatch({ type: 'SET_PRODUCTS_FAVORITES', payload: newState });
  }

  const setFavorite = (id) => {
    const existingIndex = state.productsFavorites.findIndex((product) => product.id == id)
    if (existingIndex !== -1) {
      return true
    } else {
      return false
    }
  }


  return (
    <>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ItemListCard
              key={product.id}
              product={product}
              handleAddProduct={(product) => handleAddProduct(product)}
              handleFavorite={(product) => handleFavorite(product)}
              disabled={state.productSelected && Object.keys(state.productSelected).includes(product.id) && state.productSelected[product.id].count == state.productSelected[product.id].stock}
              isFavorite={setFavorite(product.id)}
            />
          ))
        ) : (
          <Box
            sx={{
              display: 'inline-flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '300px'
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontWeight: 'bold' }}
            >
              Sorry! There are no products here!
            </Typography>
          </Box>
        )}
      </div>
    </>
  );
}

export default ItemListContainer