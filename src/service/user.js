const AuthService = require('./auth');
const UserRepository = require('../repository/user');
const {
  NOT_FOUND_EXCEPTION,
  BAD_REQUEST_EXCEPTION,
} = require('../config/error');
const { USER_SERVICE } = require('../commun/constants/strings');
const {
  NOT_FOUND_USER_ID,
  USER_PASS_BAD_REQUEST,
  ALL_FIELDS_REQUIRED,
  USERNAME_ALREADY_USED,
} = require('../commun/constants/errors');
const {
  CREATED_CODE,
  OK_CODE,
  INTERNAL_SERVER_ERROR_CODE,
} = require('../commun/constants/statusCode');

class UserService {
  /**
   * @param { import("express").Request } req
   * @param { import("express").Response } res
   * @returns { Promise<User> }
   */
  async getByUsername(req, res) {
    try {
      const { username } = req.params;
      const user = await UserRepository.getByUsername(username);

      if (!user) throw new NOT_FOUND_EXCEPTION(USER_SERVICE, NOT_FOUND_USER_ID);

      return res.status(OK_CODE).json(user);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR_CODE).json(error);
    }
  }

  /**
   * @param { import("express").Request } req
   * @param { import("express").Response } res
   * @returns { Promise<User> }
   */
  async checkUser(req, res) {
    const { username, password } = req.body;
    const user = await UserRepository.getByUsernamePassword(username, password);

    if (!user) {
      throw new BAD_REQUEST_EXCEPTION(USER_SERVICE, USER_PASS_BAD_REQUEST);
    }

    return res.status(OK_CODE).json(user);
  }

  /**
   * @param { import("express").Request } req
   * @param { import("express").Response } res
   * @returns { Promise<User> }
   */
  async create(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        throw new BAD_REQUEST_EXCEPTION(USER_SERVICE, ALL_FIELDS_REQUIRED);
      }
      const user = await UserRepository.getByUsername(username);
      if (user) {
        throw new BAD_REQUEST_EXCEPTION(USER_SERVICE, USERNAME_ALREADY_USED);
      }

      const passwordHash = await AuthService.hashPassword(password);
      const newUser = await UserRepository.create(username, passwordHash);

      return res.status(CREATED_CODE).json({ newUser });
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR_CODE).json(error);
    }
  }
}

module.exports = new UserService();
