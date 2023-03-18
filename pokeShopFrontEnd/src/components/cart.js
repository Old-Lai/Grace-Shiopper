import { useState } from "react"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton, Popper, Badge } from '@mui/material';
const Cart = ()=> {
    const [itemCount, setItemCount] = useState(0)
    const [products, setProducts] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    return(
        <Badge badgeContent={itemCount} color="primary" sx={{margin:"1vh 1.5vw 0 0"}}>
            <IconButton>
                <ShoppingCartIcon color="action" sx={{margin:"-5px -5px 0 0"}}/>
            </IconButton>
            <Popper

            >

            </Popper>
        </Badge>
    )
}

export default Cart