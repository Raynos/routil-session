var http = require("http")
    , test = require("testling")
    , request = require("request")
    , routilSession = require("..")
    , session = routilSession()
    , getSession = session.getSession
    , createSession = session.createSession
    , destroySession = session.destroySession
    , getSessionData = session.getSessionData

var handlers = {
    "/getSession": function (req, res) {
        getSession(req, function (err, data) {
            res.end(data.foo)
        })
    }
    , "/createSession": function (req, res) {
        createSession(res, {
            foo: "bar"
        }, function (err) {
            res.end()
        })
    }
    , "/destroySession": function (req, res) {
        destroySession(req, res, function (err) {
            res.end()
        })
    }
    , "/getSessionData": function (req, res) {
        getSessionData(req, res, function (err, data) {
            res.end(data.foo)
        })
    }
}