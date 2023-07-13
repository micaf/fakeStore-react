import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ItemListContainer from '../../components/ItemListContainer/ItemListContainer'
import Products from '../../products.json'


function ShopPage() {
  const [products, setProducts] = useState(Products);

  let { category } = useParams();

  return (
    <>
      <Typography sx={{ fontSize: 'h5.fontSize', fontStyle: 'oblique', padding: 2, fontWeight: 'bold', marginLeft: 20 }}>ALL PRODUCTS [{products.length}]</Typography> 
         <ItemListContainer products={products}></ItemListContainer> 

    </>
  )
}

export default ShopPage