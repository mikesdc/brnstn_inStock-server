const fs = require("fs");
const router = require("express").Router();
const warehousesController = require("../controllers/warehouses-controller");

//routes

router.route("/").get(warehousesController.index);

module.exports = router;
