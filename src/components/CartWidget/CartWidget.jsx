import React from "react";
//import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartWidget = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", width: "40px" }}>
      <ShoppingCartIcon sx={{ color: "white" }} />
      <p style={{ color: "white" }}>5</p>
    </div>
  );
};

export default CartWidget;