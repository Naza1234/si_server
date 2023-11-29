const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart');
const endedController=require('../controllers/EndAuction')
router
.post('/', controller.Addcart)
.get('/', controller.GetAllcart,endedController.endAuction)
.get('/ByUserId/:id', controller.GetcartByUesrId,endedController.endAuction)
.get('/:id', controller.GetSinglcart,endedController.endAuction)
.put('/:id', controller.UpdateSinglcart,endedController.endAuction)
.delete('/:id', controller.DeleteSinglcart,endedController.endAuction)

module.exports = router;

