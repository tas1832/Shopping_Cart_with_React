const path = require("path");
const express = require("express");
const cors = require("cors");
const products = require("./products");

const app = express();

const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to our shop API!");
});

app.get("/api/products", (req, res) => {
  res.send(products);
});
app.get("/api/products/:id", (req, res) => {
  const product = products.find((item) => item._id === parseInt(req.params.id));
  res.send(product);
});

const port = process.env.PORT || 8000;

app.listen(port, console.log(`Server is running on port ${port}.....`));
