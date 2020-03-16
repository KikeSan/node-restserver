const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
/**
 * fileUpload() trae lo que sea q se esté subiendo y lo coloca en req.files
 */
app.use(fileUpload());

app.put('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      err: {
        message: 'No se ha seleccionado ningún archivo'
      }
    });
  }

  // The name of the input field (i.e. "archivo") is used to retrieve the uploaded file
  let archivo = req.files.archivo;
  let nombreCortado = archivo.name.split('.');
  let extension = nombreCortado[nombreCortado.length - 1];

  console.log(extension);

  // Use the mv() method to place the file somewhere on your server
  // Extensiones permitidas
  let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

  if (extensionesValidas.indexOf(extension) < 0) {
    return res.status(400).json({
      ok: false,
      err: {
        message: `Las extensiones permitidas son ${extensionesValidas.join(
          ', '
        )}`,
        ext: extension
      }
    });
  }

  archivo.mv(`uploads/${archivo.name}`, err => {
    if (err)
      return res.status(500).json({
        ok: false,
        err
      });

    res.json({
      ok: true,
      message: 'Imagen subida correctamente'
    });
  });
});

module.exports = app;
