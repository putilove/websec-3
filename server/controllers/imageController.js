const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')
const {Image, Post} = require('../models/models')
const {Op} = require("sequelize");

class ImageController {
    async getById(req, res, next) {
        try {
            const {id} = req.query
            if (!id) return next(ApiError.badRequest('"id" must be not null'))
            const comment = await Image.findByPk(id)
            return res.json(comment)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async getByPostId(req, res, next) {
        try {
            const {postId} = req.query
            if (!postId) return next(ApiError.badRequest('"postId" must be not null'))
            const images = await Image.findAll({
                where: {postId}
            })
            return res.json(images)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async getImagesByPostIds(req, res, next) {
        try {
            const {ids} = req.body
            if (!ids.length) return next(ApiError.badRequest('"ids" must be not zero length'))
            let imagePosts = await Image.findAll({
                where: {postId: {[Op.in]: ids}}
            })
            return res.json(imagePosts)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async create(req, res, next) {
        try {
            let {sequenceNumber, userId, postId} = req.body
            const {image} = req.files
            let img = uuid.v4() + '.jpg'
            await image.mv(path.resolve(__dirname, '..', 'static', img))
            const imageRet = await Image.create({img, sequenceNumber, postId, userId})
            return res.json(imageRet)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async deleteById(req, res, next) {
        try {
            const {id} = req.query
            if (!id) return next(ApiError.badRequest('"id" must be not null'))
            await Image.destroy({
                where: {id}
            })
            return res.json(id)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }
}

module.exports = new ImageController()