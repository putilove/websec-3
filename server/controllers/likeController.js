const ApiError = require('../error/ApiError')
const {Like, Post} = require('../models/models')
const {Op} = require("sequelize");

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

    async create(req, res, next) {
        try {
            const {userId, postId} = req.body
            const mbLike =  await Like.findOne({
                where: {[Op.and]: [{userId: userId}, {postId: postId}]}
            })
            const post = await Post.findByPk(postId)
            if(mbLike){
                await Like.destroy({
                    where: {id: mbLike.id}
                })
                await Post.update({
                        likesCount: --post.likesCount
                    },
                    {
                        where: {id: postId}
                    })
            }
            else{
                await Like.create({userId, postId})
                await Post.update({
                        likesCount: ++post.likesCount
                    },
                    {
                        where: {id: postId}
                    })
            }
            return res.json(mbLike ? 0 : 1)
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