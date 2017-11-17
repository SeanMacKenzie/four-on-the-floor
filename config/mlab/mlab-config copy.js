var mongoose = require('mongoose')
var connectionString = "mongodb://<dbuser>:<dbpassword>@ds044709.mlab.com:44709/4onfloor"
var connection = mongoose.connection




mongoose.connect(connectionString, {
    useMongoClient: true,
    keepAlive: {socketOptions: {keepAlive: 300000, connectionTimeoutMS: 30000}}
})

connection.on('error', console.error.bind(console, 'connection error: '))

connection.once('open', ()=>{
    console.log('Connected to DataBase')
})