'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airpane, {
        // A flight will belong to an Airplane
        foreignKey: 'airplaneId'
      });
      this.belongsTo(models.Airport, {
        // In flight-reposiorty, Airport is associated to Flight multiple times below. To identify the correct association, you must use the 'as' keyword to specify the alias of the association you want to include
        foreignKey: 'departureAirportId'
      });
      this.belongsTo(models.Airport, {
        // In flight-reposiorty, Airport is associated to Flight multiple times above. To identify the correct association, you must use the 'as' keyword to specify the alias of the association you want to include.
        foreignKey: 'arrivalAirportId'
      });
    }
  }
  Flight.init({
    flightNumber: {
      // In this project, The same flightNumber can be there for multiple routes, so kept it repeatable.
      type: DataTypes.STRING,
      allowNull: false
    },
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departureAirportId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrivalAirportId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrivalTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    boardingGate: {
      type: DataTypes.STRING,
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};