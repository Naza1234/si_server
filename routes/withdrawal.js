const express = require('express');
const router = express.Router();
const controller = require('../controllers/withdrawal');
const endedController=require('../controllers/EndAuction');

router
.post('/', controller.Addwithdrawal,endedController.endAuction)
.get('/', controller.GetAllwithdrawal,endedController.endAuction)
.get('/:id', controller.GetSinglwithdrawal,endedController.endAuction)
.put('/:id', controller.UpdateSinglwithdrawal,endedController.endAuction)
.delete('/:id', controller.DeleteSinglwithdrawal,endedController.endAuction)

module.exports = router;

