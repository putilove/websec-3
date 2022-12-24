const Router = require('express')
const router = Router()
const postController = require('../controllers/postController')


router.get('/all/', postController.get)
router.get('/',postController.getById)
router.get('/user', postController.getUserPostsByUserId)
router.get('/followed', postController.getFollowedUsersPostsByUserId)
router.post('/',postController.create)
router.put('/:id',postController.updateById)
router.delete('/', postController.deleteById)

module.exports = router