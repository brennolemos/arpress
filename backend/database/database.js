const Sequelize = require("sequelize");

const connection = new Sequelize("arpress", "root", "t1c8f4zs4ud3", {
   host: "localhost",
   dialect: "mysql",
   timezone: "-03:00"
});

module.exports = connection;