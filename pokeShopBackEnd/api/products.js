const express = require('express');
const { createProduct } = require('../db');
const { getAllProducts } = require('../db');
const productsRouter = express.Router();

//get products
productsRouter.use((req, res, next) => {
  console.log("A request is being made to /products");
  next(); // Move this line before res.send()
  res.send({});
});

productsRouter.get('/', async (req, res, next) => {
  try{
    const products = await getAllProducts()
    res.send({products})
  } catch({name, message}) {
    next({name, message})
  }
})

//create products
productsRouter.post('/', async (req, res, next) => {
  try{
    if(!req.user){
      next({
        name:"Unauthorized",
        message:"you need to be logged in"
      })
    } else if(!req.user.isAdmin){
      next({
        name:"Unauthorized",
        message:"you need to be an admin to do this action"
      })
    }

    const { productName, productDescription, dolalrAmt, stockCount } = res.body
    
    //if they did not provide the essential data
    if(!productName || !productDescription || !dolalrAmt){
      next({
        name:"Missting Params",
        message:`Missing essential params`
      })
    }

    const product = await createProduct({prodName:productName, prodDes:productDescription, dolalrAmt, stockCount})

    res.send({product}) 
  } catch({name, message}) {
    next({name, message})
  }
})

module.exports = productsRouter;