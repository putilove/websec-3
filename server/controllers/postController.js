const ApiError = require('../error/ApiError')
const {Post, Image, User, Comment, Subscription} = require('../models/models')
const {Op} = require("sequelize");
const uuid = require("uuid");
const path = require("path");

class PostController {
    async get(req, res, next) {
        try {
            const posts = await Post.findAll()
            return res.json(posts)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async getById(req, res, next) {
        try {
            const {id} = req.query
            if (!id) return next(ApiError.badRequest('"id" must be not null'))
            const post = await Post.findByPk(id)
            return res.json(post)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async getUserPostsByUserId(req, res, next) {
        try {
            const {userId} = req.query
            if (!userId) return next(ApiError.badRequest('"userId" must be not null'))
            let posts = await Post.findAll({
                include: [{
                    model: Image,
                    required: true
                },
                    {
                        model: User,
                        required: true
                    }
                ],
                where: {userId}
            })
            const postIds = posts.map(post => post.id)
            const comments = await Comment.findAll({
                include: [{
                    attributes: ['username'],
                    model: User,
                    required: true
                }],
                where: {
                    postId: {
                        [Op.in]: postIds
                    }
                }
            })
            let newPosts = posts.map(function (post) {
                return {
                    id: post.id,
                    description: post.description,
                    createdAt: post.createdAt,
                    likesCount: post.likesCount,
                    userId: post.userId,
                    images: post.images,
                    username: post.user.username,
                    comments: comments.filter(comment => comment.postId === post.id)
                }
            })
            return res.json(newPosts)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async getFollowedUsersPostsByUserId(req, res, next) {
        try {
            const {id} = req.query
            if (!id) return next(ApiError.badRequest('"userId" must be not null'))
            let subscriptions = await Subscription.findAll({
                where: {userId: id}
            })
            let subscribersId = subscriptions.map(subscriber => subscriber.otherUserId)
            let posts = await Post.findAll({
                include: [{
                    model: Image,
                    required: true
                },
                    {
                        model: User,
                        required: true
                    }
                ]
            })
            posts = posts.filter(post => subscribersId.includes(post.userId))
            const postIds = posts.map(post => post.id)
            const comments = await Comment.findAll({
                include: [{
                    attributes: ['username'],
                    model: User,
                    required: true
                }],
                where: {
                    postId: {
                        [Op.in]: postIds
                    }
                }
            })
            let newPosts = posts.map(function (post) {
                return {
                    id: post.id,
                    description: post.description,
                    createdAt: post.createdAt,
                    likesCount: post.likesCount,
                    userId: post.userId,
                    images: post.images,
                    username: post.user.username,
                    comments: comments.filter(comment => comment.postId === post.id)
                }
            })
            return res.json(newPosts)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const {description, userId} = req.body
            const {images} = req.files
            const imagePaths = images.map(image =>
                image.name.endsWith('.jpg') ?
                    uuid.v4() + '.jpg' :
                    image.name.endsWith('.jpeg') ?
                        uuid.v4() + '.jpeg' :
                        image.name.endsWith('.png') ?
                            uuid.v4() + '.jpg' :
                            ''
            )
            await images.map(async (image, i) => await image.mv(path.resolve(__dirname, '..', 'static', imagePaths[i])))
            const postRet = await Post.create({ description, userId})
            await imagePaths.map(async (imagePath, i) => await Image.create({img: imagePath, sequenceNumber: i+1, postId: postRet.id}))
            return res.json(postRet)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async updateById(req, res, next) {
        try {
            const {post} = req.body
            if (!post) {
                return next(ApiError.badRequest('"id" must be not null'))
            }
            await Post.update(
                {
                    description: post.description
                },
                {
                    where: {id: post.id}
                })
            return res.json(post)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async deleteById(req, res, next) {
        try {
            const {id} = req.query
            if (!id) return next(ApiError.badRequest('"id" must be not null'))
            await Post.destroy({
                where: {id}
            })
            await Image.destroy({
                where: {postId: id}
            })
            return res.json(id)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }
}

module.exports = new PostController()