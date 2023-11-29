const express = require('express');
const router = express.Router();
const controller = require('../controllers/Auction');
const endedController=require('../controllers/EndAuction')
router
.post('/', controller.AddAuction,endedController.endAuction)
.get('/', controller.GetAllAuction,endedController.endAuction)
.get('/GetById/:id', controller.GetAllById,endedController.endAuction)
.get('/:id', controller.GetSinglAuction,endedController.endAuction)
.put('/:id', controller.UpdateSinglAuction,endedController.endAuction)
.delete('/:id', controller.DeleteSinglAuction,endedController.endAuction)

module.exports = router;

