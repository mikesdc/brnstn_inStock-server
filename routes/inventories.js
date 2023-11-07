const fs = require("fs");
const router = require("express").Router();
const inventoriesController = require("../controllers/inventories-controller");

//routes

router.route("/").get(inventoriesController.index);

module.exports = router;
