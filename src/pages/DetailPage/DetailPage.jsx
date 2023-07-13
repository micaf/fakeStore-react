import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { CartContext } from '../../context/CartContext'

import axios from "axios";
import {
  CardActions,
  IconButton,
  Typography,
  CardMedia,
  CardContent,
  Card,
  Box,
  Divider,
  Tooltip
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './DetailPage.css'
import products from '../../products.json';
import StyledButton from "../../components/StyledButton/StyledButton";
import CounterButton from "../../components/CounterButton/CounterButton";
function DetailPage() {
  const [product, setProduct] = useState(products[2]);
  const handleItemChange = () => {
    console.log("hola")
  }

  const handleOnClick = () => {

  }
  // let { id } = useParams();

  // useEffect(() => {
  //   if (id) {
  //     axios(`${import.meta.env.VITE_BASE_URL}/products/${id}`).then((json) =>
  //       setProduct(json.data))
  //   }
  // }, []);

  return (
    <>
      <div className="product-container">
        <Card sx={{ width: 900, height: 420, margin: 2, padding: 10, borderRadius: '16px', }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <CardMedia component="img" image={product.image} alt="product image" sx={{ height: 400, maxWidth: "600", margin: "auto", marginTop: 2 }} />
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
              <CardActions disableSpacing sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%' }}>

                <CounterButton stock={product.stock} totalItems={1} onChangeItems={handleItemChange} />

                <StyledButton text="Add to Cart" onClick={handleOnClick} />
              </CardActions>
            </CardContent>

          </Box>

        </Card>
      </div>

    </>
  )
}

export default DetailPage