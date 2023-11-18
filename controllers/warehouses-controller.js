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


// add new warehouse (POST)
const createWarehouse = (req, res) => {

  // regex phone number validation
const regexPhone = new RegExp(
	/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
	'im'
);
// regex email validation
const regexEmail = new RegExp(
	/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	'i'
);

// destructuring the request body
  const {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email
  } = req.body;

  // Validation: Check if all fields are filled
  if (!warehouse_name || !address || !city || !country || !contact_name || !contact_position || !contact_phone || !contact_email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate phone number and email
  if (!regexPhone.test(contact_phone) || !regexEmail.test(contact_email)) {
      return res.status(400).json({ message: "Invalid phone number or email address" });
  }

  // insert data into database usign knex
  knex('warehouses').insert({
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email
  })

  // .returning('id') method --> after insertion, tells Knex to return the value of the id column of the new row.
  .returning('id')
    .then(([newWarehouseId]) => {
        return knex('warehouses').where({ id: newWarehouseId }).first();
    })

    .then(newWarehouse => {
        res.status(201).json(newWarehouse);
    })

    .catch(error => {
        res.status(500).json({ message: `Server error: ${error.message}` });
    });
};

module.exports = {
  index,
  singleWarehouse,
  singleWarehouseInventory,
  createWarehouse
}