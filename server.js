const express = require("express");
const app = express();
const cors = require("cors");
const uuidv4 = require("uuid");

// setting up env

require("dotenv").config();
let { PORT, BACKEND_URL, CORS_ORIGIN } = process.env;

PORT = process.env.PORT || 8081;


// CORS

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(express.static('public'));

// setting up routes

const videosRoutes = require("./routes/warehouse");
app.use("/warehouse", warehouseRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the InStock API");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});