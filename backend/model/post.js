const mongoose = require('mongoose');

const {Schema} = mongoose;

const postschema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'title is req'],
            unique: true
        },
        description: {
            type: String,
            required: [true, 'description is req']
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        dislikes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
)

postschema.virtual(
    'comments',
    {
        ref: 'Comment',
        localField: "_id",
        foreignField: 'post_id'
    }
)

postschema.set('toObject', {virtuals: true});
postschema.set('toJSON', {virtuals: true});

const Post = mongoose.model('Post', postschema);

module.exports = Post