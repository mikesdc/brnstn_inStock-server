const fs = require("fs");
const router = require("express").Router();
const warehousesController = require("../controllers/warehouses-controller");

//routes

router.route("/").get(warehousesController.index);

router.route("/:warehouse_id").get(warehousesController.singleWarehouse);

router.route("/:warehouse_id/inventories").get(warehousesController.singleWarehouseInventory);

router.route("/:warehouse_id").delete(warehousesController.deleteWarehouse);

module.exports = router;
