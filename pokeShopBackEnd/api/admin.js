const express = require("express");
const adminRouter = express.Router();
const { getAllUsers } = require("../db");

adminRouter.use((req, res, next) => {
    console.log("A request is being made to /admin");
    next();
  });
// Admin route to get all users
adminRouter.get("/users",  async (req, res, next) => {
  try {
    if(!req.user){
        res.send({
          error:"Unauthorized",
          message:"you need to be logged in"
        })
      } else if(!req.user.isAdmin){
        res.send({
          error:"Unauthorized",
          message:"you need to be an admin to do this action"
        })
      }
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
