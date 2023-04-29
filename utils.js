const { rides } = require("./db/data");
const { selectParks } = require("./models/parks");


exports.pgFormat = (arr) => {
    return arr.map(({park_name, year_opened, annual_attendance}) => [park_name, year_opened, annual_attendance])
};

exports.prepareRidesData = (addedParks) => {
   const updatedRides = [...rides]
    for (let ride of updatedRides) {
        const idToInsert = addedParks
            .filter((park) => park.park_name === ride.park_name)
            .map(({park_id}) => [park_id])
        delete ride.park_name;
        ride.park_id = parseInt(idToInsert);
    };
   return updatedRides.map(({ride_name, year_opened, votes, park_id}) => [ride_name, year_opened, votes, park_id]);
};
