const db = require('../connection')

const Users= function(user){
    this.name= user.name
    this.email= user.email
}

Users.getAllUsers = (results)=>{
    db.query('SELECT * FROM info', (err, result) => {
        if (err) {
            console.log("error while fetching", err);
            results(null, err)
        } else {
            console.log('fetched successfully');
            results(null, result)

        }
    })
}

Users.getUserById = (id, results) => {
    db.query('SELECT * FROM info WHERE id=?', id, (err, result) => {
        if (err) {
            console.log("error while fetching User by Id", err);
            results(null, err)
        } else {
            console.log('fetched successfully');
            results(null, result)

        }

    })
}


Users.addNewUser = (reqData, results) => {
    db.query('INSERT INTO info(name, email) value(?,?)',
        [reqData.name, reqData.email],
        (err, result) => {
            if (err) {
                console.log("error while adding", err);
                results(null, err)
            } else {
                console.log("Person Added successfully");
                results(null, result)
            }
        })
}

Users.deleteUserById = (id, results) => {
    db.query('DELETE FROM info WHERE id=?', id, (err, result) => {
        if (err) {
            console.log("error while deleted User by Id", err);
            results(null, err)
        } else {
            console.log('deleted successfully');
            results(null, result)

        }

    })
}


module.exports= Users;