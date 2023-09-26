const { StatusCodes } = require('http-status-codes');
const { error } = require("../utils/common/error-response");
const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airplanerepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplanerepository.create(data);
        return airplane;
    } catch(error) {
        if(error.name == 'SequelizeValidationError') {
            let explination = [];
            error.errors.forEach((err) => {
                explination.push(err.message);
            })
            console.log(explination);
            throw new AppError(explination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes() {
    try {
        const airplanes = await airplanerepository.getAll();
        return airplanes;
    } catch(error) {
        throw new AppError('Cannot fetch the data of all airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id) {
    try {
        const airplane = await airplanerepository.get(id);
        return airplane;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airplane you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch the data of all airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirplane(id) {
    try {
        const response = await airplanerepository.destroy(id);
        return response;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airplane you requested to delete is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch the data of all airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirplane(id, data) {
    try {
      const response = await airplaneRepository.update(id, data);
      return response;
    } catch (error) {
      if (error.statusCode == StatusCodes.NOT_FOUND) {
        throw new AppError(
          // error.message, //Overriding the error message thrown from the destroy(id) function inside the crud-repository file
          "For the request you made, there is no airplane / column available to update!",
          error.statusCode
        );
      } else if (error.name == "SequelizeValidationError") {
        // If u get a SequelizeValidationError, it is something that is not coming correctly from the client side.  We have to send a meaningful full response to the user/client that this validation is not going correctly, so please correct this field. So status code will also be some client related status code.
        let explanation = [];
        error.errors.forEach((err) => {
          explanation.push(err.message);
        });
        throw new AppError(explanation, StatusCodes.BAD_REQUEST); // Send client-related status code for SequelizeValidationError
      }
      throw new AppError(
        `The airplane's data cannot be updated!`,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }


module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane,
}