const ApiError = require('../error/ApiError')
const {Post, Image, User, Comment} = require('../models/models')
const {Op} = require("sequelize");

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
            const posts = await Post.findAll({
                where: {userId}
            })
            return res.json(posts)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async getFollowedUsersPostsByUserId(req, res, next) {
        try {
            const {id} = req.query
            if (!id) return next(ApiError.badRequest('"userId" must be not null'))
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
                where: {userId: {[Op.ne]: id}}
            })
            const postIds = posts.map(post => post.id)
            const comments = await Comment.findAll({
                include: [{
                    model: User,
                    required: true
                }],
                where: {[Op.in]: postIds}
            })
            let newPosts = posts.map(post => post.comments = comments.filter(comment => comment.postId === post.id)) // TODO
            return res.json(newPosts)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const {post} = req.body
            const postRet = await Post.create(post)
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
            return res.json(id)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }
}

module.exports = new PostController()