import { useState, useEffect } from "react";
import {fetchAllUsers} from "../api";

import { useOutletContext } from "react-router-dom";
import { Grid, Box, Button } from "@mui/material";
import { NavBar, ProductList } from "../components";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken, isAdmin, setIsAdmin] = useOutletContext();
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetchAllProducts(token);
      setProducts(response.products)
    }
    fetchProducts();
  }, [token]);
  
  useEffect(() => {
    if(token) {
      getUserInfo(token).then((response) => {
        setIsAdmin(response.user.isAdmin ? response.user.isAdmin : false);
      });
    }
    
  }, [token]);
  
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Products</h1>
  
      {isAdmin && (
        <Button variant="contained" color="primary" href="/add-product">
          Add Product
        </Button>
      )}
  
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {products &&
          products.map((product) => {
            return <ProductList key={product.id} product={product} token={token} />;
          })}
      </Box>
    </Box>
  );
};

export default Products;