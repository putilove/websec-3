const Router = require('express')
const router = Router()
const SubscriptionController = require('../controllers/subscriptionController')


router.get('/', SubscriptionController.getById)
router.get('/user/', SubscriptionController.getByUserId)
router.get('/otherUser/', SubscriptionController.getByOtherUserId)
router.post('/', SubscriptionController.create)
router.delete('/', SubscriptionController.deleteByUserIdOtherUserId)

module.exports = router