require("./config/config")

const express = require("express")
const mongoose = require("mongoose")

const app = express()
const bodyParser = require("body-parser")

/**
 * APP.USE cada vez q hay esto es un middleware
 */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/**
 * CONFIGURACION GLOBAL DE RUTAS
 */
app.use(require("./routes/index"))

mongoose.connect(
  process.env.URLDB,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  (err, res) => {
    if (err) throw err

    console.log("Base de datos ONLINE")
  }
)

app.listen(process.env.PORT, () => {
  console.log("Escuchando puerto: ", process.env.PORT)
})
