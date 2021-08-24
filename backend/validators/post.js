const {body} = require('express-validator');
const Post = require('../model/post')
const bcrypt = require('bcrypt')

//add post
const validation_for_add_post = () => {
    return [
        body('title')
            .notEmpty().withMessage('title is req').bail()
            .custom(
                async (value, {req}) => {
                    if (await Post.findOne({title: value})) {
                        throw new Error(`title should be unique`)
                    }
                    return true
                }
            ),
        body('description')
            .notEmpty().withMessage('description is req')
    ]
}


const validation_rule_for_edit_post = () => {
    return [
        body('title')
            .custom(
                (value, {req}) => {
                    if ('title' in req.body) {
                        if (!value) {
                            throw new Error(`title cant be empty`)
                        }
                    }
                    return true
                }
            ),
        body('description')
            .custom(
                (value, {req}) => {
                    if ('description' in req.body) {
                        if (!value) {
                            throw new Error(`description cant be empty`)
                        }
                    }
                    return true
                }
            ),
    ]
}


module.exports = {
    validation_for_add_post,
    validation_rule_for_edit_post
}