var mongoose = require('mongoose')
var ObjectId = mongoose.SchemaTypes.ObjectId
var Comments = require('./comment')
// WHAT IS AN AUTO
var schema = new mongoose.Schema({
    img: { type: String, default: '//placehold.it/200x200' },
    title: { type: String, required: true },
});

schema.pre('remove', () => {
    Comments.remove({ postingId : this._id})
})

module.exports = mongoose.model('Posting', schema);