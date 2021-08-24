const express = require('express')
const router = express.Router()
const postcontrollers = require('../controller/post')
const postvalidators = require('../validators/post')
const validate = require('../validate')
const auth = require('../auth')

//add post
router.post(
    '/add_post',
    auth,
    postvalidators.validation_for_add_post(),
    validate,
    postcontrollers.add_post
)

//edit post
router.put(
    '/edit_post',
    auth,
    postvalidators.validation_rule_for_edit_post(),
    validate,
    postcontrollers.edit_post
)

//delete post
router.post(
    '/delete_post',
    auth,
    postcontrollers.delete_post
)

//like post
router.put(
    '/like_post',
    auth,
    postcontrollers.like_post
)

//dislike post
router.put(
    '/dislike_post',
    auth,
    postcontrollers.dislike_post
)

//get single_post
router.post(
    '/get_single_post',
    auth,
    postcontrollers.get_single_post
)

//get all_post
router.get(
    '/get_all_post',
    auth,
    postcontrollers.get_all_posts
)

module.exports = router