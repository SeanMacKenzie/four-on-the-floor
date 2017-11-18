var mongoose = require('mongoose')
var ObjectId = mongoose.SchemaTypes.ObjectId
// WHAT IS AN AUTO
var schema = new mongoose.Schema({
    
    comment: { type: String, required: true },
    votes: { type: Object },
    userId: { type: ObjectId, required: true, ref: 'User' },
    postingId: { type: ObjectId, required: true, ref: 'Posting'}
    
});

module.exports = mongoose.model('Comment', schema);