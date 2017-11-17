let session = require('express-session');
let MongoDBStore = require('connect-mongodb-session')(session);
var connectionString = "mongodb://4onfloor:floor4@ds044709.mlab.com:44709/4onfloor"

let store = new MongoDBStore(
	{
		uri: connectionString,
		collection: 'Sessions'
	});

// Catch errors 
store.on('error', function (error) {
	console.error(error);
});

module.exports = session({
	secret: 'What type of dog is this',
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
	},
	store: store,
	resave: true,
	saveUninitialized: true
})