const Router = require('express')
const router = Router()
const CommentController = require('../controllers/commentController')


router.get('/post/', CommentController.getByPostId)
router.get('/', CommentController.getById)
router.post('/', CommentController.create)
router.put('/', CommentController.updateById)
router.delete('/post/', CommentController.deleteById)

module.exports = router