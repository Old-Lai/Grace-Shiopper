const express = require('express');
const { getProductById } = require('../db');
const { updateProduct } = require('../db');
const { createProduct } = require('../db');
const { getAllProducts } = require('../db');
const productsRouter = express.Router();

//get products
productsRouter.use((req, res, next) => {
  console.log("A request is being made to /products");
  next();
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
    } else if(!req.user.isadmin){
      next({
        name:"Unauthorized",
        message:"you need to be an admin to do this action"
      })
    }

    const { productName, productDescription, dollarAmt, stockCount } = req.body
    //if they did not provide the essential data
    if(!productName || !productDescription || !dollarAmt){
      next({
        name:"Missting Params",
        message:`Missing essential params${!productName ? ", 'productName'" : ''}${!productDescription ? ", 'productDescription'" : ''}${!dollarAmt ? ", 'dolalrAmt'" : ''}`
      })
    }

    const product = await createProduct({prodName:productName, prodDes:productDescription, dollarAmt, stockCount})

    res.send({product}) 
  } catch({name, message}) {
    next({name, message})
  }
})

productsRouter.post('/:productId', async (req,res,next) => {
  try{
    if(!req.user){
      next({
        name:"Unauthorized",
        message:"you need to be logged in"
      })
    } else if(!req.user.isadmin){
      next({
        name:"Unauthorized",
        message:"you need to be an admin to do this action"
      })
    }

    const productId = req.params.productId
    const _product = await getProductById(productId)
    console.log(productId, _product)
    if(!_product){
      next({
        name:"Incorrect id",
        message:"No product of that id can be found"
      })
    }
    const { productName, productDescription, dollarAmt, stockCount } = req.body
    //if they did not provide the essential data
    const product = await updateProduct(productId, {name:productName, proddes:productDescription, dollaramt:dollarAmt, stockcount:stockCount})
    
    res.send({
      product
    })
  } catch({name, message}){
    next({
      name,
      message
    })
  }
})
module.exports = productsRouter;