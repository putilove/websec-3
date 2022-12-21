const Router = require('express')
const router = Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/auth', authMiddleware, userController.checkAuth)
router.post('/signIn', userController.signIn)
router.post('/signUp', userController.signUp)
router.put('/:id', userController.updateById)
router.delete('/:id',userController.deleteById)

module.exports = router