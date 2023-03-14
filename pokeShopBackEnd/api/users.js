const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { createUser, getUserByUsername, getUserByEmail} = require("../db");

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    if (!username) {
      next({
        name: "MissingParams",
        message: "Username is missing",
      });
    } else if (!password) {
      next({
        name: "MissingParams",
        message: "Password is missing",
      });
    } else if (!email) {
      next({
        name: "MissingParams",
        message: "Email is missing",
      });
    } else {
      const _user = await getUserByUsername(username);
      const _email = await getUserByEmail(email)
      if (_user) {
        next({
          name: "UserExistsError",
          message: "A user by that username already exists",
        });
      } else if (_email) {
        next({
          name: "UserExistsError",
          message: "A user by that email already exists",
        });
      } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await createUser({ 
          username,
          password: hashedPassword,
          email,
        });

        const token = jwt.sign(
          { id: user.id, username: user.username },
          process.env.JWT_SECRET
        );

        res.send({ message: "Thank you for signing up!", token, user});
      }
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      next({
        name: "UserNotFoundError",
        message: "User not found",
      });
    } else {
      const passwordMatches = await bcrypt.compare(password, user.password);

      if (passwordMatches) {
        const token = jwt.sign(
          { id: user.id, username: user.username },
          process.env.JWT_SECRET
        );
        
        delete user.password
        res.send({ message: "You're logged in!", token, user });
      } else {
        next({
          name: "IncorrectCredentialsError",
          message: "Username or password is incorrect",
        });
      }
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
