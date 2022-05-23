require("dotenv").config();

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 5000;
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());

require("./monitoring")(app);
require("./connexion")(app, db);
require("./games")(app);
require("./tables/users")(app, db);
require("./feedBack")(app, db);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
