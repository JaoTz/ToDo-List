const { OK_CODE } = require('../commun/constants/statusCode');
const ProjectRepository = require('../repository/project');

class ProjectService {
  /**
   * @param { import("express").Request } req
   * @param { import("express").Response } res
   * @returns { Promise<Projects> }
   */
  async getAll(req, res) {
    const { name, user_id } = req.body;
    const project = await ProjectRepository.getAll(name, user_id);

    return res.status(OK_CODE).json(project);
  }

  /**
   * @param { import("express").Request } req
   * @param { import("express").Response } res
   * @returns { Promise<Project> }
   */
  async getById(req, res) {
    const { id } = req.params;
    const project = await ProjectRepository.getById(id);

    return res.status(OK_CODE).json(project);
  }

  /**
   * @param { import("express").Request } req
   * @param { import("express").Response } res
   * @returns { Promise<Project> }
   */
  async create(req, res) {
    const { name, user_id } = req.body;
    const project = await ProjectRepository.create(name, user_id);

    return res.status(OK_CODE).json(project);
  }

  /**
   * @param { import("express").Request } req
   * @param { import("express").Response } res
   * @returns { Promise<Boolean> }
   */
  async updateById(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const project = await ProjectRepository.updateById(id, name);

    return res.status(OK_CODE).json(project);
  }

  /**
   * @param { import("express").Request } req
   * @param { import("express").Response } res
   * @returns { Promise<Boolean> }
   */
  async deleteById(req, res) {
    const { id } = req.params;
    const project = await ProjectRepository.deleteById(id);

    return res.status(OK_CODE).json(project);
  }
}

module.exports = new ProjectService();
