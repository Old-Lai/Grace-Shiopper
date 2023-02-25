//database functions (calls to sql)
require('dotenv').config()
const { Client } = require('pg');
const client = new Client()

//db code stuff below
async function createUser({ username, password, email, isAdmin}) {
    try {
        const { rows: [ user ] } = await client.query(`
        INSERT INTO users(username, password, email, isAdmin) 
        VALUES($1, $2, $3, $4) 
        ON CONFLICT (username) DO NOTHING 
        RETURNING *;
        `, [username, password, email, isAdmin]);

    return user;
    } catch (error) {
    throw error;
    }
}



//export
module.exports = {
    client,
    createUser
}

