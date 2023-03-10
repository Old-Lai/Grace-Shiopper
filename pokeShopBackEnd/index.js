const { client } = require("./db")
const PORT = process.env.port || 3000;
const express = require('express');
const server = express();
const apiRouter = require('./api');
const morgan = require('morgan');
const cors = require('cors')

server.use(morgan('dev'));  
server.use(express.json())

server.use(cors())

server.use('/api/', apiRouter);

client.connect((err) => {
    //to show if client successfully connected
    if(err){
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
})

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});

