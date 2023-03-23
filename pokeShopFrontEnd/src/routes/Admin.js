import { useState, useEffect } from "react";
import { fetchAllUsers } from "../api";
import { useOutletContext, useNavigate } from "react-router-dom";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box, Typography, Paper } from "@mui/material";
import { AllUsersDisplay } from "../components";

const Admin = () => {
  const {token, setToken, isAdmin, setIsAdmin} = useOutletContext();
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate()
  console.log(isAdmin)

  useEffect(() => {
    async function fetchUsers() {
      if(isAdmin) { 
        const response = await fetchAllUsers(token);
        setAllUsers(response.users)
      } 
    }
    fetchUsers();
  }, [token]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h4" sx={{ marginBottom: "20px", margin: "auto" }}>
        Users Panel
      </Typography>
      <TableContainer component={Paper} sx={{ width: "50%" }}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "25%" }}>ID</TableCell>
              <TableCell sx={{ width: "25%" }}>Username</TableCell>
              <TableCell sx={{ width: "25%" }}>Email</TableCell>
              <TableCell sx={{ width: "25%" }}>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers &&
              allUsers.map((user) => {
                return (
                  <AllUsersDisplay user={user} token={token} key={user.id} />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Admin;
