const User = require('../model/user')
const bcrypt = require('bcrypt')
const utils = require('../utils')
const multer = require("multer");

//register
const register = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 10)

    const user = new User(
        {
            name,
            email,
            password
        }
    )

    await user.save()
    res.send(
        {
            status: 1,
            msg: 'user registered success'
        }
    )
}

//login
const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const result = await User.findOne(
        {email}
    )

    if (!result) {
        return res.json(
            {
                status: 0,
                msg: 'wrong credentails'
            }
        )
    }

    if (
        !(await bcrypt.compare(password, result.password))
    ) {
        return res.json(
            {
                status: 0,
                msg: 'wrong credentails'
            }
        )
    }

    const token = await utils.generate_token({
        _id: result._id,
        name: result.name,
        email: result.email
    })

    return res.json(
        {
            status: 1,
            msg: 'login success',
            token
        }
    )


}

//update user
const update_user = async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        req.body
    )
    return res.json(
        {
            status: 1,
            msg: 'user details updated'
        }
    )
}

//change password
const change_password = async (req, res) => {
    const new_password = req.body.new_password;
    await User.findByIdAndUpdate(
        req.user._id,
        {
            password: await bcrypt.hash(new_password, 10)
        }
    )
    return res.json(
        {
            status: 1,
            msg: 'password  updated'
        }
    )
}


//get user_info
const get_user_info = async (req, res) => {
    const {password, ...others} = req.user.toObject()
    res.json(
        {
            status: 1,
            data: others
        }
    )
}

//follow user
const follow_user = async (req, res) => {

    const follow_id = req.body.follow_id;

    if (req.user.following.find(value => value.equals(follow_id))) {
        return res.json(
            {
                status: 0,
                msg: 'you have already followed this user'
            }
        )
    }

    const curr_user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet: {
                following: follow_id
            }
        },
        {
            new: true
        }
    )

    const follow_user = await User.findByIdAndUpdate(
        follow_id,
        {
            $addToSet: {
                followers: req.user._id
            }
        },
        {
            new: true
        }
    )

    res.json(
        {
            status: 1,
            msg: `you followed the user ${follow_user.name}`
        }
    )


}


//unfollow user
const unfollow_user = async (req, res) => {

    const follow_id = req.body.follow_id;

    if (!req.user.following.find(value => value.equals(follow_id))) {
        return res.json(
            {
                status: 0,
                msg: 'we cannot unfollow because you have not followed this user'
            }
        )
    }

    const curr_user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull: {
                following: follow_id
            }
        }
    )

    const follow_user = await User.findByIdAndUpdate(
        follow_id,
        {
            $pull: {
                followers: req.user._id
            }
        }
    )

    res.json(
        {
            status: 1,
            msg: `you unfollow the user ${follow_user.name}`
        }
    )


}


//upload photo
const upload_photo = async (req, res) => {

    utils.upload_image(req, res, async function (err) {

        console.log(req.file)

        if (req.fileValidationError) {
            return res.send({
                status: 0,
                msg: req.fileValidationError
            });
        } else if (!req.file) {
            return res.send({
                status: 0,
                msg: 'Please select an image to upload'
            });
        } else if (err instanceof multer.MulterError) {
            return res.send(err);
        } else if (err) {
            return res.send(err);
        }

        req.user.profile_picture = `${process.env.APP_BASE_URL}/uploads/${req.file.filename}`
        await req.user.save()

        res.json(
            {
                status: 1,
                msg: 'image uploaded'
            }
        )

    })

}


//all_unfollow_users
const all_unfollow_users = async (req, res) => {

    const result = await User.find(
        {
            _id: {
                $nin: [...req.user.following, req.user._id]
            }
        }
    )

    res.json(
        {
            status: 1,
            users: result
        }
    )

}

//all_follow_users
const all_follow_users = async (req, res) => {

    const result = await User.find(
        {
            _id: {
                $in: [...req.user.following]
            }
        }
    )

    res.json(
        {
            status: 1,
            users: result
        }
    )

}

//followers_list
const followers_list = async (req, res) => {
    const result = await User.find(
        {
            _id: {
                $in: [...req.user.followers]
            }
        }
    )

    res.json(
        {
            status: 1,
            users: result
        }
    )
}

module.exports = {
    register,
    login,
    update_user,
    change_password,
    get_user_info,
    follow_user,
    unfollow_user,
    upload_photo,
    all_unfollow_users,
    all_follow_users,
    followers_list
}