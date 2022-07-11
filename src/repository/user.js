const con = require('../config/knex/knex');
const {
  INTERNAL_SERVER_ERROR_EXCEPTION,
  BAD_REQUEST_EXCEPTION,
  NOT_FOUND_EXCEPTION,
} = require('../config/error');
const {
  NOT_FOUND_USER_ID,
  FAIL_GET_TOKEN,
  FAIL_SET_TOKEN,
  FAIL_DELETE_TOKEN,
  FAIL_CREATE_USER,
} = require('../commun/constants/errors');
const { USER_REPOSITORY } = require('../commun/constants/strings');

class UserRepository {
  async create(username, password) {
    try {
      const user = await con('users')
        .insert({
          username,
          password,
        })
        .select('id', 'username');
      return user;
    } catch (error) {
      throw new INTERNAL_SERVER_ERROR_EXCEPTION(
        USER_REPOSITORY,
        FAIL_CREATE_USER
      );
    }
  }

  async getByUsername(username) {
    try {
      const user = await con('users')
        .where({ username })
        .select('id', 'username', 'password')
        .first();
      return user;
    } catch (error) {
      throw new INTERNAL_SERVER_ERROR_EXCEPTION(
        USER_REPOSITORY,
        NOT_FOUND_USER_ID
      );
    }
  }

  async getByUsernamePassword(username, password) {
    try {
      const user = await con('users')
        .where({ username, password })
        .select('id', 'username')
        .first();

      if (!user)
        throw new NOT_FOUND_EXCEPTION(USER_REPOSITORY, NOT_FOUND_USER_ID);

      return user;
    } catch (error) {
      throw new INTERNAL_SERVER_ERROR_EXCEPTION(
        USER_REPOSITORY,
        NOT_FOUND_USER_ID
      );
    }
  }

  async getTokenById(id) {
    try {
      const user = await con('users').where({ id }).select({ token }).first();

      if (!user) throw new NOT_FOUND_EXCEPTION(USER_REPOSITORY, FAIL_GET_TOKEN);

      return user;
    } catch (error) {
      throw new INTERNAL_SERVER_ERROR_EXCEPTION(
        USER_REPOSITORY,
        FAIL_GET_TOKEN
      );
    }
  }

  async setToken(id, token) {
    try {
      const result = await con('users').where({ id }).update({ token });

      if (!result)
        throw new BAD_REQUEST_EXCEPTION(USER_REPOSITORY, FAIL_SET_TOKEN);

      return true;
    } catch (error) {
      throw new INTERNAL_SERVER_ERROR_EXCEPTION(
        USER_REPOSITORY,
        FAIL_SET_TOKEN
      );
    }
  }

  async deleteToken(id) {
    try {
      const result = await con('users').where({ id }).update({ token: null });

      if (!result)
        throw new BAD_REQUEST_EXCEPTION(USER_REPOSITORY, FAIL_DELETE_TOKEN);

      return true;
    } catch (error) {
      throw new INTERNAL_SERVER_ERROR_EXCEPTION(
        USER_REPOSITORY,
        FAIL_DELETE_TOKEN
      );
    }
  }
}

module.exports = new UserRepository();
