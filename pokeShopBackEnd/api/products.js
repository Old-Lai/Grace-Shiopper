const express = require('express');
const { getAllProducts } = require('../db');
const productsRouter = express.Router();

productsRouter.use((req, res, next) => {
  console.log("A request is being made to /products");
  next(); // Move this line before res.send()
  res.send({});
});

productsRouter.get('/', async (req, res, next) => {
  try{
    const products = await getAllProducts()
    res.send({products})
  } catch(e) {

  }
})

module.exports = productsRouter;