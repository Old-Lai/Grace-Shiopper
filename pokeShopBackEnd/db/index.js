//database functions (calls to sql)
require('dotenv').config()
const { Client } = require('pg');
const client = new Client()

//db code stuff below
async function createProduct({prodName, prodDes, dollarAmt, stockCount, isListed}){
        try{
            const {rows:[product]} = await client.query(`
                INSERT INTO products(name, "prodDes", "dollarAmt", "stockCount", "isListed")
                VALUES($1, $2, $3, $4, $5)
                ON CONFLICT DO NOTHING
                RETURNING *;
            `,[prodName, prodDes, dollarAmt, stockCount, isListed])

            return product
        } catch(e) {
            throw e
        }
}

async function updateProduct(productId, fields = {}){
    const {prodName, prodDes, dollarAmt, stockCount, isListed} = fields;

    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ')

    try{
        if(!setString.length){
            return {}
        }

        const {rows:[product]} = await client.query(`
            UPDATE products
            SET ${ setString }
            WHERE id=${productId}
            RETURNING *;
        `, Object.values(fields))

        return product
    } catch(e) {
        throw e
    }
}

async function getAllProducts(){
    try{
        const {rows} = await client.query(`
            SELECT *
            FROM products;
        `)

        return rows
    } catch(e) {
        throw e
    }
}

async function getProductById(productId){
    try{
        const {rows:[product]} = await client.query(`
            SELECT *
            FROM products
            WHERE id=$1;
        `,[productId])

        return product
    } catch(e) {
        throw e
    }
}

async function createShoppingCart(userId){
    try{
        const {rows:[cart]} = await client.query(`
            INSERT INTO shopping_carts("userId")
            VALUES($1)
            RETURNING *
        `, [userId])

        return cart
    } catch(e) {
        throw e
    }
}

async function updateShoppingCart({id, productsList}){
    try{
        const {rows:[cart]} = await client.query(`
            UPDATE shopping_carts
            SET "productsList"=$2
            WHERE id=$1
            RETURNING *
        `, {id, products})

        return cart
    } catch(e) {
        throw e
    }
}

async function getShoppingCartById(id){
    try{
        const {rows:[cart]} = await client.query(`
            SELECT *
            FROM shopping_carts
            WHERE id=$1
        `, [id])

        return cart
    } catch(e) {
        throw e
    }
}

//returns the one shopping cart under user that is not purchased yet
async function getShoppingCartByUserId(userId){
    try{
        const {rows:[cart]} = await client.query(`
            SELECT *
            FROM shopping_carts
            WHERE "userId"=$1
            AND "isPurchased"=false
        `, [userId])

        return cart
    } catch(e) {
        throw e
    }
}

async function createUser({ username, password, email, isAdmin}) {
    try {
        const { rows: [ user ] } = await client.query(`
        INSERT INTO users(username, password, email, "isAdmin") 
        VALUES($1, $2, $3, $4) 
        ON CONFLICT (username) DO NOTHING 
        RETURNING *;
        `, [username, password, email, isAdmin]);

        delete user.password
        return user;
    } catch (error) {
    throw error;
    }
}

async function updateUser(id, fields = {}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    if (setString.length === 0) {return;}

    try {
        const { rows: [ user ] } = await client.query(`
            UPDATE users
            SET ${ setString }
            WHERE id=${ id }
            RETURNING *;
        `, Object.values(fields))

        delete user.password
        return user;
    } catch (error) {
    throw error;
    }
}

async function getUserByUsername(username) {
    try {
      const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE username=$1;
      `, [username]);
  
      return user;
    } catch (error) {
      throw error;
    }
}

async function getAllUsers() {
    try {
        const { rows } = await client.query(`
            SELECT id, username, email, isAdmin
            FROM users;
        `);

        return rows;
    } catch (error) {
        throw error;
    }
}

async function getUserByEmail(email) {
    try {
      const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE email=$1;
      `, [email]);

      return user;
    } catch (error) {
      throw error;
    }
}

//export
module.exports = {
    client,
    createProduct,
    updateProduct,
    getAllProducts,
    getProductById,
    createUser,
    updateUser,
    getUserByUsername,
    getAllUsers,
    getUserByEmail
}

