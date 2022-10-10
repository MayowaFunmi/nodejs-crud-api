const personModel = require('../models/crud/people');

// create and save a new user
exports.create = async(req, res) => {
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone) {
        res.status(400).send({ message: "Fields can not be empty" })
    }

    const person = new personModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
    })

    await person.save()
        .then(data => {
            res.send({
                message: "Person created successfully",
                person: data
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message: err.message || "Some error occurred whle creating user"
            })
        })
}

// Retrieve all users from the database
exports.findAll = async(req, res) => {
    try {
        const persons = await personModel.find();
        res.status(200).json(persons)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// Find a single user with an id
exports.findOne = async(req, res) => {
    const id = req.params.id;
    try {
        const person = await personModel.findById(id);
        res.status(200).json(person)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// update a user by the id in the request
exports.update = async(req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Data to update is empty" });
    }

    const id = req.params.id;
    await personModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "User not found" })
            } else {
                res.send({ message: "User Updates Successfully" })
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message })
        })
}

// Delete a user with the specified id in the request
exports.destroy = async(req, res) => {
    await personModel.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "user not found" })
            } else {
                res.send({ message: "User deleted successfully" })
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message })
        })
}