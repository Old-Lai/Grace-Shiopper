import { useState } from "react";
import {
  Box,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { AddCircleOutlineOutlined } from "@mui/icons-material";

const AllUsersDisplay = ({ user, token }) => {
  const { id, username, email, isAdmin } = user;

  const [hoveredCard, setHoveredCard] = useState(false);

  async function makeAdmin() {
    // code to make user an admin goes here
  }

  return (
    <TableRow
      onMouseEnter={() => setHoveredCard(true)}
      onMouseLeave={() => setHoveredCard(false)}
    >
      <TableCell>{id}</TableCell>
      <TableCell>{username}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>
        {isAdmin ? (
          <Typography variant="body2" color="primary">
            Admin
          </Typography>
        ) : (
          <Typography variant="body2" color="textSecondary">
            User
          </Typography>
        )}
      </TableCell>
      <TableCell align="right">
        {hoveredCard && (
          <Tooltip title="Make admin">
            <IconButton onClick={makeAdmin}>
              <AddCircleOutlineOutlined color="primary" />
            </IconButton>
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
};

export default AllUsersDisplay;
