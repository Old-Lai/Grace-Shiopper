const {
    client,
    createUsers
} = require("./index")

async function dropTables() {
    try{
        console.log("Starting to drop tables...")

        await client.query(`
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS shopping_carts;
            DROP TABLE IF EXISTS users;
        `)

        console.log("Finished dropping tables!")
    } catch(e) {
        console.error("Error dropping tables!!!")
        throw e;
    }
}

async function createTables() {
    try{
        console.log("Starting to build tables...")
        
        await client.query(`
            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                isAdmin BOOLEAN DEFAULT false
            );

            CREATE TABLE shopping_carts(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                "productList" VARCHAR(255)
            );

            CREATE TABLE products(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                prodDes VARCHAR(255) NOT NULL,
                dollarAmt FLOAT NOT NULL,
                stockCount INTEGER DEFAULT 0
            );
        `)

        console.log("Finished building tables!")
    } catch(e) {
        console.error("Error building tables!!!")
        throw e
    }
}

async function insertInitialData(){
    try{
        console.log("Starting to insert initial datas...")
    
        await createUser

        console.log("Finished inserting initial datas!")
    } catch(e) {
        console.error("Error inserting initial data!!!")
        throw e
    }
}