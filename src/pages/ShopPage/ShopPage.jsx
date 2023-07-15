import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ItemListContainer from '../../components/ItemListContainer/ItemListContainer'

import { getProducts, getProductsByCategory } from "../../service/firebaseService";

import Typography from "@mui/material/Typography";

function ShopPage() {

  const [products, setProducts] = useState([]);

  let { category } = useParams();

  useEffect(() => {
    if (category) {
      const getProducts = async () => {
        const docs = await getProductsByCategory(category);
        setProducts(docs);
      };
      getProducts();
    } else {
      const getAllProducts = async () => {
        const docs = await getProducts();
        setProducts(docs);
      };
      getAllProducts();
    }

  }, [category]);

  return (
    <>
      <Typography sx={{ fontSize: 'h5.fontSize', fontStyle: 'oblique', padding: 2, fontWeight: 'bold', marginLeft: 20 }}>{category ? category.toUpperCase() : 'ALL' } PRODUCTS [{products.length}]</Typography>
      <ItemListContainer products={products}></ItemListContainer>

    </>
  )
}

export default ShopPage