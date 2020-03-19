const express = require('express');
const fs = require('fs');
const path = require('path');

let app = express();

app.get('/imagen/:tipo/:img', (req, res) => {
  let tipo = req.params.tipo;
  let img = req.params.img;

  let pathImg = `./uploads/${tipo}/${img}`;

  //path.resolve recibe la ruta, __dirname indica la raiz del app y seguido de coma la ruta
  let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg');

  res.sendFile(noImagePath);
});

module.exports = app;
