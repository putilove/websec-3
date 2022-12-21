const ApiError = require('../error/ApiError')
const {Like, Post} = require('../models/models')

class LikeController {
    async getById(req, res, next) {
        try {
            const {id} = req.query
            if (!id) return next(ApiError.badRequest('"id" must be not null'))
            const like = await Like.findByPk(id)
            return res.json(like)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async getByPostId(req, res, next) {
        try {
            const {postId} = req.query
            if (!postId) return next(ApiError.badRequest('"postId" must be not null'))
            const likes = await Like.findAll({
                where: {postId}
            })
            return res.json(likes)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async create(req, res) {
        try {
            const {like} = req.body
            const likeRet = await Like.create(like)
            const post = await Post.findByPk(likeRet.postId)
            await Post.update({
                    likesCount: ++post.likesCount
                },
                {
                    where: {id: likeRet.postId}
                })
            return res.json(likeRet)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async deleteById(req, res, next) {
        try {
            const {id} = req.query
            const {postId} = req.query
            if (!id) return next(ApiError.badRequest('"id" must be not null'))
            if (!postId) return next(ApiError.badRequest('"postId" must be not null'))
            await Like.destroy({
                where: {id}
            })
            const post = await Post.findByPk(postId)
            await Post.update({
                    likesCount: --post.likesCount
                },
                {
                    where: {id: post.postId}
                })
            return res.json(id)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }
}

module.exports = new LikeController()