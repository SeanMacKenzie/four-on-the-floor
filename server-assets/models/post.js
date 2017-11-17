var mongoose = require('mongoose')
var ObjectId = mongoose.SchemaTypes.ObjectId
// WHAT IS AN AUTO
var schema = new mongoose.Schema({
    img: { type: String, default: '//placehold.it/200x200' },
    title: { type: String, required: true },
    userId: { type: ObjectId, required: true, ref: 'User' },

});

module.exports = mongoose.model('Post', schema);