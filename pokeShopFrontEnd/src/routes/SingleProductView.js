import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Box, Card, CardContent, CardActions, Button, Typography } from "@mui/material";
import { fetchProductById } from "../api";

const SingleProductView = () => {
  const [product, setProduct] = useState(null);
  const { productId} = useParams();
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const fetchedProduct = await fetchProductById(productId);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error(error);
      }
    };
    getProduct();
  }, [productId]);

  const handleAddToCart = () => {
    // add to cart functionality
  };    

  if (!product) {
    return <div>Loading...</div>;
  }
  console.log(product)
  const imageUrls = product.image_url.split(';');
  console.log(imageUrls)
  return (
   
    <Card
    sx={{
      margin: "0 auto",
      width: "400px",
      height: "400px",
      position: "relative",
      transition: "transform 0.5s, box-shadow 0.5s",
      boxShadow: isHovered
        ? "0px 10px 20px rgba(0,0,0,0.3), 0px 6px 6px rgba(0,0,0,0.2)"
        : "none",
      transform: isHovered ? "translate3d(0, -10px, 0)" : "translate3d(0, 0, 0)",
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <CardContent>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.prodDes}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {product.dollarAmt}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Stock: {product.stockCount}
        </Typography>
        <div>
          {imageUrls.map((url, index) => (
            <img key={index} src={url} alt="product" />
          ))}
        </div>
      </Box>
    </CardContent>
    <CardActions sx={{display:"flex", justifyContent:"flex-end"}}>
      <Button onClick={handleAddToCart} size="small">
        Add to Cart
      </Button>
    </CardActions>
  </Card>
    
    
  );
};

export default SingleProductView;
