import express from "express";
import dotenv from "dotenv"; // for creating .env file in the root to store environment variables
import productRoutes from "./Routes/productRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
const app = express();
import path from "path";

import bodyParser from "body-parser";

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// post api/users/login
// @desc login user
// @access public
app.use("/api/products", jsonParser, productRoutes);
app.use("/api/users", jsonParser, userRoutes);
app.use("/api/orders", jsonParser, orderRoutes);
dotenv.config();
import products from "./data/products.js";
import nodemailer from "nodemailer";
import connectDB from "./config/db.js";
connectDB();
app.use(express.json()); // to post json data
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// paypal route
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.listen(5000, console.log("server listening on port " + process.env.PORT));
