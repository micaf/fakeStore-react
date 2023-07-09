import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import ItemListContainer from '../../components/ItemListContainer/ItemListContainer'

import Products from '../../products.json'
import { Typography } from "@mui/material";

import banner from '../../assets/banner.mp4'

import './HomePage.css'

function HomePage() {

    const [products, setProducts] = useState(Products);

    let { category } = useParams();

    // useEffect(() => {
    //     if (category) {
    //         axios(`${import.meta.env.VITE_BASE_URL}/products/category/${category}`).then((json) =>
    //             setProducts(json.data))
    //     } else {
    //         axios(`${import.meta.env.VITE_BASE_URL}/products`).then((json) =>
    //             setProducts(json.data)
    //         );
    //     }

    // }, [category]);


    return (
        <div className="home-container">
            <div className="banner-container">
                <video autoPlay loop muted id="banner"><source src={banner} type="video/mp4"></source></video>
            </div>
            <Typography sx={{ fontSize: 'h5.fontSize', fontStyle: 'oblique', fontFamily: 'Monospace', padding: 2, fontWeight: 'bold', marginLeft: 20 }}>ALL PRODUCTS [{products.length}]</Typography>
            <ItemListContainer products={products}></ItemListContainer>
        </div>
    )
}

export default HomePage