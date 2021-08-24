const express = require('express')
const router = express.Router()
const commentcontrollers = require('../controller/comment')
const commentvalidators = require('../validators/comment')
const validate = require('../validate')
const auth = require('../auth')

//add comment
router.post(
    '/add_comment',
    auth,
    commentvalidators.validation_for_addcomment(),
    validate,
    commentcontrollers.add_comment
)

//edit comment
router.put(
    '/edit_comment',
    auth,
    commentvalidators.validation_for_editcomment(),
    validate,
    commentcontrollers.edit_comment
)

//delete comment
router.post(
    '/delete_comment',
    auth,
    commentcontrollers.delete_comment
)

//get comment for post
router.post(
    '/comment_for_post',
    auth,
    commentcontrollers.comment_for_post
)

module.exports = router