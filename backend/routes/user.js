const express = require('express')
const router = express.Router()
const usercontrollers = require('../controller/user')
const loginvalidators = require('../validators/login')
const validate = require('../validate')
const auth = require('../auth')
const utils = require('../utils')

//register
router.post(
    '/register',
    loginvalidators.validation_rules_for_register(),
    validate,
    usercontrollers.register
)

//login
router.post(
    '/login',
    loginvalidators.validation_rules_for_login(),
    validate,
    usercontrollers.login
)

//update user
router.put(
    '/update_user',
    auth,
    loginvalidators.validation_rules_for_update_user(),
    validate,
    usercontrollers.update_user
)

//change password
router.put(
    '/change_password',
    auth,
    loginvalidators.validation_rules_for_change_password(),
    validate,
    usercontrollers.change_password
)

// get user_info
router.get(
    '/get_user_info',
    auth,
    usercontrollers.get_user_info
)


//follow user
router.put(
    '/follow_user',
    auth,
    usercontrollers.follow_user
)


//unfollow user
router.put(
    '/unfollow_user',
    auth,
    usercontrollers.unfollow_user
)

//upload profile
router.post(
    '/upload_file',
    auth,
    usercontrollers.upload_photo
)

//all_unfollow_users
router.get(
    '/all_unfollow_users',
    auth,
    usercontrollers.all_unfollow_users
)

//all_follow_users
router.get(
    '/all_follow_users',
    auth,
    usercontrollers.all_follow_users
)

//followers_list
router.get(
    '/followers_list',
    auth,
    usercontrollers.followers_list
)

module.exports = router