var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var db = require('../model/database');

passport.use('local-signin', new LocalStrategy(
    {passReqToCallback : true}, //allows us to pass back the request to the callback
    function(req, username, password, done) {
        var users = db.getEntities("User");
        var user;
        for (var id in users){
            var currentUser = users[id];
            if (currentUser.username === username && currentUser.password === password){
                user = currentUser;
            }
        }
        if (user) {
            console.log("LOGGED IN AS: " + user.username);
            req.session.success = 'You are successfully logged in ' + user.username + '!';
            done(null, user);
        }
        if (!user) {
            console.log("COULD NOT LOG IN");
            req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
            done(null, user);
        }

    }
));

passport.serializeUser(function(user, done) {
    console.log("serializing " + user.username);
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    console.log("deserializing " + obj);
    done(null, obj);
});

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login',{invalid: req.session.error});
});

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/', passport.authenticate('local-signin', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

//logs user out of site, deleting them from the session, and returns to homepage
router.get('/logout', function(req, res){
    var name = req.user.username;
    console.log("LOGGIN OUT " + name);
    req.logout();
    res.redirect('/');
    req.session.notice = "You have successfully been logged out " + name + "!";
});


// router.post('/', function(req, res, next) {
//     var username = req.body.username;
//     var password = req.body.password;
//
//     var users = db.getEntities("User");
//     for (var id in users){
//         var currentUser = users[id];
//         if (currentUser.username === username && currentUser.password === password){
//             res.app.locals.currentUser = currentUser;
//         }
//     }
//     if (res.app.locals.currentUser){
//         res.redirect('/');
//     } else {
//         res.render("login",{invalid:true});
//     }
// });
module.exports = router;
