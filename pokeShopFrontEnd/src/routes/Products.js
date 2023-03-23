import { useState, useEffect } from "react";
import { fetchAllProducts, getUserInfo } from "../api";

import { useOutletContext } from "react-router-dom";
import { Grid, Box, Button, Container } from "@mui/material";
import { NavBar, ProductList } from "../components";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken, isAdmin, setIsAdmin] = useOutletContext();
  const [visibleProducts, setVisibleProducts] = useState(4);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetchAllProducts();
      setProducts(response.products)
    }
    fetchProducts();
  }, [token]);

  useEffect(() => {
    if(token) {
      getUserInfo(token).then((response) => {
        setIsAdmin(response.user.isAdmin);
      });
    }
  }, [token]);

  const handleSeeMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 4);
  };

  const handleSeeLess = () => {
    setVisibleProducts(4);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1>Products</h1>

        {isAdmin && (
          <Button variant="contained" color="primary" href="/add-product">
            Add Product
          </Button>
        )}

        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {products &&
            products.slice(0, visibleProducts).map((product) => {
              return (
                <ProductList product={product} token={token} key={product.id} isAdmin={isAdmin}/>
              );
            })}
        </Box>

        {products.length > 4 && visibleProducts !== products.length && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
            <Button variant="contained" color="primary" onClick={handleSeeMore}>
              See More
            </Button>
          </Box>
        )}

        {visibleProducts > 4 && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
            <Button variant="outlined" color="primary" onClick={handleSeeLess}>
              See Less
            </Button>
          </Box>
        )}

      </Box>
    </Container>
  );
};

export default Products;
