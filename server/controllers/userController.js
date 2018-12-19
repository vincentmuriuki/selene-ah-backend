import models from '../models';

const { User } = models;
/**
 * @description - Performs all auth function
 */
class UserController {
  /**
   * @param {object} req - req sent to server
   * @param {object} res - response gotten from server
   * @param {fn} next - callback function
   * @returns {obj} - response object
   */
  static async getAllUsers(req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const offset = limit * (page - 1);
    try {
      const user = await User.findAll({
          attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
          limit,
          offset
      });
      if (user.length <= 0){
        return res.status(404).json({
          success: false,
          msg: 'No User returned'
        });
      }
      return res.status(200).json({
        success: true,
        users: user,
        msg: 'User(s) returned successfully'
      });
    } catch(err) {
      return next(err);
    }
  }
}
export default UserController;
