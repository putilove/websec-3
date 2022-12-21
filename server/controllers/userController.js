const ApiError = require('../error/ApiError');
const {User} = require('../models/models');

class UserController {

    async signIn(req,res){

    }
    async signUp(req,res,next) {
        try{
        const {user} = req.body
        const userRet = await User.create(user)
        return res.json(userRet)
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async checkAuth(req,res){
        return res.json(await User.findAll())
    }
    async updateById(req, res){

    }
    async deleteById(req, res){

    }
}

module.exports = new UserController()