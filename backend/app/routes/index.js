const userRoutes = require('./users');

module.exports = function(app, db) {
    userRoutes(app, db);
}