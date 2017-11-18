var express = require('express')
var server = express()
var bp = require('body-parser')
var DBConnect = require('./config/mlab/mlab-config')
var sessions = require('./auth/sessions')
var port = 3000

//route variables
var usertwoRoutes = require('./server/routes/user-routes')
var userRoutes = require('./auth/auth')
var postingRoutes = require('./server/routes/posting-routes')
var commentRoutes = require('./server/routes/comment-routes')

// wants to show burger and drinks and sides 1 request
var homeRoutes = require('./server/routes/home-routes')


//register Middleware
server.use(express.static(__dirname + '/public'))
server.use(bp.json())
server.use(bp.urlencoded({extended: true}))
server.use(sessions)

///register routes
server.use(userRoutes)

server.use(Authenticate)
server.use(postingRoutes)
server.use(commentRoutes)
server.use(usertwoRoutes)
function Authenticate(req,res,next){
    if(!req.session.uid){
        return res.status(401).send({error: 'You must login to continue'})
    }
    next()
}

server.listen(port, function(){
    console.log('Ready to rock on port: ', port)
})