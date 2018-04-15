module.exports = (callback) => {
    return (req, res, next) => {
        req.Debug = require('./debug')(req);

        const send = res.send;
        const startTime = Date.now();

        res.send = function (json) {
            send.call(this, json);
            const endTime = Date.now();

            const profile = {
                request: {
                    uri: req.originalUrl,
                    method: req.method,
                    headers: req.headers,
                    params: req.params,
                    query: req.query,
                    body: req.body
                },
                response: {
                    status: {
                        code: res.statusCode,
                        message: res.statusMessage
                    },
                    body: json
                },
                date: endTime,
                elapsedTime: endTime - startTime,
                logs: req.logs
            };

            if (callback) {
                callback(req, res, profile);
            }
        };
        next();
    }
};
