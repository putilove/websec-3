const Router = require('express')
const router = Router()
const LikeController = require('../controllers/likeController')


router.get('/:id', LikeController.getById)
router.get('/post/:postId', LikeController.getByPostId)
router.post('/:postId&:userId', LikeController.create)
router.delete('/', LikeController.deleteById)

module.exports = router