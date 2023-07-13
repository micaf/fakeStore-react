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
  const [selectedProducts, setSelectedProducts] = useState([{
    "id": 14,
    "title": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    "price": 999.99,
    "description": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    "stock": 4,
    "rating": {
      "rate": 2.2,
      "count": 140
    },
    "count": 3,
  },
  {
    "id": 15,
    "title": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    "price": 56.99,
    "description": "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    "stock": 2000,
    "rating": {
      "rate": 2.6,
      "count": 235
    },
    "count": 3

  },
  {
    "id": 16,
    "title": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    "price": 29.95,
    "description": "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    "stock": 2000,
    "rating": {
      "rate": 2.9,
      "count": 340
    },
    "count": 3
  },
  {
    "id": 17,
    "title": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    "price": 39.99,
    "description": "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    "stock": 2000,
    "rating": {
      "rate": 3.8,
      "count": 679
    },
    "count": 3
  },
  {
    "id": 18,
    "title": "MBJ Women's Solid Short Sleeve Boat Neck V ",
    "price": 9.85,
    "description": "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    "stock": 2000,
    "rating": {
      "rate": 4.7,
      "count": 130
    },
    "count": 3
  }])
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
        <List sx={{maxHeight: '500px', overflowY: 'scroll'}} className='custom-scroll'>
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