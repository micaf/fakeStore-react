import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import ItemListContainer from '../../components/ItemListContainer/ItemListContainer'

function HomePage() {

    const [products, setProducts] = useState([]);

    let { category } = useParams();

    useEffect(() => {
        if (category) {
            axios(`${import.meta.env.VITE_BASE_URL}/products/category/${category}`).then((json) =>
                setProducts(json.data))
        } else {
            axios(`${import.meta.env.VITE_BASE_URL}/products`).then((json) =>
                setProducts(json.data)
            );
        }

    }, [category]);


    return (
        <>
            <ItemListContainer products={products}></ItemListContainer>
        </>
    )
}

export default HomePage