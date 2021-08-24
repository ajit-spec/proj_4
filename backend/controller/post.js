const Post = require('../model/post')
const bcrypt = require('bcrypt')
const utils = require('../utils')
const Comment = require('../model/comment')


//add post
const add_post = async (req, res) => {

    const title = req.body.title;
    const description = req.body.description;
    const user_id = req.user._id

    const post = new Post(
        {
            title,
            description,
            user_id
        }
    )

    await post.save()
    res.json(
        {
            status: 1,
            msg: 'new post added'
        }
    )
}

//edit post
const edit_post = async (req, res) => {

    const post_id = req.body.post_id

    const post = await Post.findById(post_id)

    if (!post) {
        return res.json(
            {
                status: 0,
                msg: 'post does not exist'
            }
        )
    }

    if (
        !(post.user_id.equals(req.user._id))
    ) {
        return res.json(
            {
                status: 0,
                msg: 'you are not allowed to edit this post'
            }
        )
    }

    await Post.findByIdAndUpdate(
        post_id,
        req.body
    )


    res.json(
        {
            status: 1,
            msg: 'post edited'
        }
    )
}


//delete post
const delete_post = async (req, res) => {

    const post_id = req.body.post_id

    const post = await Post.findById(post_id)

    if (!post) {
        return res.json(
            {
                status: 0,
                msg: 'post does not exist'
            }
        )
    }

    if (
        !(post.user_id.equals(req.user._id))
    ) {
        return res.json(
            {
                status: 0,
                msg: 'you are not allowed to delete this post'
            }
        )
    }

    await Post.findByIdAndDelete(
        post_id
    )

    await Comment.deleteMany({post_id})


    res.json(
        {
            status: 1,
            msg: 'post deleted'
        }
    )
}


//like_post
const like_post = async (req, res) => {

    const post_id = req.body.post_id;

    const post = await Post.findById(post_id)

    if (!post) {
        return res.json(
            {
                status: 0,
                msg: 'post does not exist'
            }
        )
    }

    if (post.likes.find(value => value.equals(req.user._id))) {
        return res.json(
            {
                status: 0,
                msg: 'you have already liked this post'
            }
        )
    }

    await Post.findByIdAndUpdate(
        post_id,
        {
            $addToSet: {
                likes: req.user._id
            },
            $pull: {
                dislikes: req.user._id
            }
        }
    )

    res.json(
        {
            status: 1,
            msg: 'you liked this post'
        }
    )

}

//dislike_post
const dislike_post = async (req, res) => {

    const post_id = req.body.post_id;

    const post = await Post.findById(post_id)
    if (!post) {
        return res.json(
            {
                status: 0,
                msg: 'post does not exist'
            }
        )
    }

    if (post.dislikes.find(value => value.equals(req.user._id))) {
        return res.json(
            {
                status: 0,
                msg: 'you have already disliked this post'
            }
        )
    }

    await Post.findByIdAndUpdate(
        post_id,
        {
            $addToSet: {
                dislikes: req.user._id
            },
            $pull: {
                likes: req.user._id
            }
        }
    )

    res.json(
        {
            status: 1,
            msg: 'you disliked this post'
        }
    )

}

//get single_post
const get_single_post = async (req, res) => {

    const post_id = req.body.post_id

    const result = await Post.findById(post_id)

    if (!result) {
        return res.json(
            {
                status: 0,
                msg: 'post does not exist'
            }
        )
    }

    res.json(
        {
            status: 1,
            post: result
        }
    )
}

// get all_Posts
const get_all_posts = async (req, res) => {
    const result = await Post.find({}).populate(
        {
            path: 'comments'
        }
    ).sort({updatedAt: -1})

    res.json(
        {
            status: 1,
            posts: result
        }
    )
}

module.exports = {
    add_post,
    edit_post,
    delete_post,
    like_post,
    dislike_post,
    get_single_post,
    get_all_posts
}