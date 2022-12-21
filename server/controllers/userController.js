const ApiError = require('../error/ApiError');
const {User, Auth} = require('../models/models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Op} = require("sequelize");

const jwtGen = (id, username, email, password) => {
    return jwt.sign(
        {id, username, email, password},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {

    async signIn(req, res, next) {
        try {
            const {username, password, email} = req.body
            if(!password){
                return next(ApiError.badRequest("Не введён пароль!"))
            }
            if(!username || !email){
                return next(ApiError.badRequest("Не введено имя пользователя или email!"))
            }
            const user = await User.findOne(
                {
                    where: {
                        [Op.or]: [{username}, {email}]
                    }
                })
            if (!user) {
                return next(ApiError.badRequest("Пользователь с такими данными не существует"))
            }
            const isValidPassword = bcrypt.compareSync(password, user.passwordHash)
            if (!isValidPassword){
                return next(ApiError.badRequest("Не введён пароль!"))
            }
            const token = jwtGen(user.id, user.username, user.email, user.password)
            return res.json({token})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async signUp(req, res, next) {
        try {
            const {username, password, email} = req.body
            if (!username || !password || !email) {
                return next(ApiError.badRequest("Неполные данные"))
            }
            const mbUser = await User.findOne(
                {
                    where: {
                        [Op.or]: [{username}, {email}]
                    }
                })
            if (mbUser) {
                return next(ApiError.badRequest("Пользователь с такими данными уже существует"))
            }
            const passwordHash = await bcrypt.hash(password, 7)
            const user = await User.create({username, email, passwordHash})
            const token = jwtGen(user.id, username, email, password)
            await Auth.create({userId: user.id, token, tokenLifeTime: 24})

            return res.json({token})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
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