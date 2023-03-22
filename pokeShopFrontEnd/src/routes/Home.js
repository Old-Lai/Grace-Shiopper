import {NavBar,Cart} from "../components"
import {Outlet} from 'react-router-dom'
import { useState } from "react"

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const Home = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isAdmin, setIsAdmin] = useState(false)
    const [cartItems, setCartItems] = useState([])
    console.log(cartItems)
    return (
        <div>
            <header>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={2}  alignItems="center">
                        <Typography margin={1} variant="h6" gutterBottom>Pokefeud</Typography>
                        <NavBar token = {token} setToken = {setToken} isAdmin = {isAdmin} setIsAdmin = {setIsAdmin}/>
                    </Stack>
                    <Cart token={token} cartItems={cartItems}/>
                </Stack>
            </header>
            <main>
            <Outlet context={{token, setToken, isAdmin, setIsAdmin, cartItems, setCartItems}}/>
            </main>
        </div>
    )

}

export default Home