require("dotenv").config();

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 5000;
const db = mysql.createPool({
  connectionLimit: 10,
  host: "mysql",
  port: "3306",
  user: "test",
  password: "9908",
  database: "infragame_dev",
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "infragame",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 60 * 24,
    },
  })
);

require("./monitoring")(app);
require("./connexion")(app, db);
require("./games")(app);
require("./tables/users")(app, db);
require("./feedBack")(app, db);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
