import { useState, useEffect } from "react";
import { fetchAllProducts } from "../api";
import ProductList from "../components/product";
//import { useNavigate } from "react-router-dom";
import {useOutletContext} from 'react-router-dom';



const Products = () => {
    const [products, setProducts] = useState([]);
    const {token} = useOutletContext
    useEffect(() => {
        fetchAllProducts()
        .then((response) => {
            setProducts(response.products)
            console.log(response.products)
        })
    }, []);


    return (
        <div className="panel">
            <h1>Products</h1>
            {products && products.map(( product ) => 
            { return <ProductList product={product} token={token} />} )}
        </div>
    )
};

export default Products;