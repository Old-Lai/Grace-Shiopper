require('dotenv').config()
const express = require("express");
const stripeRouter = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const DOMAIN = 'http://localhost:3000/'; //change this when deploy

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
                    minimum: {unit: 'month', value: 1},
                    maximum: {unit: 'month', value: 3},
                },
                },
            },
            {
                shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {amount: 3000000, currency: 'usd'},
                display_name: "I'm rich",
                delivery_estimate: {
                    minimum: {unit: 'hour', value: 1},
                    maximum: {unit: 'hour', value: 2},
                },
                },
            },
            ],
        line_items,
        mode: 'payment',
        success_url: `${DOMAIN}`,
        cancel_url: `${DOMAIN}`,
        }); 

        res.send({session})
    } catch({name, message}){
        next({name, message})
    }
})

stripeRouter.post('/getStatus', async (req, res, next) => {
    try{
        const { sessionId } = req.body
        if(!sessionId){
            req.send({
                error:"Id error",
                message:"Session id is not defined or incorrect."
            })
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId)

        return session
    } catch({name, message}) {

    }
})

module.exports = stripeRouter
