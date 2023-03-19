import { Card, CardContent, CardActions, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProductList = ({ product, token }) => {
  const { id, name, prodDes, dollarAmt, stockCount, image_url } = product;
 
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const addToCart = () => {};

  return (
    <Card
      sx={{
        margin:"5px",
        width: "400px",
        maxHeight: "280px",
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
            <Button sx={{ml:"250px"}}onClick={() => addToCart(id)} variant="contained">
              ADD TO CART
            </Button>
          </CardActions>
        </Box>
      )}
    </Card>
  );
};

export default ProductList
