const express = require("express")
const bcrypt = require("bcryptjs")

const User = require('./../models/user')



const app = express()

app.post('/', async(req, res) => {
    try {
        // 1 - recupération des données mel front
        let data = req.body
            // 1.1 recupération du fichier
        let user = new User({
            username: data.username,
            email: data.email,
            password: data.password,
        })

        console.log(user)

        // 3 - save lel objet
        // 4 - return result to front , result => 201 or 400
        await user.save()

        res.status(201).send({ message: "user saved !" })

    } catch (error) {
        res.status(400).send({ message: "user not saved !", error: error })
    }

})

app.get('/', async(req, res) => {
    try {
        let users = await User.find()

        res.status(200).send(users)

    } catch (error) {
        res.status(400).send({ message: "Error fetching users !", error: error })
    }
})

app.get('/:id', async(req, res) => {
    try {
        let userId = req.params.id

        let user = await User.findOne({ _id: userId })

        if (user)
            res.status(200).send(user)
        else
            res.status(404).send({ message: "User not found !" })

    } catch (error) {
        res.status(400).send({ message: "Error fetching users !", error: error })
    }
})

app.patch('/:id', async(req, res) => {
    try {
        let userId = req.params.id
        let data = req.body

        if (data.hasOwnProperty('password')) {
            data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
        }

        let user = await User.findOneAndUpdate({ _id: userId }, data)

        if (user)
            res.status(200).send({ message: "User updated !" })
        else
            res.status(404).send({ message: "User not found !" })

    } catch (error) {
        res.status(400).send({ message: "Error fetching users !", error: error })
    }

})

app.delete('/:id', async(req, res) => {
    try {
        let userId = req.params.id

        let user = await User.findOneAndDelete({ _id: userId })

        if (user)
            res.status(200).send({ message: "User deleted !" })
        else
            res.status(404).send({ message: "User not found !" })

    } catch (error) {
        res.status(400).send({ message: "Error fetching users !", error: error })
    }
})

module.exports = app