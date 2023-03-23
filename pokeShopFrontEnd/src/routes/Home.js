import {NavBar,Cart} from "../components"
import {Outlet} from 'react-router-dom'
import { useState } from "react"
import {Stack, Typography, Box} from '@mui/material/';

const Home = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isAdmin, setIsAdmin] = useState(false)
    const [cartItems, setCartItems] = useState([])
    console.log(cartItems)
    return (
        <div style={{ maxWidth: '100%', margin: '0 auto', padding: '16px' }}>
  <header style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <NavBar sx={{ flex: 1 }} isAdmin={isAdmin} token={token} setToken={setToken} setIsAdmin={setIsAdmin}/>
      <Box sx={{ margin: "0 auto", marginLeft: "18.2rem", maxWidth: "10%" }}>
        <img src={require('../final_banner.png')} height="100" alt="Logo" />
      </Box>
      <Cart sx={{ flex: 1 }} cartItems={cartItems} setCartItems={setCartItems}/>
    </Box>
  </header>
  <main>
    <Outlet context={{token, setToken, isAdmin, setIsAdmin, cartItems, setCartItems}}/>  
  </main>
</div>
)
}

export default Home