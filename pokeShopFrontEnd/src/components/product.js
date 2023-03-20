import { Card, CardContent, CardActions, Button, Typography, Box } from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createCheckout } from "../api";
// import { useStripe } from "@stripe/react-stripe-js"

const ProductList = ({ product, token }) => {
  const { _id, name, prodDes, dollarAmt, stockCount, image_url } = product;

  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const addToCart = async() => {
    console.log(product)
    const products = [{price:"1000", name:"I work again!", quantity:"3000"}]
    const response = await createCheckout(products)
    console.log(response.session.url)
    window.open(response.session.url)
  };

  return (
    <Card
      sx={{
        margin:"5px",
        width: "400px",
        height: "280px",
        position: "relative",
      }}
      onMouseEnter={() => setHoveredCard(id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <CardContent>
        <h2>{name}</h2>
        <h4>Description: {prodDes}</h4>
        <h4>Price: {dollarAmt}</h4>
        <Typography sx={{ margin: "10px" }}>Stock: {stockCount}</Typography>
      </CardContent>
      {hoveredCard === id && (
        <Box
        key={product.id} 
          sx={{
            position: "absolute",
            bottom: "0px",
            left: "0px",
            right: "0px",
          }}
        >
          <CardActions>
            <Button sx={{ml:"250px"}}onClick={() => addToCart()} variant="contained">
              ADD TO CART
            </Button>
          </CardActions>
        </Box>
      )}
    </Card>
  );
};

export default ProductList
