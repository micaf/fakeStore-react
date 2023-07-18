import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CommerceContext } from "../../context/CommerceContext";


import {
  CardActions,
  IconButton,
  Typography,
  CardMedia,
  CardContent,
  Card,
  Box,
  Divider,
  Tooltip,
  CircularProgress
} from "@mui/material";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './DetailPage.css'
import StyledButton from "../../components/StyledButton/StyledButton";
import CounterButton from "../../components/CounterButton/CounterButton";
import { getProductById } from "../../service/firebaseService";


function DetailPage() {
  const [product, setProduct] = useState({});
  const { state, dispatch } = useContext(CommerceContext);
  const [count, setCount] = useState(0);
  const [stock, setStock] = useState(0);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    if (id) {
      const getProduct = async () => {
        const productData = await getProductById(id);
        setCount(productData?.count ? productData.count : 0);
        setStock(productData?.stock ? productData.stock : 0);
        setProduct(productData ? productData : null);
        setLoading(false)
      };
      getProduct();
    }
  }, [id]);

  const handleNewCount = (newCount) => {
    const newState = { ...state.productsSelected };
      setCount(newCount);
      setStock(newState[id] ? newState[id].stock - newCount : stock - newCount);
  };


  const handleAddProduct = () => {
    const newState = { ...state.productsSelected };
    if (newState[id]) {
      newState[id].count += count
    } else {
      newState[id] = {
        ...product,
        count: count,
      }
    }
    dispatch({ type: 'SET_PRODUCTS_SELECTED', payload: newState });
  }


  return (
    <>
      {loading ? (
        <div className="product-container">
          <CircularProgress color="inherit" sx={{marginTop:2}} />
        </div>
    ) : (<div className="product-container">
        <Card sx={{ width: 900, height: 420, margin: 2, padding: 10, borderRadius: '16px', }}>
         {product !== null ? (<Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <CardMedia component="img" image={product.image} alt="product image" sx={{ height: 400, maxWidth: "50%", margin: "auto", marginTop: 2, objectFit: 'contain', padding: 1 }} />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', width: "400" }}>
              <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>
                {product.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: '#D32F2F' }}>
                  ${product.price}
                </Typography>
                {product.isFavorite ? <Tooltip title="Remove to Favorites">
                  <IconButton aria-label="Remove to Favorites">
                    <FavoriteIcon sx={{ color: '#000000' }} />
                  </IconButton>
                </Tooltip> : <Tooltip title="Add to Favorites">
                  <IconButton aria-label="Add to Favorites">
                    <FavoriteBorderIcon sx={{ color: '#000000' }} />
                  </IconButton>
                </Tooltip>}
              </Box>
              <Divider></Divider>
              <Typography sx={{ fontSize: 14, marginTop: 2, textTransform: 'capitalize' }} color="text.secondary">
                {product.description}
              </Typography>
              <CardActions disableSpacing sx={{ display: 'flex', flexDirection: 'column', height: '100%', marginTop: 2 }}>
                <CounterButton initialStock={stock} totalItems={count} disabled={state.productSelected && Object.keys(state.productSelected).includes(id) && ((state.productsSelected[id]?.count + count) == state.productsSelected[id]?.stock || count == state.productsSelected[id]?.stock)} onChangeItems={(newCount, stockAvailable) => handleNewCount(newCount, stockAvailable)} />
                <StyledButton text="Add to Cart" disabled={count == 0} onClick={handleAddProduct} />
              </CardActions>
            </CardContent>
          </Box>) :
          (
            <Box sx={{  display: 'inline-flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '300px'}}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight:'bold'}}>
                  There is no product associated with this id
            </Typography>
        </Box>
          )
          }
        </Card>
      </div>)}
    </>
  )
}

export default DetailPage;