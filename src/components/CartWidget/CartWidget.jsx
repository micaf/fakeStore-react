import { useState,useContext, useEffect } from 'react';
import {
  Drawer,
  Badge,
  IconButton
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { CommerceContext } from '../../context/CommerceContext';
import CartContent from '../CartContent/CartContent';


const CartWidget = () => {
  const { state, dispatch } = useContext(CommerceContext);
  const [cartOpen, setCartOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const quantityTotal = Object.values(state.productsSelected).reduce((acc, item) => acc + item.count, 0);
    setTotalItems(quantityTotal)
  }, [state.productsSelected])

  const handleCartOpen = (event) => {
    event.preventDefault();
    setCartOpen(true);
  };

  const handleCartClose = (event) => {
    event.preventDefault();
    setCartOpen(false);
  };


  return (
    <>
      <IconButton onClick={handleCartOpen} color="inherit">
        <Badge badgeContent={totalItems} color="error">
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
        <CartContent isCheckout={false} />
      </Drawer>
    </>
  );
};


export default CartWidget;