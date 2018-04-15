const castToNumber = (value) => {
    value = parseInt(value);
    return (!isNaN(value) ? value : undefined);
};

const fields = {
    'request.uri': {
        value: 'uri', cast: (value) => {
            return new RegExp(value, 'i');
        }
    },
    'request.method': {value: 'method', cast: null},
    'response.status.code': {
        value: 'status',
        cast: castToNumber
    },
    // 'date': 'date'
};

const makeQueries = (fields, params) => {
    const array = [];
    for (const param of params) {
        for (const key in fields) {
            const field = fields[key];
            let value = param;

            if (field.cast) {
                value = field.cast(value);
                if (value === undefined) {
                    continue;
                }
            }
            const obj = {};
            obj[key] = value;
            array.push(obj);
        }
    }
    return array;
};

module.exports = (model) => {
    return (req, res) => {
        const params = req.query;
        const query = {};

        if (params.search) {
            query['$or'] = makeQueries(fields, params.search.split('|'));
        }

        for (const key in fields) {
            const param = params[fields[key].value];
            if (param !== undefined && param !== 'undefined' && param != null && param !== '') {
                query[key] = param;
            }
        }

        const limits = {
            limit: castToNumber(params.limit) || 10,
        };

        if (params.page !== undefined) {
            limits.skip = params.limit * (limits.page - 1);
        }

        model.find(query, null, limits).sort( [['_id', -1]] ).exec((err, doc) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(doc);
        });
    };
};
