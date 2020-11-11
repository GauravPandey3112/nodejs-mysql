const UsersModel= require('../models/Users.model')

// get all UserssList
exports.getUsersList = (req, res) => {
    UsersModel.getAllUsers((err, results) => {
        if (err) throw err;
        return res.send({ error: false, data: results, message: 'complete Data' })
    })
}

// get person by ID
exports.getUserById = (req, res) => {
    UsersModel.getUserById(req.params.id, (err, results) => {
        if (err) throw err;
        return res.send({ error: false, data: results[0], message: 'user by id' })
    })
}

// ADD new Person
exports.addNewUser = (req, res) => {
    const userReqData = new UsersModel(req.body)
    console.log("Add Person", userReqData);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ success: false, message: "Please fill all fields" })
    } else {

        UsersModel.addNewUser(userReqData, (err, results) => {
            if (err) throw err;
            return res.send({ error: false, data: results, message: 'user added' })
        })
    }
}

exports.deleteUserById = (req, res) => {
    UsersModel.deleteUserById(req.body.id, (err, results) => {
        if (err) throw err;
        return res.send({ error: false, data: results, message: 'user deleted' })
    })
}