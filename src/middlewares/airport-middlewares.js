const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
    if(!req.body.name) {
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = new AppError(['name not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.code) {
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = new AppError(['Airport code not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.cityId) {
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = new AppError(['City Id not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

function validateUpdateRequest(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      ErrorResponse.message = "Failed to update an Airport";
      ErrorResponse.error = new AppError(
        ["The Data was not found in the incoming request"],
        StatusCodes.BAD_REQUEST
      );
  
      return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
  }

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}