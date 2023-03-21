import { useState } from "react"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton, Badge, Menu, MenuItem } from '@mui/material';
const Cart = ()=> {
    const [itemCount, setItemCount] = useState(0)
    const [products, setProducts] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null)
    }

    

    return(
        <Badge badgeContent={itemCount} color="primary" sx={{margin:"1vh 1.5vw 0 0"}}>
            <IconButton
                id="cart-button"
                aria-controls={open ? 'cart-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <ShoppingCartIcon color="action" sx={{margin:"-5px -5px 0 0"}}/>
            </IconButton>
            <Menu
                id="cart-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby':"cart-button"
                }}
            >
                <MenuItem>Nothing in the cart yet</MenuItem>
            </Menu>
        </Badge>
    )
}

export default Cart