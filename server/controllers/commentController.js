const ApiError = require('../error/ApiError')
const {Comment} = require('../models/models')

class CommentController {
    async getById(req, res, next){
        const inId = req.query.id
        if(!inId) return next(ApiError.badRequest('"id" must be not null'))
        const comment = await Comment.findByPk(inId)
        return res.json(comment)
    }
    async getByPostId(req, res, next){
        const inPostId = parseInt(req.query.postId)
        if(!inPostId) return next(ApiError.badRequest('"postId" must be not null'))
        const comments = await Comment.findAll({
                where: { postId: inPostId }
        })
        return res.json(comments)
    }
    async create(req, res, next){
        const {comment} = req.body
        const commentRet = await Comment.create(comment)
        return res.json(commentRet)
    }
    async updateById(req, res, next){
        const inComment = req.query.comment
        if(!inComment){
            return next(ApiError.badRequest('"id" must be not null'))
        }
        await Comment.update(
            {
                text: inComment.text
            },
            {
                where: { id: inComment.id }
            })
        return res.json(inComment)
    }
    async deleteById(req, res, next){
        const inId = req.query.id
        if(!inId) return next(ApiError.badRequest('"id" must be not null'))
        await Comment.destroy({
            where: { id: inId }
        })
        return res.json(inId)
    }
}

module.exports = new CommentController()