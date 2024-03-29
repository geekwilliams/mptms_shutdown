var net = require('net');

var ping = function (options, callback) {
    var i = 0;
    var results = [];
    options.address = options.address || 'localhost';
    options.port = options.port || 80;
    options.attempts = options.attempts || 10;
    options.timeout = options.timeout || 5000;
    var check = function (options, callback) {
        if (i < options.attempts) {
            connect(options, callback);
        } else {
            var avg = results.reduce(function (prev, curr) {
                return prev + curr.time;
            }, 0);
            var max = results.reduce(function (prev, curr) {
                return (prev > curr.time) ? prev : curr.time;
            }, results[0].time);
            var min = results.reduce(function (prev, curr) {
                return (prev < curr.time) ? prev : curr.time;
            }, results[0].time);
            avg = avg / results.length;
            var out = {
                address: options.address,
                port: options.port,
                attempts: options.attempts,
                avg: avg,
                max: max,
                min: min,
                results: results
            };
            callback(undefined, out);
        }
    };

    var connect = function (options, callback) {
        var s = new net.Socket();
        var start = process.hrtime();
        s.connect(options.port, options.address, function () {
            var time_arr = process.hrtime(start);
            var time = (time_arr[0] * 1e9 + time_arr[1]) / 1e6;
            results.push({ seq: i, time: time });
            s.destroy();
            i++;
            check(options, callback);
        });
        s.on('error', function (e) {
            results.push({ seq: i, time: undefined, err: e });
            s.destroy();
            i++;
            check(options, callback);
        });
        s.setTimeout(options.timeout, function () {
            results.push({ seq: i, time: undefined, err: Error('Request timeout') });
            s.destroy();
            i++;
            check(options, callback);
        });
    };
    connect(options, callback);
};

module.exports.ping = ping;

module.exports.probe = function (address, port, callback) {
    address = address || 'localhost';
    port = port || 80;
    ping({ address: address, port: port, attempts: 1, timeout: 5000 }, function (err, data) {
        var available = data.min !== undefined;
        callback(err, available);
    });
};