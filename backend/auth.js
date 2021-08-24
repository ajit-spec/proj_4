const utils = require('./utils')
const User = require('./model/user')

const isauthenticated = async (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]

    try {
        const result = await utils.verify_token(token)
        if (!result) {
            return res.json(
                {
                    status: 0,
                    msg: 'not authenticated'
                }
            )
        }

        const user = await User.findById(result._id)
        if (!user) {
            return res.json(
                {
                    status: 0,
                    msg: 'not authenticated'
                }
            )
        }

        req.user = user
        next()

    } catch (e) {
        console.log(e.message)
        return res.json(
            {
                status: 0,
                msg: 'not authenticated'
            }
        )
    }

}

module.exports = isauthenticated