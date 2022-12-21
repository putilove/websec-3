const ApiError = require('../error/ApiError')
const {Comment} = require('../models/models')

class CommentController {
    async getById(req, res, next) {
        try {
            const {id} = req.query
            if (!id) return next(ApiError.badRequest('"id" must be not null'))
            const comment = await Comment.findByPk(id)
            return res.json(comment)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async getByPostId(req, res, next) {
        try {
            const {postId} = req.query
            if (!postId) return next(ApiError.badRequest('"postId" must be not null'))
            const comments = await Comment.findAll({
                where: {postId}
            })
            return res.json(comments)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const {comment} = req.body
            const commentRet = await Comment.create(comment)
            return res.json(commentRet)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async updateById(req, res, next) {
        try {
            const {comment} = req.body
            if (!comment) {
                return next(ApiError.badRequest('"id" must be not null'))
            }
            await Comment.update(
                {
                    text: comment.text
                },
                {
                    where: {id: comment.id}
                })
            return res.json(comment)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async deleteById(req, res, next) {
        try {
            const {id} = req.query
            if (!id) return next(ApiError.badRequest('"id" must be not null'))
            await Comment.destroy({
                where: {id}
            })
            return res.json(id)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }
}

module.exports = new CommentController()