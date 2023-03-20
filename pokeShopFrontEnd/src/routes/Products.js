import { useState, useEffect } from "react";
import { fetchAllProducts } from "../api";
import ProductList from "../components/product";
import { useOutletContext } from "react-router-dom";
import { Grid, Box } from "@mui/material";

// import { loadStripe } from "@stripe/stripe-js"
// import { Elements } from "@stripe/react-stripe-js"

const Products = () => {
  const [products, setProducts] = useState([]);
  const { token } = useOutletContext();
  // const stripePromise = loadStripe('pk_test_51MnRIYDzleE3QpE2kWLpcKCnzr2ZwnsDnvORGENHdiKacDt6PgGI0ok8dO5uLeAOzYM1MTfGiFiJ0Cy5MJENtx3C00pKOzXP9m')
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
                console.log(product)
              return (
                // <Elements stripe={stripePromise}>
                  <ProductList product={product} token={token} />
                // </Elements>
              );
            })}
      </Box>
    </Box>
  );
};
  
export default Products;
