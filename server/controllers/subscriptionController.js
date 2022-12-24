const ApiError = require('../error/ApiError')
const {Subscription, Comment, Post, Like} = require('../models/models')
const {Op} = require("sequelize");

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
            const subscriptions = await Subscription.findAndCountAll({
                where: {userId}
            })
            return res.json(subscriptions.count)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async getByOtherUserId(req, res, next) {
        try {
            const {otherUserId} = req.query
            if (!otherUserId) return next(ApiError.badRequest('"otherUserId" must be not null'))
            const subscriptions = await Subscription.findAndCountAll({
                where: {otherUserId}
            })
            return res.json(subscriptions.count)
        } catch (e) {
            next(ApiError.internalError(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const {id} = req.body
            const {otherId} = req.body
            const mbSub =  await Subscription.findOne({
                where: {[Op.and]: [{userId: id}, {otherUserId: otherId}]}
            })
            if(mbSub){
                await Subscription.destroy({
                    where: {id: mbSub.id}
                })
            }
            else {
                await Subscription.create({userId: id, otherUserId: otherId})
            }
            return res.json(mbSub ? 0 : 1)
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