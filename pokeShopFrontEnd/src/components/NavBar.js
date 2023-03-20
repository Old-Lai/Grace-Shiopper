import {Link} from 'react-router-dom'
import {Button, Breadcrumbs} from '@mui/material';
import { getUserInfo } from "../api";
 const NavBar = ({token, setToken, setIsAdmin}) => {
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
        </Breadcrumbs>
    </nav>
)
}

export default NavBar