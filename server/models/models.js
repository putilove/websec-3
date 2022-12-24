const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true, allowNull: false},
        username: {type: DataTypes.STRING, unique: true, allowNull: false},
        registrationType: {type: DataTypes.STRING, allowNull: false, defaultValue: 1},
        email: {type: DataTypes.STRING, unique: true, allowNull: false},
        passwordHash: {type: DataTypes.STRING(3000), allowNull: false}
    })

const Auth = sequelize.define('auth',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true, allowNull: false},
        token: {type: DataTypes.STRING(3000), unique: true, allowNull: false},
        tokenLifeTime: {type: DataTypes.INTEGER, allowNull: false}
    })

const Post = sequelize.define('post',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true, allowNull: false},
        description: {type: DataTypes.STRING, allowNull: true},
        likesCount: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 0},
    })

const Image = sequelize.define('image',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true, allowNull: false},
        img: {type: DataTypes.STRING, allowNull: false},
        sequenceNumber: {type: DataTypes.INTEGER, allowNull: false},
    })

const Comment = sequelize.define('comment',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true, allowNull: false},
        text: {type: DataTypes.STRING, allowNull: false},
    })

const Like = sequelize.define('like',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true, allowNull: false},
    })

const Subscription = sequelize.define('subscription',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true, allowNull: false},
    })

User.hasMany(Post)
Post.belongsTo(User)

User.belongsToMany(User, {through: Subscription, as: 'otherUser'})
User.hasMany(Subscription, {as: 'userId'})

User.hasMany(Like)
Like.belongsTo(User)

Post.hasMany(Like)
Like.belongsTo(Post)

User.hasMany(Comment)
Comment.belongsTo(User)

Post.hasMany(Comment)
Comment.belongsTo(Post)

Post.hasMany(Image)
Image.belongsTo(Post)

User.hasOne(Auth)
Auth.belongsTo(User)

module.exports = {
    User,
    Post,
    Image,
    Subscription,
    Like,
    Comment,
    Auth
}


