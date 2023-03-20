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
        shipping_options: [
            {
                shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {amount: 0, currency: 'usd'},
                display_name: 'Free shipping',
                delivery_estimate: {
                    minimum: {unit: 'business_day', value: 45},
                    maximum: {unit: 'business_day', value: 356},
                },
                },
            },
            {
                shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {amount: 3000000, currency: 'usd'},
                display_name: "I'm rich",
                delivery_estimate: {
                    minimum: {unit: 'hours', value: 1},
                    maximum: {unit: 'hours', value: 2},
                },
                },
            },
            ],
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
