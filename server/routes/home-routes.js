var router = require('express').Router()
var Postings = require('../models/posting')




router.get('/api/home', (req, res, next) => {
    Promise.all([
      Postings.find({}),
      
    ])
      .then(results => res.send({
        postings: results[0],
        
      }))
      .catch()
    //     Posts.find({})
    //         .then(posts => {
    //             Sides.find({})
    //                 .then(sides => {
    //                     Comments.find({})
    //                         .then(comments => {
    //                             res.send({
    //                                 posts,
    //                                 comments,
    //                                 sides
    //                             })
    //                         }).catch()
    //                 }).catch()
    //         }).catch()
  })



module.exports = router