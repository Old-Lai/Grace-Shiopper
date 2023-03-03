const express = require('express');
const productsRouter = express.Router();

productsRouter.use((req, res, next) => {
  console.log("A request is being made to /products");
  next(); // Move this line before res.send()
  res.send({});
});

module.exports = productsRouter;