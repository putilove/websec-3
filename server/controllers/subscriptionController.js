const ApiError = require('../error/ApiError')
const {Subscription, Comment, Post} = require('../models/models')

class SubscriptionController {
    async getById(req, res, next) {
        try {
            const {id} = req.query
            if (!id) return next(ApiError.badRequest('"id" must be not null'))
            const subscription = await Subscription.findByPk(id)
            return res.json(subscription)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async getByUserId(req, res, next) {
        try {
            const {userId} = req.query
            if (!userId) return next(ApiError.badRequest('"userId" must be not null'))
            const subscriptions = await Subscription.findAll({
                where: {userId}
            })
            return res.json(subscriptions)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async getByOtherUserId(req, res, next) {
        try {
            const {otherUserId} = req.query
            if (!otherUserId) return next(ApiError.badRequest('"otherUserId" must be not null'))
            const subscriptions = await Subscription.findAll({
                where: {otherUserId}
            })
            return res.json(subscriptions)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const {subscription} = req.body
            const subscriptionRet = await Post.create(subscription)
            return res.json(subscriptionRet)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async deleteByUserIdOtherUserId(req, res, next) {
        try {
            const {userId} = req.query
            const {otherUserId} = req.query
            if (!userId) return next(ApiError.badRequest('"userId" must be not null'))
            if (!otherUserId) return next(ApiError.badRequest('"otherUserId" must be not null'))
            await Comment.destroy({
                where: {userId, otherUserId}
            })
            return res.json(userId)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }
}

module.exports = new SubscriptionController()