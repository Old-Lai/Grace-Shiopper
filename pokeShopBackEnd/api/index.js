const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { getUserByUsername } = require('../db');
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
      const { username } = jwt.verify(token, JWT_SECRET);
      if (username) {
        req.user = await getUserByUsername(username);
        next();
      }
    } catch ({ error, name, message }) {
      next({ error, name, message });
    }
  } else {
    res.send({
      error: 'AuthorizationHeaderError',
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

const usersRouter = require('/users');
apiRouter.use('/users', usersRouter); 

const productsRouter = require('/products');
apiRouter.use('/products', productsRouter);

const cartRouter = require('/shoppingCart');
apiRouter.use('/cart', cartRouter);

const adminRouter = require('/admin')
apiRouter.use('/admin', adminRouter)

const stripeRouter = require('/stripe')
apiRouter.use('/stripe', stripeRouter)

apiRouter.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message
  });
});

(async () => {
  try {
    const _admin = await getUserByUsername("admin")
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
