import { IconButton, Card, CardContent, CardActions, Button, Typography, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { createCheckout } from "../api";
import { Navigate, useNavigate } from "react-router-dom";

const ProductList = ({ product, token }) => {
  const { id, name, prodDes, dollarAmt, stockCount, image_url } = product;

  const [isHovered, setIsHovered] = useState(false);
  const [isMiniButtonHovered, setIsMiniButtonHovered] = useState(false);
  const addToCart = async() => {
    const products = [{price:"1000", name:"I work again!", quantity:"3000"}]
    const response = await createCheckout(products)
    window.open(response.session.url)

  };
  const navigate = useNavigate()
  function handleProductPage() {
    navigate(`/${id}`);
  }
  return (
    <Card
      sx={{
        margin:"5px",
        width: "400px",
        height: "280px",
        position: "relative",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between"
        }}>
          <h2>{name}</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "right"
          }}
        >
          <IconButton
            sx={{ borderRadius: '50%', p: 0, m: 1 }}
            onMouseEnter={() => setIsMiniButtonHovered(true)}
            onMouseLeave={() => setIsMiniButtonHovered(false)}
            onClick={handleProductPage}
          >
            {isMiniButtonHovered ? (
              <Button 
                sx={{
                  borderRadius: '1  0%',
                  width: "100px",
                  height: "40px",
                  display: "flex",
                  alignItems: "right",
                  justifyContent: "center"
                }}
                variant="contained"
                
              >
                VIEW PRODUCT
              </Button>
            ) : (
              <AddIcon sx={{ marginRight: "30px",fontSize: '2rem', transform: 'scale(1.2)' }} />
            )}
          </IconButton>
        </div>
        </Box>
        <h4>Description: {prodDes}</h4>
        <h4>Price: {dollarAmt}</h4>
        <Typography sx={{ margin: "10px" }}>Stock: {stockCount}</Typography>
      </CardContent>
      {isHovered && (
        <Box
          key={id} 
          sx={{
            position: "absolute",
            bottom: "0px",
            left: "0px",
            right: "0px",
          }}
        >
          <CardActions>
            <Button sx={{ml:"250px"}} onClick={() => addToCart()} variant="contained">
              ADD TO CART
            </Button>
          </CardActions>
        </Box>
      )}
    </Card>
  );
};

export default ProductList;
