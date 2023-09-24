const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const airplanerepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplanerepository.create(data);
        return airplane;
    } catch(error) {
        throw error;
    }
}

module.exports = {
    createAirplane
}