const express = require('express');
const router = express.Router();
const controller = require('../controllers/products');
const endedController=require('../controllers/EndAuction')


router
.post('/',controller.Addproducts,endedController.endAuction)
.get('/', controller.GetAllproducts,endedController.endAuction)
.get('/search/:id', controller.getProductBySearch,endedController.endAuction)
.get('/vendorProducts/:id', controller.GetAllproductsByvid,endedController.endAuction)
.get('/:id', controller.GetSingleproducts,endedController.endAuction)
.put('/:id', controller.UpdateSingleproducts,endedController.endAuction)
.delete('/:id', controller.DeleteSingleproducts,endedController.endAuction)

module.exports = router;

