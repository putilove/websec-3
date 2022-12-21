const Router = require('express')
const router = Router()
const userController = require('../controllers/userController')


router.get('/auth/:id', userController.checkAuth)
router.post('/signIn', userController.signIn)
router.post('/signUp', userController.signUp)
router.put('/:id', userController.updateById)
router.delete('/:id',userController.deleteById)

module.exports = router