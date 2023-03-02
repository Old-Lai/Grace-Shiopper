const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log("A request is being made to /cart");
    res.send({})
    next(); // THIS IS DIFFERENT
  });

module.exports = router;