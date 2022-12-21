const ApiError = require('../error/ApiError')
const {Post} = require('../models/models')

class PostController {
    async get(req, res, next){
        const posts = await Post.findAll()
        return res.json(posts)
    }
    async getById(req, res, next){
        const inId = req.query.id
        if(!inId) return next(ApiError.badRequest('"id" must be not null'))
        const post = await Post.findByPk(inId)
        return res.json(post)
    }
    async getByUserId(req, res, next){
        const inUserId = req.query.userId
        if(!inUserId) return next(ApiError.badRequest('"userId" must be not null'))
        const posts = await Post.findAll({
            where: { userId: inUserId }
        })
        return res.json(posts)
    }
    async create(req, res, next){
        const {post} = req.body
        const postRet = await Post.create(post)
        return res.json(postRet)
    }
    async updateById(req, res, next){
        const inPost = req.query.post
        if(!inPost){
            return next(ApiError.badRequest('"id" must be not null'))
        }
        await Post.update(
            {
                description: inPost.description
            },
            {
                where: { id: inPost.id }
            })
        return res.json(inPost)
    }
    async deleteById(req, res, next){
        const inId = req.query.id
        if(!inId) return next(ApiError.badRequest('"id" must be not null'))
        await Post.destroy({
            where: { id: inId }
        })
        return res.json(inId)
    }
}

module.exports = new PostController()