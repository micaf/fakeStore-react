import { Link } from "react-router-dom";

import axios from "axios";

import { Typography } from "@mui/material";

import banner from '../../assets/banner.mp4'
import women from '../../assets/women.mp4'
import men from '../../assets/men.mp4'
import electronics from '../../assets/electronics.mp4'
import jewelry from '../../assets/jewelry.mp4'

import './HomePage.css'

function HomePage() {


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
        <>
            <div className="home-container">
                <div className="banner-container">
                    <video autoPlay loop muted id="banner"><source src={banner} type="video/mp4"></source></video>
                </div>
                <Typography sx={{ fontSize: 'h5.fontSize', fontWeight: 'bold', marginLeft: 20 }}>CATEGORIES</Typography>
                <div className="categories">
                    <Link to={`/category/women`}>
                        <video autoPlay loop muted id="women">
                            <source src={women} type="video/mp4"></source>
                        </video>
                    </Link>
                    <Link to={`/category/men`}>
                        <video autoPlay loop muted id="men"><source src={men} type="video/mp4"></source></video>
                    </Link>



                </div>
                <div className="categories">
                    <Link to={`/category/electronics`}>
                        <video autoPlay loop muted id="electronics"><source src={electronics} type="video/mp4"></source></video>
                    </Link>
                    <Link to={`/category/jewelry`}>
                        <video autoPlay loop muted id="jewelry"><source src={jewelry} type="video/mp4"></source></video>
                    </Link>



                </div>

            </div>
        </>


    )
}

export default HomePage