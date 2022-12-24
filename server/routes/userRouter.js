const Router = require('express')
const router = Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/auth', authMiddleware, userController.checkAuth)
router.post('/signIn', userController.signIn)
router.post('/signUp', userController.signUp)
router.get('/', userController.getById)
router.get('/all',userController.getAll)
router.post('/signOut',userController.signOut)

module.exports = router