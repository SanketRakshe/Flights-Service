const { StatusCodes } = require('http-status-codes');
const { response } = require('express');
const { Logger } = require('../config');
const AppError = require('../utils/errors/app-error');

class CrudRepository {

    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async destroy(data) {
        const response = await this.model.destroy({
            where : {
                id : data
            },
        });
        return response;
    }

    async get(data) {
        const response = await this.model.findByPk(data);
        if(!response) {
            throw new AppError('Not able to found resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async getAll(data) {
        const response = await this.model.findAll();
        return response;
    }

    async update(data) {
        const response = await this.model.update(data, {    //data -> {col: value, ...}
            where : {
                id : id
            }
        });
        return response;
    }
}

module.exports = CrudRepository;