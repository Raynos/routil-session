# routil-session [![build status][1]][2]

Session handling for routil

## Example

    var Session = require("routil-session")
        , session = Session({
            store: require("memory-store")
        })
        , http = require("http")

    http.createServer(handler).listen(8080)

    function handler(req, res) {
        if (req.url === "/create") {
            session.createSession(req, res, {
                foo: "foo"
            }, endRespone)
        } else if (req.url === "/get") {
            session.getSession(req, returnSessionData)
        } else if (req.url === "/destroy") {
            session.destroySession(req, res, endResponse)
        }

        function endResponse(err) {
            res.end()
        }

        function returnSessionData(err, data) {
            res.end(data.foo)
        }
    }

## Installation

`npm install routil-session`

## Tests

`make test`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/routil-session.png
  [2]: http://travis-ci.org/Raynos/routil-session