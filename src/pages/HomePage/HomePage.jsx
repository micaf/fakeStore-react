import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";

import ItemListContainer from "../../components/ItemListContainer/ItemListContainer";

import {Typography, CircularProgress } from "@mui/material";

import banner from '../../assets/banner.mp4'
import women from '../../assets/women.mp4'
import men from '../../assets/men.mp4'
import electronics from '../../assets/electronics.mp4'
import jewelry from '../../assets/jewelry.mp4'

import './HomePage.css'
import { CommerceContext } from "../../context/CommerceContext";
import { getProducts } from "../../service/firebaseService";

function HomePage() {
    const [loading, setLoading] = useState(true);
    const { state, dispatch } = useContext(CommerceContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setLoading(true)
        if (!state.allProducts.length) {
            const getAllProducts = async() => {
              const docs = await getProducts();
              dispatch({ type: 'SET_ALL_PRODUCTS', payload: docs })
              const firstFourProducts = state.allProducts.slice(0, 4);
              setProducts(firstFourProducts);
              setLoading(false)
            };
            getAllProducts()
          } else {
            setLoading(true)
            const firstFourProducts = state.allProducts.slice(0, 4);
            setProducts(firstFourProducts);
            setLoading(false)
          }
      }, [state.allProducts]);

    return (
        <>
            <div className="home-container">
                <div className="banner-container">
                    <video autoPlay loop muted id="banner"><source src={banner} type="video/mp4"></source></video>
                </div>
                <Typography sx={{ fontSize: 'h5.fontSize', fontWeight: 'bold', marginLeft: 20 }}>CATEGORIES</Typography>
                <div className="categories">
                    <Link to={`/category/Women`}>
                        <video autoPlay loop muted id="women">
                            <source src={women} type="video/mp4"></source>
                        </video>
                    </Link>
                    <Link to={`/category/Men`}>
                        <video autoPlay loop muted id="men"><source src={men} type="video/mp4"></source></video>
                    </Link>



                </div>
                <div className="categories">
                    <Link to={`/category/Electronics`}>
                        <video autoPlay loop muted id="electronics"><source src={electronics} type="video/mp4"></source></video>
                    </Link>
                    <Link to={`/category/Jewelry`}>
                        <video autoPlay loop muted id="jewelry"><source src={jewelry} type="video/mp4"></source></video>
                    </Link>



                </div>

                {products.length > 0 && !loading ? (
                    <>
                        <Typography sx={{ fontSize: 'h5.fontSize', fontWeight: 'bold', marginLeft: 20, marginTop:10 }}>Special products for you!</Typography>
                        <ItemListContainer products={products}></ItemListContainer>
                    </>
                ) : (
                    <Typography sx={{ fontSize: 'h5.fontSize', padding: 2, marginLeft: 20 }}>
                        There are not products selected for you
                    </Typography>
                )}
                {loading && <CircularProgress color="inherit" />}



            </div>
        </>


    )
}

export default HomePage