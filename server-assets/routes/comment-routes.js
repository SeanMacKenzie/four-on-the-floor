var Comments = require('../models/comment')
var router = require('express').Router()


router.get('/api/comments', (req, res, next)=>{
    Comments.find({})
        .then(comments =>{
            res.send(comments)
        })
        .catch(err =>{
            res.status(400).send({Error: err})
        })
})

router.get('/api/comments/:id', (req, res, next)=>{
    Comments.findById(req.params.id)
        .then(comment=>{
            res.send(comment)
        })
        .catch(err =>{
            res.status(400).send({Error: err})
        })
})

router.comment('/api/comments', (req, res, next)=>{
    Comments.create(req.body)
        .then(comment => {
            let response = {
                data: comment,
                message: 'Successfully created Comment!'
            }
            res.send(response)
        })
        .catch(err =>{
            res.status(400).send({Error: err})
        })
})


router.put('/api/comments/:id', (req, res, next)=>{
    var action = 'Update Comment'
    Comments.findByIdAndUpdate(req.params.id, req.body)
        .then(data=>{
            res.send(handleResponse(action, data))
        })
        .catch(err =>{
            res.status(400).send(handleResponse(action, null, err))
        })
})


router.delete('/api/comments/:id', (req, res, next)=>{
    Comments.findByIdAndRemove(req.params.id)
        .then(()=>{
            res.send({message: 'So much for that comment'})
        })
        .catch(err =>{
            res.status(400).send({Error: err})
        })
})

function handleResponse(action, data, error){
    var response =  {
        message: action,
        data: data
    }
    if(error){
        response.error = error
    }
    return response
}


module.exports = router