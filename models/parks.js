const db = require("../db/connection");

exports.selectParks = () => {
    return db.query('SELECT * FROM parks;')
        .then(({rows}) => rows)
};

exports.updateParkById = () => {};

exports.removeParkById = () => {};
