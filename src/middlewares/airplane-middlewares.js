const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
    if(!req.body.modelNumber) {
        ErrorResponse.message = 'Something went wrong while creating airplane';
        ErrorResponse.error = new AppError(['Model number not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

function validateUpdateRequest(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      ErrorResponse.message = "Failed to update an Airplane";
      ErrorResponse.error = new AppError(
        ["The Data was not found in the incoming request"],
        StatusCodes.BAD_REQUEST
      );
  
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (req.body.capacity) {
      const airplaneSeats = req.body.capacity;
      if (airplaneSeats < 0) {
        ErrorResponse.message = "Failed to create an Airplane";
        ErrorResponse.error = new AppError(
          ["The Capacity was not found in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
  
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      }
    }
  
    next(); // If users send the Data properly without any fail then u will call the next middleware (i.e. the controller) using the next() function
  }

module.exports = {
    validateCreateRequest,
    validateUpdateRequest,
}