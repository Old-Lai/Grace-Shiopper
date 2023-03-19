const express = require("express");
const adminRouter = express.Router();
const { getAllUsers } = require("../db");

adminRouter.get("/users", async (req, res, next) => {
    try {
      if(!req.user){
        return res.status(401).json({
          error:"Unauthorized",
          message:"you need to be logged in"
        });
      } else if(!req.user.isAdmin){
        return res.status(401).json({
          error:"Unauthorized",
          message:"you need to be an admin to do this action"
        });
      }
      const users = await getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  });
  
  module.exports = adminRouter;
