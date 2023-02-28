//database functions (calls to sql)
require('dotenv').config()
const { Client } = require('pg');
const client = new Client()

//db code stuff below
async function createProduct({productName, productDes, dollarAmt, stockCount}){
        try{
            const {rows:[product]} = await client.query(`
                INSERT INTO products(name, prodDes, dollarAmt, stockCount)
                VALUES($1, $2, $3, $4)
                ON CONFLICT DO NOTHING
                RETURNING *;
            `,[productName, productDes, dollarAmt, stockCount])

            return product
        } catch(e) {
            throw e
        }
}

//export
module.exports = {
    client,
}