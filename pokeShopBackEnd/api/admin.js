const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../db");


// Admin route to get all users
router.get("/users",  async (req, res, next) => {
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
