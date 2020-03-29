import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // inicia conexão
    this.connection = new Sequelize(databaseConfig);

    // para cada model, inicializa o model
    models
      .map((model) => model.init(this.connection))
      .map((model) => {
        return model.associate && model.associate(this.connection.models);
      });
  }
}

export default new Database();
