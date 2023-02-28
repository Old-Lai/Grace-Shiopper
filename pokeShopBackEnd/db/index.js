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
async function createProduct () {

}

async function updateUser(id, fields = {}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    if (setString.length === 0) {
    return;
    }

    try {
        const { rows: [ user ] } = await client.query(`
            UPDATE users
            SET ${ setString }
            WHERE id=${ id }
            RETURNING *;
        `, Object.values(fields));

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
async function connect () {
    await client.connect();
    const testOne = await createUser({username:"testName", password:"blahhh", email:"123@gmail.com", isAdmin: true});
    console.log(testOne)
}
connect();

//export
module.exports = {
    client,
    createUser,
    updateUser,
    getUserByUsername
}

