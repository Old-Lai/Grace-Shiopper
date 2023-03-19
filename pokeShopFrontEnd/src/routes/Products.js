import { useState, useEffect } from "react";
import { fetchAllProducts, getUserInfo } from "../api";
import ProductList from "../components/product";
import { useOutletContext } from "react-router-dom";
import { Grid, Box, Button } from "@mui/material";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken,] = useOutletContext();
  const [isAdmin, setIsAdmin] = useOutletContext()
  useEffect(() => {
    console.log("isAdmin changed:", isAdmin);
    fetchAllProducts().then((response) => {
      setProducts(response.products);
    });
  }, [isAdmin]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Products</h1>

      {isAdmin && (
        <Button variant="contained" color="primary" href="/add-product">
          Add Product
        </Button>
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {products &&
          products.map((product) => { 
            return (
              <ProductList key={product.id} product={product} token={token} />
            );
          })}
      </Box>
    </Box>
  );
};

export default Products;
