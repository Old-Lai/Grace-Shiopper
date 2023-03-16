import { useState, useEffect } from "react";
import { fetchAllProducts } from "../api";
import ProductList from "../components/product";
//import { useNavigate } from "react-router-dom";



const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        Promise.all([fetchAllProducts()])
        .then((response) => {
            setProducts(products)
            console.log(response)
        })
    }, []);


    return (
        <div className="panel">
            <h1>Products</h1>
            {/* {products && products.map(( product ) => 
            {<ProductList product={product} />} )} */}
            
        </div>
    )
};

export default Products;