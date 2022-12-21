const ApiError = require('../error/ApiError');
const {User} = require('../models/models');

class UserController {

    async signIn(req, res) {
        //TODO
    }

    async signUp(req, res, next) {
        //TODO
        try {
            const {user} = req.body
            const userRet = await User.create(user)
            return res.json(userRet)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async checkAuth(req, res) {
        //TODO
        return res.json(await User.findAll())
    }

    async updateById(req, res) {
        //TODO

    }

    async deleteById(req, res) {
        //TODO

    }
}

module.exports = new UserController()