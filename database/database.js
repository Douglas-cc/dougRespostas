const Sequelize = require('sequelize');

const connection = new Sequelize('quis', 'root', 'jedi1290', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;