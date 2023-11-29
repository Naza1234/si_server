const express = require('express');
const router = express.Router();
const controller = require('../controllers/productimage');
const endedController=require('../controllers/EndAuction')


router
.post('/',controller.uplaod,controller.AddproductImage,endedController.endAuction)
.get('/', controller.GetAllproductImage,endedController.endAuction)
.get('/:id', controller.GetSinglproductImage,endedController.endAuction)
.put('/:id', controller.UpdateSinglproductImage,endedController.endAuction)
.delete('/:id', controller.DeleteSinglproductImage,endedController.endAuction)

module.exports = router;

