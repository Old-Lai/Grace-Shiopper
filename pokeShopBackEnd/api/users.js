const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { createUser, updateUser, getUserByUsername } = require("../db");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  next(); // THIS IS DIFFERENT
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, email } = req.body;
  console.log(req.body)
  try {
    if (!username || !password || !email) {
      next({
        name: "MissingParams",
        message: "Something is missing",
      });
    } else {
      const _user = await getUserByUsername(username);

      if (_user) {
        next({
          name: "UserExistsError",
          message: "A user by that username already exists",
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

        res.send({ message: "Thank you for signing up!", token });
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

        res.send({ message: "You're logged in!", token });
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
