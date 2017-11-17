var router = require('express').Router()
var Posts = require('../models/post')
var Comments = require('../models/comment')



router
  .get('/api/menu', (req, res, next) => {
    Promise.all([
      Posts.find({}),
      Comments.find({}),
    ])
      .then(results => res.send({
        posts: results[0],
        comments: results[1],
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