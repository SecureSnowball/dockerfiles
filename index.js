const express = require("express");
const app = express();
const date = new Date();

app.get('/', (req, res) => res.json({ msg: `Hello world at ${date}` }));
app.listen(3000);