import {Link} from 'react-router-dom'
import {Button, Breadcrumbs} from '@mui/material';

 const NavBar = ({token, setToken}) => {
    function logOut(){ 
        localStorage.removeItem('username')
        localStorage.removeItem('saved_token')
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