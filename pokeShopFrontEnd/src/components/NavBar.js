import {Link} from 'react-router-dom'
import {Button, Breadcrumbs} from '@mui/material';
import { getUserInfo } from "../api";
 const NavBar = ({token, setToken, isAdmin, setIsAdmin}) => {
    console.log(token)
    function logOut(){ 
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        setIsAdmin(false)
        setToken('')
    }
    
return (
    <nav className="nav-links"> 
        <Breadcrumbs >
            <Link to='/'>Products</Link>
            {!token && <Link to='Register'>Register</Link>}
            {!token && <Link to='Login'>Login</Link>}
            {token && <Button onClick={()=>logOut()}>Logout</Button>}
            {isAdmin && <Link to='Admin'>Admin</Link>}
        </Breadcrumbs>
    </nav>
)
}

export default NavBar