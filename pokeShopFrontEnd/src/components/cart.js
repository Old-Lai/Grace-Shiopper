import { useState } from "react"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton, Badge, Menu, MenuItem, Button, Paper } from '@mui/material';
import { createCheckout } from "../api";

const Cart = ({token, cartItems, setCartItems})=> {
    const [itemCount, setItemCount] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    let total = 0
    cartItems.map(item=> total += item.count * item.dollarAmt)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null)
    }

    const checkout = async() => {
        console.log(cartItems)
        const products = cartItems.map(item=> {
            let product = {
                price:`${item.dollarAmt}00`,
                name:item.productName,
                quantity:`${item.count}`
            }
            return product
        }) 
        console.log(products)
        const response = await createCheckout(products)
        // console.log(response)

        // const products = [{price:"1000", name:"I work again!", quantity:"3000"}]
        localStorage.setItem("sessionId", response.session.id)
        window.location.replace(response.session.url)
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
                {!cartItems.length && <MenuItem>Nothing in the cart yet</MenuItem>}
                {cartItems && cartItems.map(item => {
                    return(
                        <MenuItem key={item.productId}>{`${item.productName}: Qty${item.count}`}</MenuItem>
                    )
                })}
                {cartItems.length? <MenuItem>{`Total: ${total}`}</MenuItem> : null}
                {cartItems.length? <Button onClick={()=>checkout()}>CheckOut</Button> : null}
            </Menu>
        </Badge>
    )
}

export default Cart