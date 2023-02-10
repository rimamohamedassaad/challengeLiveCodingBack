const User = require("../models/user");
const jwt = require('jsonwebtoken');

class Controller {

    getAll(req, res, next) {
        User.find({}, (error, result) => {
            if (error) return next(error)
            res.send(result)
        })
    }

    signup(req, res, next) {
        let body = req.body;
        let doc = new User(body);
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    async logIn(req, res, next) {

        const userr = await User.findOne({ email: req.body.email });
        if (!userr) return res.send("email not exist");

        if (req.body.password !== userr.password)
            return res.send("invalid password");

        const token = jwt.sign({ _id: userr._id }, process.env.tokenway);
        res.header('auth-token', token).send(token);
        res.send("done")

    }
}

const controller = new Controller();
module.exports = controller;