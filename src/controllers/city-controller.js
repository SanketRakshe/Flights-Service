const { StatusCodes } = require('http-status-codes');

const { CityService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');


/**
 * POST : /cities 
 * req-body {name: 'London'}
 */
async function createCity(req, res) {
    try {
        const city = await CityService.createCity({
            name: req.body.name
        });
        SuccessResponse.data = city;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

/**
 * GET : /cities
 * req-body {}
 */

async function getCities(req, res) {
    try {
        const cities = await CityService.getCities();
        SuccessResponse.data = cities;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}


/**
 * GET : /Cities/:id
 * req-body {}
 */
async function getCity(req, res) {
    try {
        const City = await CityService.getCity(req.params.id);
        SuccessResponse.data = City;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}


/**
 * DELETE : /cities/:id
 * req-body {}
 */

async function destroyCity(req, res) {
    try {
        const cities = await CityService.destroyCity(req.params.id);
        SuccessResponse.data = cities;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}


/*
method: PATCH request 
URL: /cities/:id
data: req.body: {id,{data}}
*/
async function updateCity(req, res) {
    try {
      const cities = await CityService.updateCity(req.params.id, req.body);
      SuccessResponse.data = cities;
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  }




module.exports = {
    createCity,
    getCities,
    getCity,
    destroyCity,
    updateCity,
}