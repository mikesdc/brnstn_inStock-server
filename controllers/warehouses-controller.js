const knex = require('knex')(require('../knexfile'));

const index = (_req, res) => {
  knex('warehouses')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Users: ${err}`)
    );
};

/**
 * Returns Json data for one warehouse in requested in req.params.warehouse_id : (/warehouse_id)
 * @param {AxiosRequest} req 
 * @param {AxiosResponse} res
 * @returns {{id: number, warehouse_name: String, address: String, country: String, contact_name: String, contact_position: String, contact_phone: String,contact_email: String,created_at: EpochTimeStamp, updated_at: EpochTimeStamp} }
 */
const singleWarehouse = (req, res) => {
  //Warehouse data knex query
  knex('warehouses')
  .where({ id: req.params.warehouse_id })
  .then((warehousesFound) => {

    //If warehouse not found
    if(warehousesFound.length === 0) {
      return res
      .status(404)
      .json({message: `Cannot find warehouse with id: ${req.params.warehouse_id}`})
    }

    //Response 200
    res.status(200).json(warehousesFound[0]);
  })

  //Catching errors, Gotta catch em all 🐉
  .catch((error) => {
    res.status(500)
    .json({message: `Unable to retrieve data for warehouse: ${req.params.warehouse_id} 
    failed with error: ${error}`})
  });
}

/**
 * Returns Json Array data for one warehouse inventory in requested in req.params.warehouse_id/inventories : (/warehouse_id/inventories)
 * @param {AxiosRequest} req 
 * @param {AxiosResponse} res
 * @returns {[{"id": number(Primary Key),"warehouse_id": number(Foreign Key),"item_name": String, "description": String,"category": String, status : "Out of Stock" | "In Stock" , quantity": number,"created_at": EpochTimeStamp,"updated_at": EpochTimeStamp}, ...]}
 */
const singleWarehouseInventory = (req, res) => {
  knex('inventories')
  .where({warehouse_id: req.params.warehouse_id})
  .then((inventoryFound) => {

    //If inventory not found
    if(inventoryFound === 0) {
      return res
      .status(404)
      .json({message: `Cannot find inventory for warehouse id: ${req.params.warehouse_id}`})
    }

    //Response 200
    res.status(200).json(inventoryFound);
  })

  //Catching errors, Gotta catch em all 🐉
  .catch((error) => {
    res.status(500)
    .json({message: `Unable to retrieve data for warehouse: ${req.params.warehouse_id} 
    failed with error: ${error}`})
  })
}

const deleteWarehouse = (req, res) => {
  knex("warehouses")
    .where({ id: req.params.id })
    .del()
    .then(data => {
      res.sendStatus(204);
    })
    .catch(() =>
      res.status(404)
    );
}


module.exports = {
  index,
  singleWarehouse,
  singleWarehouseInventory,
  deleteWarehouse
}