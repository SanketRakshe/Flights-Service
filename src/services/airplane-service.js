const { StatusCodes } = require('http-status-codes');

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

module.exports = {
    createAirplane,
    getAirplanes,
}