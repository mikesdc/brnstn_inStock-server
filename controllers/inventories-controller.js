const knex = require('knex')(require('../knexfile'));

const index = (_req, res) => {
  knex('inventories')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving inventories: ${err}`)
    );
};
/**
 * Returns json data for one inventory item requested in req.params.id : (/inventories/:id)
 * 
 */
const singleInventoryItem = (req, res) => {
  // Inventory data knex query
  const itemId = req.params.id;

  knex('inventories')
    .where('inventories.id', itemId)
    .join('warehouses', 'inventories.warehouse_id', 'warehouses.id')
    .select('inventories.*', 'warehouses.warehouse_name')

    .then((itemFound) => {

      // If item not found
      if (itemFound.length === 0) {
        return res
          .status(500)
          .json({ message: `Cannot find inventory item with id: ${req.params.id}` })
      }

      // Response 200
      res.status(200).json(itemFound);
    })
    // Catching errors
    .catch((error) => {
      res
        .status(404)
        .json({
          message: `Unable to retrive data for inventory item: ${req.params.id}
        failed with error: ${error}`
        })
    })
}

module.exports = {
  index,
  singleInventoryItem
}