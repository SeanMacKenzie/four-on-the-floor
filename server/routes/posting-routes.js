var Comments = require('../models/comment')
var Postings = require('../models/posting')
var router = require('express').Router()
var Users = require('../models/user')

router.delete('/api/postings/:id', (req, res) => {
    Postings.findOneAndRemove({_id: req.params.id, userId: req.session.uid })
        .then(() => res.send({ message: 'Its gone' }))
        .catch(err => res.status(401).send(err))
   

})

router.get('/api/postings', (req, res, next) => {
    Postings.find({})
        .then(postings => {
            res.send(postings)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})



// router.get('/api/postings/:id', (req, res, next)=>{
//     Postings.findById(req.params.id)
//         .then(posting=>{
//             res.send(posting)
//         })
//         .catch(err =>{
//             res.status(400).send({Error: err})
//         })
// })
router.get('/api/postings/:id', (req, res, next) => {
    Postings.findById(req.params.id)
        .then(posting => {
            console.log(posting)
            Users.findById(posting.userId, 'username')
                .then(user => {
                    posting.userId = user
                    res.send(posting)
                })
        }).catch(err => {
            res.status(400).send({ Error: err })
        })
})


router.post('/api/postings', (req, res, next) => {
    if (req.session.uid) {
        req.body.userId = req.session.uid.toString()
        Postings.create(req.body)
            .then(posting => {
                res.send({ data: posting, message: 'Successfully created Posting!' })
            })
            .catch(err => {
                res.status(400).send({ Error: err })
            })
    } else {
        res.send({ message: 'Please log in' })
    }
})
//USER POSTS
router.get('/api/users/:userId/postings', (req, res, next) => {
    Postings.find({ postingId: req.params.postingId })
        .then(postings => {
            res.send(postings)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
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