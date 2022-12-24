const Router = require('express')
const router = Router()

const userRouter = require('./userRouter')
const postRouter = require('./postRouter')
const imageRouter = require('./imageRouter')
const commentRouter = require('./commentRouter')
const likeRouter = require('./likeRouter')
const subscriptionRouter = require('./subscriptionRouter')

router.use('/user', userRouter)
router.use('/post', postRouter)
router.use('/image', imageRouter)
router.use('/comment', commentRouter)
router.use('/like', likeRouter)
router.use('/subscription', subscriptionRouter)

module.exports = router