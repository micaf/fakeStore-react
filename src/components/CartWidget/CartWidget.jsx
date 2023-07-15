import { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import {
  Drawer,
  List,
  ListItem,
  Divider,
  Typography,
  Badge,
  IconButton,
  Box
} from "@mui/material";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StyledButton from '../StyledButton/StyledButton';
import './CartWidget.css'

const redirectButtonStyle = {
  fontSize: 13, fontWeight: 'bold', cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
    textTransform: "uppercase"
  },
};


const CartWidget = () => {
  const [selectedProducts, setSelectedProducts] = useState([  {
    "id": 3,
    "title": "Cotton Jacket",
    "price": 55.99,
    "description": "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    "category": "Men",
    "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    "stock": 2000,
    "count": 0,
    "isFavorite": false
},
{
    "id": 4,
    "title": "Casual Slim Fit",
    "price": 15.99,
    "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    "category": "Men",
    "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    "stock": 2000,
    "count": 0,
    "isFavorite": false
},
{
    "id": 5,
    "title": "Naga Dragon Bracelet",
    "price": 695,
    "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    "category": "Jewelry",
    "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    "stock": 2000,
    "count": 0,
    "isFavorite": false
},])
  const [totalItems, setTotalItems] = useState({ quantity: 1, amount: 300 })
  const [cartOpen, setCartOpen] = useState(false);
  const maxItems = 4
  const renderedItems = selectedProducts.slice(0, maxItems);


  const handleCartOpen = (event) => {
    event.preventDefault();
    setCartOpen(true);
  };

  const handleCartClose = (event) => {
    event.preventDefault();
    setCartOpen(false);
  };

  const handleItemChange = (newItemCount) => {
    // Handle item change logic
  };

  const handleOnClick = () => {

  }

  const cartItems = selectedProducts?.length ? selectedProducts.length : 0;

  return (
    <>
      <IconButton onClick={handleCartOpen} color="inherit">
        <Badge badgeContent={cartItems} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={handleCartClose}
        PaperProps={{
          sx: { width: "25%", padding: 2, backgroundColor: '#FFFFFF' },
        }}
      >
        <Box sx={{display: 'flex', flexDirection: 'row',}}>
          <ShoppingCartIcon />
          <Typography sx={{ fontSize: 18, fontWeight: 'bold', marginLeft: 1 }}>YOUR CART</Typography>
        </Box>
        <Typography sx={{ fontSize: 15, fontWeight: 'bold', margin: '10px 0px' }}>Total Items: {totalItems.quantity}</Typography>
        <Divider />
        <List sx={{height: '500px', overflowY: 'scroll'}} className='custom-scroll'>
          {selectedProducts.map((product) => (
            <Fragment key={product.id}>
              <ListItem disablePadding sx={{marginLeft:1}}>
                <Divider />
                <CartItem product={product} handleItemChange={handleItemChange} />
              </ListItem>
            </Fragment>
          ))}
        </List>
        <Divider sx={{ marginBottom: 2 }} />
        <Typography sx={{ fontSize: 15, fontWeight: 'bold', marginBottom: 2 }}>TOTAL: ${totalItems.amount}</Typography>
        <Link to="/checkout"><StyledButton text="Checkout" onClick={handleOnClick} /></Link>
      </Drawer>
    </>
  );
};


export default CartWidget;