const mongoose = require('mongoose');

const {Schema} = mongoose;

const commentschema = new Schema(
    {
        description: {
            type: String,
            required: [true, 'description is req']
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        post_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        },
        user: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Comment = mongoose.model('Comment', commentschema);

module.exports = Comment