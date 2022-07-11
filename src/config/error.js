const {
  NOT_FOUND,
  UNAUTHORIZED,
  BAD_REQUEST,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_CODE,
  UNAUTHORIZED_CODE,
  BAD_REQUEST_CODE,
  CONFLICT_CODE,
  INTERNAL_SERVER_ERROR_CODE,
} = require('../commun/constants/statusCode');

class CustomError {
  module = '';
  message = '';
  code = '';
  status = '';

  /**
   * @param {string} mod
   * @param {string} message
   * @param {number} code
   * @param {string} status
   */
  constructor(mod, message, code, status) {
    this.module = mod.toUpperCase();
    this.message = message.toUpperCase();
    this.code = code;
    this.status = status.toUpperCase();
  }
}

/**
 * @param {string} mod
 * @param {string} message
 * @returns {Error}
 */
function NOT_FOUND_EXCEPTION(mod, message) {
  const error = new CustomError(mod, message, NOT_FOUND_CODE, NOT_FOUND);
  return error;
}

/**
 * @param {string} mod
 * @param {string} message
 * @returns {Error}
 */
function UNAUTHORIZED_EXCEPTION(mod, message) {
  const error = new CustomError(mod, message, UNAUTHORIZED_CODE, UNAUTHORIZED);
  return error;
}

/**
 * @param {string} mod
 * @param {string} message
 * @returns {Error}
 */
function BAD_REQUEST_EXCEPTION(mod, message) {
  const error = new CustomError(mod, message, BAD_REQUEST_CODE, BAD_REQUEST);
  return error;
}

/**
 * @param {string} mod
 * @param {string} message
 * @returns {Error}
 */
function CONFLICT_EXCEPTION(mod, message) {
  const error = new CustomError(mod, message, CONFLICT_CODE, CONFLICT);
  return error;
}

/**
 * @param {string} mod
 * @param {string} message
 * @returns {Error}
 */
function INTERNAL_SERVER_ERROR_EXCEPTION(mod, message) {
  const error = new CustomError(
    mod,
    message,
    INTERNAL_SERVER_ERROR_CODE,
    INTERNAL_SERVER_ERROR
  );
  return error;
}

module.exports = {
  NOT_FOUND_EXCEPTION,
  UNAUTHORIZED_EXCEPTION,
  BAD_REQUEST_EXCEPTION,
  CONFLICT_EXCEPTION,
  INTERNAL_SERVER_ERROR_EXCEPTION,
};
