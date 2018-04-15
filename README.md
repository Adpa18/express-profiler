# Express Profiler

## Install

`npm install --save-dev express-profiler-middleware`

## Example

```
const {ModelBuilder, Middleware, HandlerBuilder} = require('express-profiler');

const mongoose = require('mongoose');

const model = ModelBuilder(mongoose, "mongodb://localhost:27017/profiler");
const handler = HandlerBuilder(model);

app.use(Middleware((req, res, profile) => {
    profile.user = req.user;
    const request = new model(profile);
    request.save();
}));

app.get('/profiler', handler);

app.listen(3000, () => console.log('Example app listening on port 3000!'))
```