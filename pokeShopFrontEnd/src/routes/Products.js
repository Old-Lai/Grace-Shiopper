import { useState, useEffect } from "react";
import { fetchAllProducts } from "../api";
import ProductList from "../components/product";
import { useOutletContext } from "react-router-dom";
import { Box, Grid } from "@mui/material";

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
    <div className="panel">
      <h1>Products</h1>
      <Grid container spacing={3}>
        {products &&
          products.map((product) => {
              console.log(product)
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <ProductList product={product} token={token} />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};
  
export default Products;
