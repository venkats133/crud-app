const monk = require('monk');

let dbUrl = "mongodb://localhost:27017/UM";

const db = monk(dbUrl);
db.on('error', console.error.bind(console, 'MongoDB connection error.'));
module.exports = db;