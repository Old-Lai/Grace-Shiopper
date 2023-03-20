import { Card, CardContent, CardActions, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProductList = ({ product, token }) => {
  const { _id, name, prodDes, dollarAmt, stockCount, image_url } = product;
  // console.log(product)
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const addToCart = () => {};

  return (
    <Card
      sx={{
        margin:"5px",
        width: "400px",
        height: "280px",
        position: "relative",
      }}
      onMouseEnter={() => setHoveredCard(_id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <CardContent>
        <h2>{name}</h2>
        <h4>Description: {prodDes}</h4>
        <h4>Price: {dollarAmt}</h4>
        <Typography sx={{ margin: "10px" }}>Stock: {stockCount}</Typography>
      </CardContent>
      {hoveredCard === _id && (
        <Box
          sx={{
            position: "absolute",
            bottom: "0px",
            left: "0px",
            right: "0px",
          }}
        >
          <CardActions>
            <Button sx={{ml:"250px"}}onClick={() => addToCart(_id)} variant="contained">
              ADD TO CART
            </Button>
          </CardActions>
        </Box>
      )}
    </Card>
  );
};

export default ProductList
