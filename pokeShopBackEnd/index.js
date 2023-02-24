const { client } = require("./db")

client.connect((err) => {
    //to show if client successfully connected
    if(err){
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
})