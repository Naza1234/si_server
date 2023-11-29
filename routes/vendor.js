const express = require('express');
const router = express.Router();
const controller = require('../controllers/vendor');
const endedController=require('../controllers/EndAuction')


router
.post('/signup',controller.uplaod,controller.AddUsers,endedController.endAuction)
.post('/login',controller.login,endedController.endAuction)
.get('/withdraws/:id', controller.getAllWithdraws,endedController.endAuction)
.get('/funds', controller.getFonds,endedController.endAuction)
.get('/', controller.GetAllUsers,endedController.endAuction)
.get('/:id', controller.GetSingleUsers,endedController.endAuction)
.put('/:id', controller.UpdateSingleUsers,endedController.endAuction)
.delete('/:id', controller.DeleteSingleUsers,endedController.endAuction)

module.exports = router;

