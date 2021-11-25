/* Check development */
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

/* Initial setup */
const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const indexRouter = require("./routes/index")
const authorsRouter = require("./routes/authors")
const bookRouter = require("./routes/books")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")

/* Initial Sets & Uses */
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", __dirname + "/views/layouts/layout")
app.use(expressLayouts)
app.use(express.static("public"))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
app.use(methodOverride("_method"))
/* MONGOOSE */
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection

//Check error
db.on("error", (error) => { console.error(error) })
db.once("open", () => { console.log("connected to mongoose") })

/*  ROUTES  */
app.use("/", indexRouter)
app.use("/authors", authorsRouter)
app.use("/books", bookRouter)

/* Deploy to port */
app.listen(process.env.PORT || 3000)