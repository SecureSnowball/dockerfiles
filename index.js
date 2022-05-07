const express = require("express");
const app = express();
const date = new Date();

app.get('/', (req, res) => res.send(`Container restarted at ${date}`));
app.listen(3000);