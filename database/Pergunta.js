const Sequelize = require('sequelize');
const connection = require('./database');

const pergunta = connection.define('pergunta', {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

// pergunta.sync({force: false}).then(() => {});

module.exports = pergunta;