import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Card, CardContent, CardActions, Button, Typography, Box } from "@mui/material";
import {AllUsersDisplay} from "../components"

const Admin = () => {
    
  return (
    <div>
      <div>Admin</div>
      <Box>
        <AllUsersDisplay/>
      </Box>
    </div>
  );
};

export default Admin;