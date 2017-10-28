const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('../model/database');

passport.use('local-signin', new LocalStrategy(
    {passReqToCallback : true}, //allows us to pass back the request to the callback
    function(req, username, password, done) {
        let user = db.getEntities("User").find(u => u.username === username && u.password === password);
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
    res.render('login');
});

//TODO not working for now (should use passport-remember-me)
function handleRemeberMe(req, res, next) {
    if (req.body.remember) {
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
    } else {
        req.session.cookie.expires = false; // Cookie expires at end of session
    }
    res.redirect('/');
}

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/', function(req, res, next) {
    passport.authenticate('local-signin', function(error, user, info) {
        if(error) {
            return res.status(500).json(error);
        }
        if(!user) {
            return res.status(401).json(info.message);
        }
        res.json({userRole: user.role});
    })(req, res, next);
});

//logs user out of site, deleting them from the session, and returns to homepage
router.get('/logout', function(req, res) {
    const name = req.user.username;
    console.log("LOGGIN OUT " + name);
    req.logout();
    res.redirect('/');
    req.session.notice = "You have successfully been logged out " + name + "!";
});

router.get('/isLoggedIn',function (req, res, next) {
    if (req.user) {
        res.json({userRole: req.user.role});
    }else {
        res.json({})
    }
});

function requireLoggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

router.loggedIn = requireLoggedIn;
module.exports = router;
