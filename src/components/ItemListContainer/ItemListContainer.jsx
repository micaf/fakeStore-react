import { useEffect, useContext, useState } from "react";
import { CommerceContext } from '../../context/CommerceContext'
import ItemListCard from "../ItemListCard/ItemListCard";
import './ItemListContainer.css';

function ItemListContainer({ products }) {
  const { state, dispatch } = useContext(CommerceContext);

  const handleAddProduct = (product) => {
    debugger;
    const id = product.id
    const newState = {...state.productsSelected};
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

  const handleFavorite = (id) => {
    let newState = [...state.productsFavorites];
    if (state.productsFavorites.includes(id)) {
      newState = newState.filter((favoriteId) => favoriteId != id)
    } else {
      newState.push(id)
    }

    dispatch({ type: 'SET_PRODUCTS_FAVORITES', payload: newState });
  }

  const setFavorite = (id) => {
    if (state.productsFavorites.includes(id)) {
      return true
    } else {
      return false
    }
  }


  return (
    <>
      <div className="products-grid">
        {products.map(product => {
          return (
            <ItemListCard
              key={product.id} product={product}
              handleAddProduct={(product) => handleAddProduct(product)}
              handleFavorite={(id) => handleFavorite(id)}
              isFavorite={setFavorite(product.id)} />
          );
        })}
      </div>
    </>
  )
}

export default ItemListContainer