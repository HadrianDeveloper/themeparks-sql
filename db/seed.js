const { parks, rides, stalls } = require('./data/index.js');
const format = require('pg-format');
const db = require('./connection');
const { pgFormat, prepareRidesData } = require('../utils.js');

function seed() {
  return db
    .query('DROP TABLE IF EXISTS rides;')
    .then(() => {
      return db.query('DROP TABLE IF EXISTS stalls;');
    })
    .then(() => {
      return db.query('DROP TABLE IF EXISTS foods;');
    })
    .then(() => {
      return db.query('DROP TABLE IF EXISTS stalls_foods;');
    })
    .then(() => {
      return db.query('DROP TABLE IF EXISTS parks;');
    })
    .then(() => {
      return createParks();
    })
    .then(() => {
      return createRides();
    })
    .then(() => {
      return addParks();
    })
    .then((addedParks) => {
      return addRides(addedParks);
    })
    .then((addedRides) => console.log(addedRides[0]))
};

function createParks() {
  return db.query(`
    CREATE TABLE parks (
      park_id SERIAL PRIMARY KEY,
      park_name VARCHAR(50) NOT NULL,
      year_opened INT NOT NULL,
      annual_attendance INT NOT NULL
    );
  `)
};

function createRides() {
    return db.query(`
      CREATE TABLE rides (
        ride_id SERIAL PRIMARY KEY,
        ride_name VARCHAR,
        year_opened INT NOT NULL,
        votes INT DEFAULT(0),
        park_id INT REFERENCES parks(park_id)
      );
    `)
};

function addParks() {
  const insertSQL = format(
    `INSERT INTO parks 
    (park_name, year_opened, annual_attendance)
    VALUES %L
    RETURNING *;`, pgFormat(parks)
  );
  return db.query(insertSQL)
    .then(({rows}) => rows)
};

function addRides(addedParks) {
  const querySQL = format(`
    INSERT INTO rides
      (ride_name, year_opened, votes, park_id)
      VALUES %L
      RETURNING *;
  `, prepareRidesData(addedParks));
  return db.query(querySQL)
    .then(({rows}) => rows)
};

module.exports = { seed };