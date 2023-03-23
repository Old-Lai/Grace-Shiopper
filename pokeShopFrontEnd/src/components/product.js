import { IconButton, Card, CardContent, CardActions, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { createCheckout } from "../api";
import { Navigate, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = ({ product, token, isAdmin, cartItems, setCartItems}) => {
  const { id, name, prodDes, dollarAmt, stockCount, image_url } = product;
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMiniButtonHovered, setIsMiniButtonHovered] = useState(false);
  const addToCart = async() => {
    let newCartItems = [...cartItems]
    let item = newCartItems.find(item => item.productId === id)
    if(item){
      item.count = item.count + 1
    } else {
      newCartItems.push({
        productId:id, 
        productName:name,
        productDes:prodDes,
        dollarAmt,
        image_url,
        count:1
      })
    }
    setCartItems(newCartItems)
    // const products = [{price:"1000", name:"I work again!", quantity:"3000"}]
    // const response = await createCheckout(products)
    // console.log(response.session.id)
    // localStorage.setItem("sessionId", response.session.id)
    // window.location.replace(response.session.url)
  };
  const navigate = useNavigate()
  function handleProductPage() {
    navigate(`/${id}`);
  }
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    // Add code here to delete the product
    handleClose();
  };

  return (
    <Card
      sx={{
        margin:"5px",
        width: "400px",
        height: "280px",
        position: "relative",
        transition: "transform 0.5s, box-shadow 0.5s",
        boxShadow: isHovered
          ? "0px 10px 20px rgba(0,0,0,0.3), 0px 6px 6px rgba(0,0,0,0.2)"
          : "none",
        transform: isHovered
          ? "translate3d(0, -10px, 0)"
          : "translate3d(0, 0, 0)",
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
          <Box
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
                variant=""
                
              >
                VIEW PRODUCT
              </Button>
            ) : (
              <RemoveRedEyeIcon sx={{ marginRight: "30px",fontSize: '2rem', transform: 'scale(1.2)' }} />
            )}
          </Box>
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
         display: "flex",
         justifyContent: "flex-end",
         alignItems: "flex-end",
         position: "absolute",
         bottom: "0px",
         left: "0px",
         right: "0px",
       }}
     >
       <CardActions>
  {isAdmin && (
    <IconButton onClick={handleOpen}>
      <DeleteIcon />
    </IconButton>
  )}
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Delete Product</DialogTitle>
    <DialogContent>
      <Typography>Are you sure you want to delete this product?</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </DialogActions>
  </Dialog>
</CardActions>
       <CardActions>
         <Button onClick={() => addToCart()} variant="">
           ADD TO CART
         </Button>
       </CardActions>
     </Box>
      )}
    </Card>
  );
};

export default ProductList;
