const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
require('dotenv').config()
const { JWT_SECRET } = process.env;
const seed = require('../db/seed')

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) { // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }

  next();
});

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const cartRouter = require('./shoppingCart');
const { getUserByUsername } = require('../db');
apiRouter.use('/cart', cartRouter);

apiRouter.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message
  });
});

(async () => {
  try {
    const _admin = getUserByUsername("admin")
    if(!_admin){
      await seed(); // Assuming seed function is imported
    console.log("Database seeding complete!");
    }
  } catch (e) {
    console.error('Error seeding database!!!');
    console.error(e);
  }
})();
module.exports = apiRouter;
