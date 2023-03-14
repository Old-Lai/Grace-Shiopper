import {Link} from 'react-router-dom'

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';

 const NavBar = ({token, setToken}) => {
    function logOut(){ 
        localStorage.removeItem('username')
        localStorage.removeItem('saved_token')
        setToken('')
    }

return (
    <nav className="nav-links">
        <Breadcrumbs >
            <Link to='/'>Home</Link>
            <Link to='Products'>Products</Link>
            {!token && <Link to='Register'>Register</Link>}
            {!token && <Link to='Login'>Login</Link>}
            {token && <Button onClick={()=>logOut()}>Logout</Button>}
        </Breadcrumbs>
    </nav>
)
}

export default NavBar