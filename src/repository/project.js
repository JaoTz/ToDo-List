const con = require('../config/knex/knex');
const {
  INTERNAL_SERVER_ERROR_EXCEPTION,
  BAD_REQUEST_EXCEPTION,
} = require('../config/error');
const {
  FAIL_SHOW_PROJECT,
  FAIL_CREATE_PROJECT,
  FAIL_UPDATE_PROJECT,
  FAIL_DELETE_PROJECT,
  NOT_FOUND_PROJECT_ID,
} = require('../commun/constants/errors');
const { PROJECT_REPOSITORY } = require('../commun/constants/strings');

class ProjectRepository {
  async create(name, user_id) {
    try {
      return con('projects').insert({ name, user_id });
    } catch (error) {
      throw new INTERNAL_SERVER_ERROR_EXCEPTION(
        PROJECT_REPOSITORY,
        FAIL_CREATE_PROJECT
      );
    }
  }

  async getAll(name, user_id) {
    try {
      const projects = await con('projects')
        .where({ user_id })
        .andWhere('name', 'like', `%${name}%`);

      return projects;
    } catch (error) {
      throw new INTERNAL_SERVER_ERROR_EXCEPTION(
        PROJECT_REPOSITORY,
        FAIL_SHOW_PROJECT
      );
    }
  }

  async getById(id) {
    try {
      const project = await con('projects').where({ id }).firts();

      if (!project)
        throw new NOT_FOUND_EXCEPTION(PROJECT_REPOSITORY, NOT_FOUND_PROJECT_ID);

      return project;
    } catch (error) {
      throw new INTERNAL_SERVER_ERROR_EXCEPTION(
        PROJECT_REPOSITORY,
        FAIL_SHOW_PROJECT
      );
    }
  }

  async updateById(id, name) {
    try {
      const project = await con('projects')
        .where({ id })
        .update({ name })
        .firts();

      if (!project)
        throw new BAD_REQUEST_EXCEPTION(
          PROJECT_REPOSITORY,
          FAIL_UPDATE_PROJECT
        );

      return true;
    } catch (error) {
      throw new INTERNAL_SERVER_ERROR_EXCEPTION(
        PROJECT_REPOSITORY,
        FAIL_UPDATE_PROJECT
      );
    }
  }

  async deleteById(id) {
    try {
      const project = await con('projects').where({ id }).delete();

      if (!project)
        throw new BAD_REQUEST_EXCEPTION(
          PROJECT_REPOSITORY,
          FAIL_DELETE_PROJECT
        );

      return true;
    } catch (error) {
      throw new INTERNAL_SERVER_ERROR_EXCEPTION(
        PROJECT_REPOSITORY,
        FAIL_DELETE_PROJECT
      );
    }
  }
}

module.exports = new ProjectRepository();
