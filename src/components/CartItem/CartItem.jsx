import { useEffect, useState, useContext } from "react";
import { CommerceContext } from '../../context/CommerceContext';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import CounterButton from "../CounterButton/CounterButton";


const CartItem = ({ product }) => {
  const { state, dispatch } = useContext(CommerceContext);
  const { id, title, price, image } = product;
  const [isEditing, setIsEditing] = useState(false);
  const [count, setCount] = useState(product.count);
  const [stock, setStock] = useState(product.stock)

  useEffect(() => {
    setCount(product.count)
    setStock(product.stock)
  }, [product])


  const handleEdit = () => {
    setIsEditing(!isEditing)

  };

  const handleNewCount = (count, stock) => {
    setCount(count)
    setStock(stock)

    const newState = { ...state.productsSelected };
    if (newState[id] && count > 0) {
      newState[id].count = count
    } else {
      delete newState[id];
    }

    dispatch({ type: 'SET_PRODUCTS_SELECTED', payload: newState });
  }


  return (
    <>

      <Card sx={{ width: '90%', margin: '10px 0px', padding: 1, borderRadius: '16px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <CardMedia
            component="img"
            image={image}
            alt="product image"
            sx={{ height: 100, maxWidth: "30%", margin: "auto", marginTop: 1, objectFit: 'contain', padding: '5px' }}
          />
          <CardContent sx={{ display: 'flex', flexDirection: 'column', width: "70%" }}>
            <Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>
              {title}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Typography sx={{ fontSize: 13, fontWeight: 'bold', color: '#D32F2F', marginRight: 1 }}>
                ${price}
              </Typography>
              <Typography sx={{ fontSize: 13, color: '#000000' }}>
                QTY: {count}
              </Typography>
            </Box>
            <Box>
              <IconButton aria-label="Edit" onClick={handleEdit}>
                <EditIcon sx={{ fontSize: 13, color: '#000000' }} />
              </IconButton>
              <IconButton aria-label="Delete Product Selected" onClick={() => handleNewCount(0)}>
                <DeleteIcon sx={{ fontSize: 13, color: '#000000' }} />
              </IconButton>
            </Box>
            {isEditing && (
              <CardActions disableSpacing sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%' }}>
                <CounterButton initialStock={stock} totalItems={count} onChangeItems={(newCount, stockAvailable) => handleNewCount(newCount, stockAvailable)} />
              </CardActions>
            )}
          </CardContent>
        </Box>
      </Card>
    </>

  );
};


export default CartItem;