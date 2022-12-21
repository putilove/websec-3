const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')
const {Image} = require('../models/models')

class ImageController {
    async getById(req, res, next){
        const inId = req.query.id
        if(!inId) return next(ApiError.badRequest('"id" must be not null'))
        const comment = await Image.findByPk(inId)
        return res.json(comment)
    }
    async getByPostId(req, res, next){
        const inPostId = parseInt(req.query.postId)
        if(!inPostId) return next(ApiError.badRequest('"postId" must be not null'))
        const comments = await Image.findAll({
            where: { postId: inPostId }
        })
        return res.json(comments)
    }
    async create(req, res, next){
        try{
            let {sequenceNumber, userId, postId} = req.body
            const {img} = req.files
            let filename = uuid.v4() + '.jpg'
            await img.mv(path.resolve(__dirname, '..', 'static', filename))
            const imageRet = await Image.create({img: filename, sequenceNumber, createdAt: '2022-12-21 15:52:01.115 +00:00', postId, userId})
            return res.json(imageRet)
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async deleteById(req, res, next){
        const inId = req.query.id
        if(!inId) return next(ApiError.badRequest('"id" must be not null'))
        await Image.destroy({
            where: { id: inId}
        })
    }
}

module.exports = new ImageController()