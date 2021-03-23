const connection = require('./connection');

const favourites = {
    list() {
        return new Promise((res, rej) => connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
            if (err) {
                throw err
            }

            var r = 'The solution is: ' +  rows[0].solution;

            res(r);
        }));
    }
}

module.exports = favourites;