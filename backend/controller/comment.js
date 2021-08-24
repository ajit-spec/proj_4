const Comment = require('../model/comment')

//add comment
const add_comment = async (req, res) => {
    const description = req.body.description;
    const user_id = req.user._id;
    const post_id = req.body.post_id;
    const user = req.user.name

    const comment = new Comment(
        {
            description,
            user_id,
            post_id,
            user
        }
    )

    await comment.save()
    res.json(
        {
            status: 1,
            msg: 'comment added'
        }
    )
}

//edit comment
const edit_comment = async (req, res) => {
    const comment_id = req.body.comment_id;
    const user_id = req.user._id;

    const result = await Comment.findById(comment_id)
    if (!result) {
        return res.json(
            {
                status: 0,
                msg: 'comment does not exist'
            }
        )
    }

    if (!result.user_id.equals(user_id)) {
        return res.json(
            {
                status: 0,
                msg: 'you are not allowed to edit this comment'
            }
        )
    }

    await Comment.findByIdAndUpdate(
        comment_id,
        {
            description: req.body.description
        }
    )

    res.json(
        {
            status: 1,
            msg: 'comment edited'
        }
    )


}

//delete comment
const delete_comment = async (req, res) => {
    const comment_id = req.body.comment_id;
    const user_id = req.user._id;

    const result = await Comment.findById(comment_id)
    if (!result) {
        return res.json(
            {
                status: 0,
                msg: 'comment does not exist'
            }
        )
    }

    if (!result.user_id.equals(user_id)) {
        return res.json(
            {
                status: 0,
                msg: 'you are not allowed to delete this comment'
            }
        )
    }

    await Comment.findByIdAndDelete(
        comment_id
    )

    res.json(
        {
            status: 1,
            msg: 'comment deleted'
        }
    )
}

//get comments for post
const comment_for_post = async (req, res) => {
    const post_id = req.body.post_id
    const result = await Comment.find({post_id}).sort({updatedAt: -1})
    res.json(
        {
            status: 1,
            comments: result
        }
    )
}


module.exports = {
    add_comment,
    edit_comment,
    delete_comment,
    comment_for_post
}