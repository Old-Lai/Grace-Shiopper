const bcrypt = require('bcrypt');
const { client } = require("./index.js")
async function dropTables() {
  try {
    console.log('Starting to drop tables...');

    await client.query(`
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS shopping_carts;
      DROP TABLE IF EXISTS users;
    `);

    console.log('Finished dropping tables!');
  } catch (e) {
    console.error('Error dropping tables!!!');
    throw e;
  }
}

async function createTables() {
  try {
    console.log('Starting to build tables...');

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
        "productList" VARCHAR(255),
        "isPurchased" BOOLEAN DEFAULT false
      );

      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        prodDes VARCHAR(255) NOT NULL,
        dollarAmt FLOAT NOT NULL,
        stockCount INTEGER DEFAULT 0
      );
    `);

    console.log('Finished building tables!');
  } catch (e) {
    console.error('Error building tables!!!');
    throw e;
  }
}

async function insertInitialData() {
  try {
    console.log('Starting to insert initial data...');

    const hashedPassword = await bcrypt.hash('admin123', 10);

    await client.query(`
      INSERT INTO users (username, password, email, isAdmin)
      VALUES ('admin', '${hashedPassword}', 'admin@example.com', true);
    `);
    
    console.log('Finished inserting initial data!');
  } catch (e) {
    console.error('Error inserting initial data!!!');
    throw e;
  }
}

async function seed() {
  try {
    await dropTables();
    await createTables();
    await insertInitialData();
    console.log('Database seeded successfully!');
  } catch (e) {
    console.error('Error seeding database!!!');
    throw e;
  }
}

module.exports = seed;
