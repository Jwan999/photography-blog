var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://jwana:jan51999@ds129733.mlab.com:29733/jwana').then(
    function () {
        console.log("database connected")
    }
).catch(function (error) {
        console.log(error.message);
    }
);

var User = mongoose.model('User', {
    name: String,
    notes: String,
    email: String,
    src: String,
    option: String
});

/* GET home page. */
router.get('/Ads', function (req, res) {
    res.render('Ads');
});

router.get('/photos', function (req, res) {
    res.render('photos');
});

router.get('/registration', function (req, res) {
    res.render('registration');
});

router.get('/api/registration', function (req, res) {
    User.find(function (error, registration) {
        res.json(registration);
    });
});

router.post('/api/registration', function (req, res) {
    var newUser = req.param('user');
    var dataBaseUser = new User(newUser);
    dataBaseUser.save().then(function () {
        console.log("sent")
        res.json({
            isSuccess: true,
            message: "request sent"
        })
    }).catch(function (error) {
        console.log("error", error)
        res.json({
                isSuccess: false,
                message: error.message
            }
        )
    })
});

router.delete('/api/registration', function (req, res) {
    var id = req.param('id');
    User.findByIdAndRemove(id).then(function () {
        res.json({
            isSuccess: true,
            message: "request deleted!"
        });
    }).catch(function (error) {
        res.json({
            isSuccess: false,
            message: error.message
        });
    })
});

router.put('/api/registration', function (req, res) {
    var editing = req.param('user');
    User.findByIdAndUpdate(editing._id, editing).then(function (value) {
        console.log("success", value)
        res.json({
            isSuccess: true,
            message: "changes are saved!"
        });
    }).catch(function (error) {
        console.log("error", error)
        res.json({
            isSuccess: false,
            message: error.message
        });
    });
});
module.exports = router;
