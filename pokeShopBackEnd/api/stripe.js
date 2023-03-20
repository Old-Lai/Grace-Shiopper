require('dotenv').config()
const express = require("express");
const stripeRouter = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const DOMAIN = 'https://pokefeud-backend.onrender.com/api/stripe'; //change this when deploy

stripeRouter.post('/checkout', async (req, res, next) => {
    try{
        const { products } = req.body
        if(!products){
            res.send({});
        }

        const line_items = products.map(product => {
            const price_data = {
                currency: "usd",
                unit_amount: product.price,
                product_data: {
                    name: product.name
                }
            }
            const quantity = product.quantity
            return {
                price_data, 
                quantity
            }
        })
        const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `${DOMAIN}/checkout?success=true`,
        cancel_url: `${DOMAIN}/checkout?canceled=true`,
        }); 

        res.send({session})
    } catch({name, message}){
        next({name, message})
    }
})

module.exports = stripeRouter
