const {body} = require('express-validator');

const validation_for_addcomment = () => {
    return [
        body('description')
            .notEmpty().withMessage('description is req')
    ]
}

const validation_for_editcomment = () => {
    return [
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
            )
    ]
}

module.exports = {
    validation_for_addcomment,
    validation_for_editcomment
}