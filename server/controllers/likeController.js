const ApiError = require('../error/ApiError')
const {Like, Post} = require('../models/models')

class LikeController {
    async getById(req, res, next){
        const inId = req.query.id
        if(!inId) return next(ApiError.badRequest('"id" must be not null'))
        const like = await Like.findByPk(inId)
        return res.json(like)
    }
    async getByPostId(req, res, next){
        const inPostId = parseInt(req.query.postId)
        if(!inPostId) return next(ApiError.badRequest('"postId" must be not null'))
        const likes = await Like.findAll({
            where: { postId: inPostId }
        })
        return res.json(likes)
    }
    async create(req,res){
        const {like} = req.body
        const likeRet = await Like.create(like)
        const post = await Post.findByPk(likeRet.postId)
        await Post.update({
                likesCount: ++post.likesCount
            },
            {
                where: { id: likeRet.postId}
            })
        return res.json(likeRet)
    }
    async deleteById(req, res, next){
        const inId = req.query.Id
        const inPostId = req.query.postId
        if(!inId) return next(ApiError.badRequest('"id" must be not null'))
        if(!inPostId) return next(ApiError.badRequest('"postId" must be not null'))
        await Like.destroy({
            where: { id: inId}
        })
        const post = await Post.findByPk(inPostId)
        await Post.update({
                likesCount: --post.likesCount
            },
            {
                where: { id: post.postId}
            })
        return res.json(inId)
    }
}

module.exports = new LikeController()