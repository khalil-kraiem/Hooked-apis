const express = require("express")
const cors = require("cors")

// import database connection
const mongoose = require("./config/db")

const usersController = require("./controllers/usersController")

const app = express()
const port = 3000

// autorisé les données de type JSON
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use(cors())

app.use(express.static('./assets/images'));
app.use(express.static('./assets/images/users'));

app.use("/users", usersController)

app.listen(port, () => { console.log(`🟢 Server started on port ${port}`); })