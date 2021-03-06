var Session = require("..")
    , session = Session({
        store: require("mongo-store")({
            collection: require("mongo-col")("sessions")
        })
    })
    , http = require("http")

http.createServer(handler).listen(8080)

function handler(req, res) {
    if (req.url === "/create") {
        session.createSession(res, {
            foo: "data!"
        }, endResponseCreate)
    } else if (req.url === "/get") {
        session.getSession(req, returnSessionData)
    } else if (req.url === "/destroy") {
        session.destroySession(req, res, endResponseDelete)
    }

    function endResponseCreate(err) {
        res.end("created!")
    }

    function endResponseDelete(err) {
        res.end("deleted!")
    }

    function returnSessionData(err, data) {
        res.end((data && data.foo) || "no data")
    }
}