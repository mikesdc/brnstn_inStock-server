const fs = require("fs");
const router = require("express").Router();
const inventoriesController = require("../controllers/inventories-controller");

//routes

router.route("/").get(inventoriesController.index);

router.route("/:id").get(inventoriesController.singleInventoryItem);

router.route("/:id").delete(inventoriesController.deleteInventoryItem);

router.route("/inventories").post(warehousesController.createInventoryItem);




module.exports = router;
