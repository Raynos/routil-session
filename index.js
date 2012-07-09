var routil = require("routil")
    , routilRedirect = routil.redirect
    , routilCookie = require("routil-cookie")
    , setCookie = routilCookie.setCookie
    , getCookie = routilCookie.getCookie
    , partial = require("ap").partial
    , uuid = require("node-uuid")
    , memoryStore = require("memory-store")

module.exports = Session

function Session(options) {
    var redirect = options.redirect || routilRedirect
        , Store = options.Store || memoryStore
        , cookieName = options.cookieName || "session_id"
        , redirectUri = options.redirectUri || "/session"

    return {
        createSession: createSession
        , getSession: getSession
        , destroySession: destroySession
        , getSessionData: getSessionData
    }

    function createSession(res, data, callback) {
        var sessionId = uuid()
        routil.setCookie(res, cookieName, sessionId)

        Store.set(sessionId, data, callback)
    }

    function destroySession(req, res, callback) {
        var sessionId = routil.getCookie(req, cookieName)
        routil.setCookie(res, cookieName, null, {
            expires: new Date(0)
        })

        if (sessionId === null) {
            return callback(null, false)
        }

        Store.delete(sessionId, callback)
    }

    function getSession(req, callback) {
        var sessionId = routil.getCookie(req, cookieName)

        if (sessionId === null) {
            return callback(null, null)
        }

        Store.get(sessionId, callback)
    }

    function getSessionData(req, res, callback) {
        getSession(req, callback, partial(redirectIfNull, req, res))
    }

    function redirectIfNull(req, res, callback, err, data) {
        if (err) {
            return callback(err)
        }

        if (data === null) {
            return redirect(req, res, redirectUri)
        }

        callback(null, data)
    }
}