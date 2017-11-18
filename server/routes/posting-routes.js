var Comments = require('../models/comment')
var Postings = require('../models/posting')
var router = require('express').Router()
var Users = require('../models/user')


router.get('/api/postings', (req, res, next) => {
    Postings.find({})
        .then(postings => {
            res.send(postings)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.get('/api/postings/:id', (req, res, next) => {
    Postings.findById(req.params.id)
        .then(posting => {
            res.send(posting)
                .then(postings => {
                    Users.findById(posting.userId, 'username')
                        .then(user => {
                            Postings.username = username
                        }).catch(err => {
                            res.status(400).send({ Error: err })
                        })
                }).catch(err => {
                    res.status(400).send({ Error: err })
                })
        }).catch(err => {
            res.status(400).send({ Error: err })
        })
})

router.post('/api/postings', (req, res, next) => {
    Postings.create(req.body)
        .then(posting => {
            if (posting.userId.toString() == req.session.uid) {

                let response = {
                    data: posting,
                    message: 'Successfully created Posting!'
                }
                res.send(response)
            }
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})
//USER POSTS
router.get('/api/users/:userId/postings', (req, res, next)=>{
    Postings.find({postingId:req.params.postingId})
        .then(postings =>{
            res.send(postings)
        })
        .catch(err =>{
            res.status(400).send({Error: err})
        })
})

router.put('/api/postings/:id', (req, res, next) => {
    var action = 'Update Posting'
    Postings.findByIdAndUpdate(req.params.id, req.body)
        .then(data => {
            res.send(handleResponse(action, data))
        })
        .catch(err => {
            res.status(400).send(handleResponse(action, null, err))
        })
})


router.delete('/api/postings/:id', (req, res, next) => {
    //if broken, userId.toString()
    Postings.findById(req.params.id)
        .then(posting => {
            if (posting.userId.toString() == req.session.uid) {
                posting.remove()
                res.send({ message: 'So much for that posting' })
            }
            next()
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
   


})

function handleResponse(action, data, error) {
    var response = {
        message: action,
        data: data
    }
    if (error) {
        response.error = error
    }
    return response
}


module.exports = router