module.exports = (mongoose, MONGO_PROFILER_URI) => {
    const Schema = mongoose.Schema;
    const mongo = mongoose.createConnection(MONGO_PROFILER_URI);

    const RequestSchema = new Schema({
        request: new Schema({
            uri: {type: String, index: true},
            method: {type: String, index: true},
            headers: {type: Schema.Types.Mixed},
            params: {type: Schema.Types.Mixed},
            query: {type: Schema.Types.Mixed},
            body: {type: Schema.Types.Mixed}
        }, {versionKey: false, _id: false}),
        response: new Schema({
            status: new Schema({
                code: {type: Number, index: true},
                message: {type: String}
            }, {versionKey: false, _id: false}),
            body: {type: Schema.Types.Mixed}
        }, {versionKey: false, _id: false}),
        user: {type: Schema.Types.Mixed},
        date: {type: Date, index: true},
        elapsedTime: {type: Number},
        logs: {type: Schema.Types.Mixed}
    }, {versionKey: false});

    return mongo.model('Request', RequestSchema);
};
