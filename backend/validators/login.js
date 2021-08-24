const {body} = require('express-validator');
const User = require('../model/user')
const bcrypt = require('bcrypt')

const validation_rules_for_register = () => {
    return [
        body('name')
            .notEmpty().withMessage('name is req'),
        body('email')
            .notEmpty().withMessage('email is req').bail()
            .isEmail().withMessage('email is not valid').bail()
            .custom(
                async (value, {req}) => {
                    if (await User.findOne({email: value})) {
                        throw new Error(`email already exist`)
                    }
                    return true
                }
            ),
        body('password')
            .notEmpty().withMessage('password is req').bail()
            .custom(
                (value, {req}) => {
                    const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
                    if (!(regex.test(value))) {
                        throw new Error(`password must contain min 8 characters, uppercase, lowercase, digit and special characters is mandatory`)
                    }
                    return true
                }
            )
    ]
}


const validation_rules_for_login = () => {
    return [
        body('email')
            .notEmpty().withMessage('email is req').bail()
            .isEmail().withMessage('email is not valid'),
        body('password')
            .notEmpty().withMessage('password is req')
    ]
}

const validation_rules_for_update_user = () => {
    return [
        body('name')
            .custom(
                (value, {req}) => {
                    if ('name' in req.body) {
                        if (!value) {
                            throw new Error('name cant be empty')
                        }
                    }
                    return true
                }
            ),
        body('phone')
            .custom(
                (value, {req}) => {
                    if ('phone' in req.body) {
                        const regex = /^\d{10}$/
                        if (!(regex.test(value))) {
                            throw new Error('provide valid phone no')
                        }
                    }
                    return true
                }
            )
    ]
}


const validation_rules_for_change_password = () => {
    return [
        body('old_password')
            .notEmpty().withMessage('old password is req').bail()
            .custom(
                async (value, {req}) => {
                    if (!(await bcrypt.compare(value, req.user.password))) {
                        throw new Error(`old password is not correct`)
                    }
                    return true
                }
            ),
        body('new_password')
            .notEmpty().withMessage('new password is req').bail()
            .custom(
                (value, {req}) => {
                    if (value === req.body.old_password) {
                        throw new Error(`new password should be different than old one`)
                    }
                    return true
                }
            ).bail()
            .custom(
                (value, {req}) => {
                    const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
                    if (!(regex.test(value))) {
                        throw new Error(`password must contain min 8 characters, uppercase, lowercase, digit and special characters is mandatory`)
                    }
                    return true
                }
            )
    ]
}


module.exports = {
    validation_rules_for_register,
    validation_rules_for_login,
    validation_rules_for_update_user,
    validation_rules_for_change_password
}