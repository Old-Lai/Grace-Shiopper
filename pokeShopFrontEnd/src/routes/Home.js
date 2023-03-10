import React from "react"
import NavBar from "../components/NavBar"
import {Outlet} from 'react-router-dom'
import { useState } from "react"
const Home = () => {
    const [token, setToken] = useState(localStorage.getItem("saved_token"));
    return (
    <div>
        <header>
            <NavBar token = {token} setToken = {setToken}/>
        </header>
        <main>
            <Outlet context={[token, setToken]}/>
        </main>
    </div>
    
    
)

}

export default Home