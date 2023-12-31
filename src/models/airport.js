'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City, {
        // Airports belong to a City and Foreign Key is the cityId inside the airports table based on u say Airports belong to a City.
        foreignKey: "cityId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(models.Flight, {
        // 1 Airport can have many Flights
        foreignKey: "departureAirportId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(models.Flight, {
        // 1 Airport can have many Flights
        foreignKey: "arrivalAirportId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Airport.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      unique: true
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};