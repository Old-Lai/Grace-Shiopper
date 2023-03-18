import { useState } from "react"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton, Popper, Badge } from '@mui/material';
const Cart = ()=> {
    const [itemCount, setItemCount] = useState(0)
    const [products, setProducts] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return(
        <Badge badgeContent={itemCount} color="primary" sx={{margin:"1vh 1.5vw 0 0"}}>
            <IconButton>
                <ShoppingCartIcon color="action" sx={{margin:"-5px -5px 0 0"}}/>
            </IconButton>
            <Popper
                open={open}
            >

            </Popper>
        </Badge>
    )
}

export default Cart