const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user');
const {
  UNAUTHORIZED_EXCEPTION,
  INTERNAL_SERVER_ERROR_EXCEPTION,
} = require('../config/error');

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns {import("express").NextFunction}
 */
async function checkAuth(req, res, next) {
  const cookieToken = req.cookie.token || null;

  if (cookieToken == '' || cookieToken == null) {
    return res.status().json({ error: 'Token is undefined' });
  }

  try {
    const isVerify = jwt.verify(cookieToken, process.env.SECRET);

    if (!isVerify) {
      return new UNAUTHORIZED_EXCEPTION('checkAuth', 'Token is invalid');
    }

    const { id } = jwt.decode(cookieToken);
    const userToken = await UserRepository.getTokenById(id);

    if (userToken != cookieToken) {
      return new UNAUTHORIZED_EXCEPTION('checkAuth', 'Token is modified');
    }

    next();
  } catch (error) {
    throw new INTERNAL_SERVER_ERROR_EXCEPTION(
      'checkAuth',
      error.stack.split('\n')[0]
    );
  }
}

module.exports = { checkAuth };
