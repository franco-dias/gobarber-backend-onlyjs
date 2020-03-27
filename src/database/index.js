import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';

// necessário montar um array de models
const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // inicia conexão
    this.connection = new Sequelize(databaseConfig);

    // para cada model, inicializa o model
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
