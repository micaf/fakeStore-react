import { Fragment, useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CommerceContext } from '../../context/CommerceContext';
import { getProductById } from "../../service/firebaseService";
import CartItem from '../CartItem/CartItem';

import {
    List,
    ListItem,
    Divider,
    Typography,
    Box
} from "@mui/material";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StyledButton from '../StyledButton/StyledButton';
import './CartContent.css'

const redirectButtonStyle = {
    fontSize: 13, fontWeight: 'bold', cursor: "pointer",
    "&:hover": {
        textDecoration: "underline",
        textTransform: "uppercase"
    },
};


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

            //     //localStorage.setItem('productsItems', JSON.stringify(state.productsSelected));
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

    const deleteProductSelected = (index) => {
        debugger;
        const newProductList = state.productsItems.splice(1, index);
        const quantityTotal = Object.values(state.productsSelected).reduce((acc, item) => acc + item.count, 0);
        const totalAmount = updatedProducts.reduce((acc, item) => acc + item.count * item.price, 0);
        dispatch({
            type: 'SET_PRODUCTS_ITEMS', payload: newProductList

        });
        dispatch({
            type: 'SET_TOTAL_ITEMS', payload: {
                quantity: quantityTotal,
                amount: totalAmount.toFixed(2)
            }
        });
    }

    const updateProductSelected = (id, index) => {
        if (state.productsSelected[id].count === state.productsItems[index].count) {
            return
        }
        const count = state.productsSelected[id].count;
        const quantityTotal = Object.values(state.productsSelected).reduce((acc, item) => acc + item.count, 0);
        const updatedProducts = [...state.productsItems]
        updatedProducts[existingProductIndex].count = count
        const totalAmount = updatedProducts.reduce((acc, item) => acc + item.count * item.price, 0);
        dispatch({
            type: 'SET_PRODUCTS_ITEMS', payload: updatedProducts

        });
        dispatch({
            type: 'SET_TOTAL_ITEMS', payload: {
                quantity: quantityTotal,
                amount: totalAmount.toFixed(2)
            }
        });
    }


    const addProductSelected = (id) => {
        const getProduct = async () => {
            const product = await getProductById(id);
            const count = state.productsSelected[id].count;
            const quantityTotal = Object.values(state.productsSelected).reduce((acc, item) => acc + item.count, 0)
            debugger;
            // const newProductsItems = [...state.productsItems, {
            //     ...product, count: count
            // }]
            const totalAmount = 0 // newProductsItems.reduce((acc, item) => acc + item.count * item.price, 0);
            dispatch({
                type: 'SET_PRODUCTS_ITEMS', payload: {
                    ...product, count: count
                }
            });
            console.log(state.productsItems)
            dispatch({
                type: 'SET_TOTAL_ITEMS', payload: {
                    quantity: quantityTotal,
                    amount: totalAmount.toFixed(2)
                }
            });
        };
        getProduct();
    }


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
                    <List sx={{ height: '500px', overflowY: 'scroll' }} className='custom-scroll'>
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
                    <Typography sx={{ fontSize: 15, fontWeight: 'bold', marginBottom: 2 }}>TOTAL: ${state.totalItems.amount}</Typography>
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