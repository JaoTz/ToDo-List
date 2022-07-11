const { OK_CODE } = require('../commun/constants/statusCode');
const TaskRepository = require('../repository/task');

class TaskService {
  /**
   * @param { import("express").Request } req
   * @param { import("express").Response } res
   * @returns { Promise<Tasks> }
   */
  async getAll(req, res) {
    const { description, project_id } = req.body;
    const task = await TaskRepository.getAll(description, project_id);

    return res.status(OK_CODE).json(task);
  }

  /**
   * @param { import("express").Request } req
   * @param { import("express").Response } res
   * @returns { Promise<Task> }
   */
  async getById(req, res) {
    const { id } = req.params;
    const task = await TaskRepository.getById(id);

    return res.status(OK_CODE).json(task);
  }

  /**
   * @param { import("express").Request } req
   * @param { import("express").Response } res
   * @returns { Promise<Task> }
   */
  async create(req, res) {
    const { description, project_id } = req.body;
    const task = await TaskRepository.create(description, project_id);

    return res.status(OK_CODE).json(task);
  }

  /**
   * @param { import("express").Request } req
   * @param { import("express").Response } res
   * @returns { Promise<Boolean> }
   */
  async updateById(req, res) {
    const { id } = req.params;
    const { description, check } = req.body;
    const task = await TaskRepository.updateById(id, description, check);

    return res.status(OK_CODE).json(task);
  }

  /**
   * @param { import("express").Request } req
   * @param { import("express").Response } res
   * @returns { Promise<Boolean> }
   */
  async deleteById(req, res) {
    const { id } = req.params;
    const task = await TaskRepository.deleteById(id);

    return res.status(OK_CODE).json(task);
  }
}

module.exports = new TaskService();
