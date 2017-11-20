var Comments = require('../models/comment')
var router = require('express').Router()
var Users = require('../models/user')


router.get('/api/comments', (req, res, next) => {
    Comments.find({})
        .then(comments => {
            res.send(comments)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})
router.get('/api/postings/:postingId/comments', (req, res, next) => {
    Comments.find({ postingId: req.params.postingId })
        .then(comments => {
            res.send(comments)
        })
        .catch(err => {
            res.status(400).send({ Error: err })
        })
})
router.get('/api/comments/:id', (req, res, next) => {
    Comments.findById(req.params.id)
        .then(comment => {
            Users.findById(comment.userId, 'username')
                .then(user => {
                    Comments.userId = user
                    res.send(comment)
                }).catch(err => {
                    res.status(400).send({ Error: err })
                })
        }).catch(err => {
            res.status(400).send({ Error: err })
        })
})

// router.post('/api/comments', (req, res, next)=>{
//     Comments.create(req.body)
//         .then(comment => {
//             let response = {
//                 data: comment,
//                 message: 'Successfully created Comment!'
//             }
//             res.send(response)
//         })
//         .catch(err =>{
//             res.status(400).send({Error: err})
//         })
// })

router.post('/api/comments', (req, res, next) => {
    if (req.session.uid) {
        req.body.userId = req.session.uid.toString()
        req.body.votes = {}
        req.body.votes[req.session.uid.toString()] = 0
        Comments.create(req.body)
            .then(posting => {
                res.send({ data: comment, message: 'Successfully created Comment!' })
            })
            .catch(err => {
                res.status(400).send({ Error: err })
            })
    } else {
        res.send({ message: 'Please log in' })
    }
})

router.put('/api/votes/comments/:id', (req, res, next) => {
    var action = 'Updates votes'
    Comments.findById({_id : req.params.id})
        .then(comment => {
            var myVote = comment.votes[req.session.uid.toString()]
            if (myVote == req.body.data) {
                comment.votes[userId] = 0
                comment.save()
            } else {
                comment.votes[userId] = req.body.data
                comment.save()
            }
            res.send(comment, { message: 'Updated votes' })
        })
        .catch(err => {
            res.status(400).send(handleResponse(action, null, err))
        })
})

router.put('/api/comments/:id', (req, res, next) => {
    var action = 'Update Comment'
    Comments.findByIdAndUpdate(req.params.id, req.body)
        .then(data => {
            res.send(handleResponse(action, data))
        })
        .catch(err => {
            res.status(400).send(handleResponse(action, null, err))
        })
})


router.delete('/api/comments/:id', (req, res, next) => {
    Comments.findByIdAndRemove(req.params.id)
        .then(() => {
            res.send({ message: 'So much for that comment' })
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