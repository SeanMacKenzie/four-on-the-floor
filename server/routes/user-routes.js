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

// router.get('/api/postings/:postingId/users', (req, res, next)=>{
//     Users.find({postingId:req.params.postingId})
//         .then(users =>{
//             res.send(users)
//         })
//         .catch(err =>{
//             res.status(400).send({Error: err})
//         })
// })
router.get('/api/postings/:postingId/users', (req, res, next)=>{
    Users.find({postingId:req.params.postingId})
        .then(users =>{
            res.send(users)
        })
        .catch(err =>{
            res.status(400).send({Error: err})
        })
})


router.put('/api/users/:id', (req, res, next)=>{
    var action = 'Update User'
    Users.findByIdAndUpdate(req.params.id, req.body)
        .then(data=>{
            res.send(handleResponse(action, data))
        })
        .catch(err =>{
            res.status(400).send(handleResponse(action, null, err))
        })
})


router.delete('/api/users/:id', (req, res, next)=>{
    Users.findByIdAndRemove(req.params.id)
        .then(()=>{
            res.send({message: 'So much for that user'})
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