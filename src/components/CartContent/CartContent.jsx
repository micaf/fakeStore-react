import { Fragment, useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    List,
    ListItem,
    Divider,
    Typography,
    Box
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StyledButton from '../StyledButton/StyledButton';

import { CommerceContext } from '../../context/CommerceContext';
import CartItem from '../CartItem/CartItem';
import './CartContent.css'

const CartContent = ({ isCheckout }) => {
    const { state, dispatch } = useContext(CommerceContext);
    const [productsItems, setProductItems] = useState([])

    useEffect(() => {
        const keys = Object.keys(state.productsSelected)
        let productSelected = []
        if (keys.length) {

            keys.forEach(key => {
                productSelected.push(state.productsSelected[key])
            })

            const quantityTotal = Object.values(state.productsSelected).reduce((acc, item) => acc + item.count, 0);
            const totalAmount = productSelected.reduce((acc, item) => acc + item.count * item.price, 0);
            setProductItems(productSelected);
            dispatch({
                type: 'SET_TOTAL_ITEMS', payload: {
                    amount: totalAmount.toFixed(2),
                    quantity: quantityTotal
                }
            });
        } else {
            setProductItems([]);
            dispatch({
                type: 'SET_TOTAL_ITEMS', payload: {
                    amount: 0,
                    quantity: 0
                }
            });
        }


    }, [state.productsSelected]);


    const handleOnClick = () => {

    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', }}>
                <ShoppingCartIcon />
                <Typography sx={{ fontSize: 18, fontWeight: 'bold', marginLeft: 1 }}>YOUR CART</Typography>
            </Box>
            {productsItems?.length > 0 ? (
                <>
                    <Typography sx={{ fontSize: 15, fontWeight: 'bold', margin: '10px 0px' }}>Total Items: {state.totalItems.quantity}</Typography>
                    <Divider />
                    <List sx={{ height: '450px', overflowY: 'scroll' }} className='custom-scroll'>
                        {productsItems.map((product) => (
                            <Fragment key={product.id}>
                                <ListItem disablePadding sx={{ marginLeft: 1 }}>
                                    <Divider />
                                    <CartItem product={product} />
                                </ListItem>
                            </Fragment>
                        ))}
                    </List>
                    <Divider sx={{ marginBottom: 2 }} />
                    <Typography sx={{ fontSize: 15, fontWeight: 'bold', marginBottom: 1}}>TOTAL: ${state.totalItems.amount}</Typography>
                    {!isCheckout && <Link to="/checkout"><StyledButton text="Checkout" onClick={handleOnClick} /></Link>}
                </>) :
                (<Typography sx={{ fontSize: 15, margin: '10px 0px' }}>
                    No items in the cart.
                </Typography>)
            }
        </>
    );
};


export default CartContent;