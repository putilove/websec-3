const Router = require('express')
const router = Router()
const ImageController = require('../controllers/imageController')


router.get('/:id', ImageController.getById)
router.get('/:postId', ImageController.getByPostId)
router.post('/', ImageController.create)
router.delete('/:id', ImageController.deleteById)

module.exports = router