const express = require("express")
const Usuario = require("../models/usuario")
const bcrypt = require("bcrypt")
const _ = require("underscore")

const app = express()

app.get("/usuario", function(req, res) {
  let desde = Number(req.query.desde) || 0
  let limite = Number(req.query.limite) || 5
  //desde = Number(desde)

  Usuario.find({})
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        })
      }

      res.json({
        ok: true,
        usuarios
      })
    })
})

app.post("/usuario", function(req, res) {
  let body = req.body

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  })

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    //usuarioDB.password = null

    res.json({
      ok: true,
      usuario: usuarioDB
    })
  })

  /* if (body.nombre === undefined) {
    res.status(400).json({
      ok: false,
      mensaje: "El nombre es necesario"
    })
  } else {
    res.json({
      usuario: body
    })
  } */
})

app.put("/usuario/:id", function(req, res) {
  let id = req.params.id
  /**
   * Aquí voy a filtrar solo los campos que quiero actualizar
   * ["nombre", "email", "img", "role", "estado"]
   */
  let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"])

  Usuario.findByIdAndUpdate(
    id,
    body,
    {
      new: true, //Me muestra la colección actual en mongodb
      runValidators: true //corre las validaciones de nuestro Schema
    },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        })
      }

      res.json({
        ok: true,
        usuario: usuarioDB
      })
    }
  )

  /*  */
})

app.delete("/usuario", function(req, res) {
  res.json("delete usuario")
})

module.exports = app