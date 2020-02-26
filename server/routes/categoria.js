const express = require("express")

let { verificaToken } = require("../middlewares/autenticacion")

let app = express()

let Categoria = require("../models/categoria")

/**
 * Mostrar todas las categorias
 */
app.get("/categoria/", (req, res) => {
  Categoria.find().exec((err, categorias) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      categorias
    })
  })
})

/**
 * Mostrar una categoria por ID
 */
app.get("/categoria/:id", (req, res) => {
  //Categoria.findById(...)
})

/**
 * agregar una categoria
 */
app.post("/categoria/", verificaToken, (req, res) => {
  //req.usuario._id
  let body = req.body

  let categoria = new Categoria({
    descripcion: body.descripcion,
    usuario: req.usuario._id
  })

  categoria.save((err, categoriaDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if (!categoriaDB) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      categoria: categoriaDB
    })
  })
})

/**
 * Mofificar una categoria
 */
app.put("/categoria/:id", (req, res) => {
  let id = req.params.id
  let body = req.body

  let descCategoria = {
    descripcion: body.descripcion
  }

  Categoria.findByIdAndUpdate(
    id,
    {
      new: true, //Me muestra la colección actual en mongodb
      runValidators: true //corre las validaciones de nuestro Schema
    },
    (err, categoriaDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        })
      }

      if (!categoriaDB) {
        return res.status(400).json({
          ok: false,
          err
        })
      }

      res.json({
        ok: true,
        categoria: categoriaDB
      })
    }
  )
})

/**
 * Eliminar una categoria
 */
app.delete("/categoria/:id", (req, res) => {})

module.exports = app
