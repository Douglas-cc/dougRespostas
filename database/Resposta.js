const Sequelize = require('sequelize');
const connection = require('./database');

const resposta = connection.define('resposta',{
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  perguntaId:{
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

// resposta.sync({force: false}).then(() => {});

module.exports = resposta;