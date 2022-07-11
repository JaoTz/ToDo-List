require('dotenv').config();
const privateKey = process.env.SECRET;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require('../repository/user');
const { BAD_REQUEST_EXCEPTION } = require('../config/error');
const { AUTH_SERVICE } = require('../commun/constants/strings');
const {
  PASSWORD_INVALID,
  USER_PASS_INVALID,
} = require('../commun/constants/errors');
const { OK_CODE, BAD_REQUEST_CODE } = require('../commun/constants/statusCode');

const TIME_TO_EXPIRES_TOKEN = 60 * 30; // 30 Minutes

class AuthService {
  /**
   * @param {string} password
   * @returns {Promise<string>}
   */
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(8);
    return await bcrypt.hash(password, salt);
  }

  /**
   * @param { import("express").Request } req
   * @param { import("express").Response } res
   * @returns { Promise<string> }
   */
  async login(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        throw new BAD_REQUEST_EXCEPTION(AUTH_SERVICE, USER_PASS_INVALID);
      }

      const user = await UserRepository.getByUsername(username);

      const passwordHash = await bcrypt.compare(password, user.password);

      if (!passwordHash) {
        throw new BAD_REQUEST_EXCEPTION(AUTH_SERVICE, PASSWORD_INVALID);
      }

      const token = jwt.sign({ id: user.id, username }, privateKey, {
        expiresIn: TIME_TO_EXPIRES_TOKEN,
      });

      await UserRepository.setToken(user.id, token);

      res.cookie('token', token);
      return res.status(OK_CODE).json(token);
    } catch (error) {
      return res.status(BAD_REQUEST_CODE).json(error);
    }
  }

  /**
   * @param { import("express").Request } req
   * @param { import("express").Response } res
   * @returns { Promise<Boolean> }
   */
  async logout(req, res) {
    try {
      const token = req.cookies.token;

      if (token) {
        const { id } = jwt.decode(token);
        await UserRepository.deleteToken(id);
        res.clearCookie('token');
      }

      return res.status(OK_CODE).json(true);
    } catch (error) {
      return res.status(OK_CODE).json(false);
    }
  }
}

module.exports = new AuthService();
