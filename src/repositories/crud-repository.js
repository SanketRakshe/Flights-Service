const { response } = require('express');
const { Logger } = require('../config');

class CrudRepository {

    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try{
            const response = await this.model.create(data);
            return response;
        } catch(error) {
            Logger.error('Something went wrong in crud Repo : create');
            throw error;
        }
        
    }

    async destroy(data) {
        try {
            const response = await this.model.destroy({
                where : {
                    id : data
                },
            });
            return response;
        } catch(error) {
            Logger.error('Something went wrong in crud Repo : destroy');
            throw error;
        }
    }

    async get(data) {
        try {
            const response = await this.model.findByPk(data);
            return response;
        } catch(error) {
            Logger.error('Something went wrong in crud Repo : get');
            throw error;
        }
    }

    async getAll(data) {
        try {
            const response = await this.model.findAll();
            return response;
        } catch(error) {
            Logger.error('Something went wrong in crud Repo : get');
            throw error;
        }
    }

    async update(data) {
        try {
            const response = await this.model.update(data, {    //data -> {col: value, ...}
                where : {
                    id : id
                }
            });
            return response;
        } catch(error) {
            Logger.error('Something went wrong in crud Repo : update');
            throw error;
        }
    }
}

module.exports = CrudRepository;