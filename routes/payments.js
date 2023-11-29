const express = require('express');
const router = express.Router();
const controller = require('../controllers/payments');
const endedController=require('../controllers/EndAuction')
router
.post('/', controller.Addpayment,endedController.endAuction)
.get('/', controller.GetAllpayment,endedController.endAuction)
.get('/approved/:id', controller.approved,endedController.endAuction)
.get('/:id', controller.GetSinglpayment,endedController.endAuction)
.put('/:id', controller.UpdateSinglpayment,endedController.endAuction)
.delete('/:id', controller.DeleteSinglpayment,endedController.endAuction)

module.exports = router;

