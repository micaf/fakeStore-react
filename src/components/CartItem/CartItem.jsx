import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import CounterButton from "../CounterButton/CounterButton";


const CartItem = ({ product, handleItemChange }) => {
  const { id, title, price, image } = product;
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [count, setCount] = useState(product.count);
  const [stock, setStock] = useState(product.stock)


  const handleDelete = (id) => {
    // Handle delete logic
    if (id && openModal) {
      setCount(0)
      handleModal()
    }
  };

  const handleModal = () => {
    setOpenModal(!openModal)
  };

  const handleEdit = () => {
    setIsEditing(!isEditing)

  };

  const handleNewCount = (count, stock) => {
    setCount(count)
    setStock(stock)
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
              <IconButton aria-label="Delete Product Selected" onClick={handleModal}>
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


      <Dialog
        open={openModal}
        onClose={handleModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Remove products"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove <b>{title}({count})</b> from your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModal}>No</Button>
          <Button onClick={() => handleDelete(id)} autoFocus>Yes</Button>
        </DialogActions>
      </Dialog>
    </>

  );
};


export default CartItem;