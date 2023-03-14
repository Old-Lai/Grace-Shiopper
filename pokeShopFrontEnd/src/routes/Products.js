/* import React from "react";


const products = () => (
    <h1>products page</h1>
);

export default products; */

import { useState, useEffect } from "react";
import { fetchAllProducts } from "../api";
import ProductList from "../utils/AllProducts";
//import { useNavigate } from "react-router-dom";



const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        Promise.all([fetchAllProducts()])
        .then(([products]) => {
            setProducts(products)
        })
    }, []);


    return (
        <div className="panel">
            <h1>Products</h1>
            <ProductList products={products} />
        </div>
    )
};

export default Products;