var router = require('express').Router()
var Users = require('../models/user')


router.get('/api/users', (req, res, next)=>{
    Users.find({})
        .then(users =>{
            res.send(users)
        })
        .catch(err =>{
            res.status(400).send({Error: err})
        })
})
