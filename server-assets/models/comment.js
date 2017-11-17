var mongoose = require('mongoose')
var ObjectId = mongoose.SchemaTypes.ObjectId
// WHAT IS AN AUTO
var schema = new mongoose.Schema({
    
    comment: { type: String, required: true },
    upvotes: { type: Number},
    userId: { type: ObjectId, required: true, ref: 'User' },
    postId: { type: ObjectId, required: true, ref: 'Post' }
});

module.exports = mongoose.model('Comment', schema);