//database functions (calls to sql)
require('dotenv').config()
const { Client } = require('pg');
const client = new Client()

//db code stuff below
/*=========================================================
|                                                         |
|                   Product SQL                           |
|                                                         |
=========================================================*/
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
        const {rows:products} = await client.query(`
            SELECT *
            FROM products;
        `)

        return products
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



/*=========================================================
|                                                         |
|                   Shopping Cart SQL                     |
|                                                         |
=========================================================*/
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
        `, [id, products])

        return cart
    } catch(e) {
        throw e
    }
}

async function purchasedCart(cartId){
    try{
        const {rows:[cart]} = await client.query(`
            UPDATE shopping_carts
            SET "isPurchased"=true
            WHERE id=$1
            RETURNING *
        `, [id])

        return cart
    } catch(e) {
        throw e
    }
}

async function getCartById(id){
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
        const {rows:cart} = await client.query(`
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

async function getPurchasedCartByUserId(userId){
    try{
        const {rows:carts} = await client.query(`
            SELECT *
            FROM shopping_carts
            WHERE "userId"=$1
            AND "isPurchased"=true
        `,[userId])

        return carts
    } catch(e) {
        throw e
    }
}


/*=========================================================
|                                                         |
|                      User SQL                           |
|                                                         |
=========================================================*/
async function createUser({ username, password, email, isAdmin}) {
    try {
        if(isAdmin){
            isAdmin=true
        }
        const { rows: [ user ] } = await client.query(`
        INSERT INTO users(username, password, email, "isAdmin") 
        VALUES($1, $2, $3, $4) 
        ON CONFLICT (username) DO NOTHING 
        RETURNING *;
        `, [username, password, email, isAdmin]);

        //creates a default cart for every user
        const cart = await createShoppingCart(user.id)
        user.cart = cart
        delete user.password
        return user;
    } catch (error) {
    throw error;
    }
}

async function updateUser(id, fields = {}) {
    //prevents the user from updating user id
    delete fields.id
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

        if(user){
            const cart = await getShoppingCartByUserId(user.id)
            user.cart = cart
        }

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

      if(user){
        const cart = await getShoppingCartByUserId(user.id)
        user.cart = cart
      }
  
      return user;
    } catch (e) {
      throw e;
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
    getUserByEmail,
    createShoppingCart,
    updateShoppingCart,
    purchasedCart,
    getCartById,
    getShoppingCartByUserId,
    getPurchasedCartByUserId
}

