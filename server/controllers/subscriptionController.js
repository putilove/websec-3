const ApiError = require('../error/ApiError')
const {Subscription, Comment, Post} = require('../models/models')

class SubscriptionController {
    async getById(req, res, next){
        const inId = req.query.id
        if(!inId) return next(ApiError.badRequest('"id" must be not null'))
        const subscription = await Subscription.findByPk(inId)
        return res.json(subscription)
    }
    async getByUserId(req, res, next){
        const inUserId = parseInt(req.query.userId)
        if(!inUserId) return next(ApiError.badRequest('"userId" must be not null'))
        const subscriptions = await Subscription.findAll({
            where: { userId: inUserId }
        })
        return res.json(subscriptions)
    }
    async getByOtherUserId(req, res, next){
        const inOtherUserId = parseInt(req.query.otherUserId)
        if(!inOtherUserId) return next(ApiError.badRequest('"otherUserId" must be not null'))
        const subscriptions = await Subscription.findAll({
            where: { otherUserId: inOtherUserId }
        })
        return res.json(subscriptions)
    }
    async create(req, res, next){
        const {subscription} = req.body
        const subscriptionRet = await Post.create(subscription)
        return res.json(subscriptionRet)
    }
    async deleteByUserIdOtherUserId(req, res, next){
        const inUserId = req.query.id
        const inOtherUserId = req.query.id
        if(!inUserId) return next(ApiError.badRequest('"userId" must be not null'))
        if(!inOtherUserId) return next(ApiError.badRequest('"otherUserId" must be not null'))
        await Comment.destroy({
            where: { userId: inUserId, otherUserId: inOtherUserId }
        })
        return res.json(inUserId)
    }
}

module.exports = new SubscriptionController()