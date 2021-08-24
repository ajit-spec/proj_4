const mongoose = require('mongoose');

const {Schema} = mongoose;

const userschema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is req']
        },
        email: {
            type: String,
            required: [true, 'Email is req'],
            match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email is not valid'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Password is req']
        },
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        phone: {
            type: Number,
            match: [/^\d{10}$/, 'Phone is not valid'],
            default: null
        },
        relationship_status: {
            type: String,
            enum: ['single', 'married'],
            default: 'single'
        },
        profile_picture: {
            type: String,
            default: 'https://via.placeholder.com/160'
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userschema);

module.exports = User