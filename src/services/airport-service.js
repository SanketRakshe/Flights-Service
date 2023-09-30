const { StatusCodes } = require('http-status-codes');
const { error } = require("../utils/common/error-response");
const { AirportRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch(error) {
        if(error.name == 'SequelizeValidationError') {
            let explination = [];
            error.errors.forEach((err) => {
                explination.push(err.message);
            })
            console.log(explination);
            throw new AppError(explination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports() {
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch(error) {
        throw new AppError('Cannot fetch the data of all airports', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch the data of all airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id) {
    try {
        const response = await airportRepository.destroy(id);
        return response;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested to delete is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch the data of all airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(id, data) {
    try {
      const response = await airportRepository.update(id, data);
      return response;
    } catch (error) {
      if (error.statusCode == StatusCodes.NOT_FOUND) {
        throw new AppError(
          // error.message, //Overriding the error message thrown from the destroy(id) function inside the crud-repository file
          "For the request you made, there is no airport / column available to update!",
          error.statusCode
        );
      } else if (
        error.name == "SequelizeValidationError" ||
        error.name == "SequelizeUniqueConstraintError"
      ) {
        // If u get a SequelizeValidationError, it is something that is not coming correctly from the client side.  We have to send a meaningful full response to the user/client that this validation is not going correctly, so please correct this field. So status code will also be some client related status code.
        let explanation = [];
        error.errors.forEach((err) => {
          explanation.push(err.message);
        });
        throw new AppError(explanation, StatusCodes.BAD_REQUEST); // Send client-related status code for SequelizeValidationError
      } else if (error.name == "SequelizeForeignKeyConstraintError") {
        let explanation = [];
        explanation.push(error.parent.sqlMessage);
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
      }
      throw new AppError(
        `The airport's data cannot be updated!`,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
}


module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport,
}