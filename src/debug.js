module.exports = (obj) => {
    obj.logs = [];
    return {
        log: (data) => {
            obj.logs.push({level: 'log', data: data});
        },
        info: (data) => {
            obj.logs.push({level: 'info', data: data});
        },
        debug: (data) => {
            obj.logs.push({level: 'debug', data: data});
        },
        warn: (data) => {
            obj.logs.push({level: 'warn', data: data});
        },
        error: (data) => {
            obj.logs.push({level: 'error', data: data});
        }
    }
};
