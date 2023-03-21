import {Link} from 'react-router-dom'
import {Button, Breadcrumbs} from '@mui/material';
import { getUserInfo } from "../api";
import { useNavigate } from 'react-router-dom';
 const NavBar = ({token, setToken, isAdmin, setIsAdmin}) => {
   const navigate = useNavigate()
   function logOut(){ 
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        setIsAdmin(false)
        setToken('')
        navigate("/")
    }
    
return (
    <nav className="nav-links"> 
        <Breadcrumbs >
            <Link to='/'>Products</Link>
            {isAdmin && <Link to='Admin'>Admin</Link>}
            {!token && <Link to='Register'>Register</Link>}
            {!token && <Link to='Login'>Login</Link>}
            {token && <Button onClick={()=>logOut()}>Logout</Button>}
            
        </Breadcrumbs>
    </nav>
)
}

export default NavBar