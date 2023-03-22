import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardActions, Button, Typography } from "@mui/material";
import { fetchProductById } from "../api";

const SingleProductView = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

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

  return (
    <Card sx={{ width: "500px" }}>
      <CardContent>
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
      </CardContent>
      <CardActions>
        <Button onClick={handleAddToCart} size="small">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default SingleProductView;
