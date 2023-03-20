import { useState, useEffect } from "react";
import { fetchAllProducts } from "../api";
import ProductList from "../components/product";
import { useOutletContext } from "react-router-dom";
import { Grid, Box } from "@mui/material";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { token } = useOutletContext();
  useEffect(() => {
    fetchAllProducts().then((response) => {
      setProducts(response.products);
      console.log(response.products);
    });
  }, []);

  return (
    <Box sx={{
      display:"flex",
      flexDirection:"column",
      alignItems:"center"
    }}>
      <h1>Products</h1>
      <Box sx={{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"center"
      }}>
        {products &&
          products.map((product) => {
            // console.log(product)
            return (
                <ProductList product={product} token={token} />
            );
          })}
      </Box>
    </Box>
  );
};
  
export default Products;
