import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { CartContext } from '../../context/CartContext'

import axios from "axios";
import {
  CardHeader,
  CardActions,
  IconButton,
  Typography,
  CardMedia,
  CardContent,
  Card
} from "@mui/material";
import  AddIcon  from '@mui/icons-material/Add';
import  FavoriteIcon  from '@mui/icons-material/Favorite';

import './DetailPage.css'


function DetailPage() {
  const [product, setProduct] = useState({});

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      axios(`${import.meta.env.VITE_BASE_URL}/products/${id}`).then((json) =>
        setProduct(json.data))
    }
  }, []);

  return (
    <>
      <div className="product-container">
        <Card sx={{ maxWidth: 400, margin: 10, padding: 10 }}>
          <CardHeader
            title={product.title}
            subheader={`$ ${product.price}`}
          />
          <CardMedia component="img" image={product.image} alt="product image" sx={{ height: 100, width: "auto", margin: "auto", marginTop: 2 }} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton aria-label="add to cart">
              <AddIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>

    </>
  )
}

export default DetailPage