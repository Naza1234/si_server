const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
const endedController=require('../controllers/EndAuction')


router
.post('/signup',controller.AddUsers,endedController.endAuction)
.post('/login',controller.login,endedController.endAuction)
.post('/pay',controller.pay,endedController.endAuction)
.get('/emailVerification/:id',controller.verifyUserEmail,endedController.endAuction)
.get('/', controller.GetAllUsers,endedController.endAuction)
.get('/payedProducts/:id', controller.getPayedProducts,endedController.endAuction)
.get('/products', controller.getProducts,endedController.endAuction)
.get('/cart/:id', controller.getCartItems,endedController.endAuction)
.get('/:id', controller.GetSingleUsers,endedController.endAuction)
.put('/:id', controller.UpdateSingleUsers,endedController.endAuction)
.delete('/:id', controller.DeleteSingleUsers,endedController.endAuction)


module.exports = router;

