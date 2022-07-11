const con = require('../config/knex/knex');
const {
  INTERNAL_SERVER_ERROR_EXCEPTION,
  BAD_REQUEST_EXCEPTION,
  NOT_FOUND_EXCEPTION,
} = require('../config/error');
const {
  FAIL_SHOW_TASK,
  FAIL_CREATE_TASK,
  FAIL_UPDATE_TASK,
  FAIL_DELETE_TASK,
} = require('../commun/constants/errors');
const { TASK_REPOSITORY } = require('../commun/constants/strings');

class TaskRepository {
  async create(description, project_id) {
    try {
      return con('tasks').insert({
        description,
        project_id,
        created_at: new Date(Date.now()),
      });
    } catch (error) {
      throw new INTERNAL_SERVER_ERROR_EXCEPTION(
        TASK_REPOSITORY,
        FAIL_CREATE_TASK
      );
    }
  }

  async getAll(description, project_id) {
    try {
      const tasks = await con('tasks')
        .where({ project_id })
        .andWhere('description', 'like', `%${description}%`);

      return tasks;
    } catch (error) {
      throw new INTERNAL_SERVER_ERROR_EXCEPTION(
        TASK_REPOSITORY,
        FAIL_SHOW_TASK
      );
    }
  }

  async getById(id) {
    try {
      const task = await con('tasks').where({ id }).firts();

      if (!task) throw new NOT_FOUND_EXCEPTION(TASK_REPOSITORY, FAIL_SHOW_TASK);

      return task;
    } catch (error) {
      throw new INTERNAL_SERVER_ERROR_EXCEPTION(
        TASK_REPOSITORY,
        FAIL_SHOW_TASK
      );
    }
  }

  async updateById(id, description, check) {
    try {
      const task = await con('tasks')
        .where({ id })
        .update({ description, check })
        .firts();

      if (!task)
        throw new BAD_REQUEST_EXCEPTION(TASK_REPOSITORY, FAIL_UPDATE_TASK);

      return true;
    } catch (error) {
      throw new INTERNAL_SERVER_ERROR_EXCEPTION(
        TASK_REPOSITORY,
        FAIL_UPDATE_TASK
      );
    }
  }

  async deleteById(id) {
    try {
      const task = await con('tasks').where({ id }).delete();

      if (!task)
        throw new BAD_REQUEST_EXCEPTION(TASK_REPOSITORY, FAIL_DELETE_TASK);

      return true;
    } catch (error) {
      throw new INTERNAL_SERVER_ERROR_EXCEPTION(
        TASK_REPOSITORY,
        FAIL_DELETE_TASK
      );
    }
  }
}

module.exports = new TaskRepository();
