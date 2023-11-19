const knex = require('knex')(require('../knexfile'));
const { v4: uuidv4 } = require("uuid");


const index = (_req, res) => {
  knex
    .select('inventories.*', 'warehouses.warehouse_name')
    .from('inventories')
    .join('warehouses', 'inventories.warehouse_id', 'warehouses.id')

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

const deleteInventoryItem = (req, res) => {
  knex("inventories")
    .where({ id: req.params.id })
    .del()
    .then((data) => {
      if (data === null) {
        return res.status(404);
      }
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500);
    })
}

// ---------- ADD NEW INVENTORY ITEM (POST) ----------
const createInventoryItem = (req, res) => {
  
	function validateInventoryData(data) {
    const { warehouse_id, item_name, description, category, status, quantity } = data;

    // Check for required fields
    if (!warehouse_id || !item_name || !description || !category || !status || quantity === undefined) {
        throw new Error('Missing properties');
    }

    // Check if quantity is a number
    if (isNaN(quantity)) {
        throw new Error('Quantity must be a number');
    }

    return true;
}

const newInventoryItemId = uuidv4();
  knex("inventories")
    .insert({ ...req.body, id: newInventoryItemId })
    .then((_data) => {
      knex("inventories")
        .where({ id: newInventoryItemId })
        .then((data) => {
          res.status(201).json(data[0]);
        });
    })
    .catch((err) =>
      res.status(400).send(`Error creating inventory Item: ${err}`)
    );
};

// ---------- UPDATE INVENTORY ITEM (PUT/EDIT) ----------

const updateInventoryItem = (req, res) => {
  // Response returns 404 if inventory ID is not found or quantity is NaN
	if (!warehouse_id || typeof quantity !== 'number') {
    return res.status(400).send('Invalid request data');
  }
	knex("inventories")
    .update(req.body)
    .where({ id: req.params.id })
    .then((_data) => {
      knex("inventories")
        .where({ id: req.params.id })
        .then((data) => {
          res.status(200).json(data[0]);
        });
    })
    .catch((err) =>
      res.status(400).send(`Error Updating Inventory Item ${req.params.id} ${err}`)
    );
};




module.exports = {
  index,
  singleInventoryItem,
  deleteInventoryItem,
	createInventoryItem,
	updateInventoryItem
}