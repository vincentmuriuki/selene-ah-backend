import validationHelper  from '../../helpers/validationHelper';
import checkValidArticle from '../../helpers/checkValidArticle';
import checkValidCommentId from '../../helpers/checkValidCommentId';


/**
 * @description This class is for validating comments fields
 */
export default class validateComments{
  /**
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} next/res
   */
  static validateCommentText(req, res, next) {
    const {body: { comment } } = req;
    if(!comment.trim()){
      return res.status(400).json({
        status: 'error',
        message: 'Cannot Post an empty Text'
      });
    }
    if(!validationHelper.validateText(comment)){
      return res.status(400).json({
        status: 'error',
        message:
          'Comments should be at least 2 and not more than 150 characters'
      });
    }
    return next();
  }

  /**
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the middleware
   * @param {object} next - 
   * @returns {object} - object representing response message
   */
  static async validateArticleId(req, res, next) {
    const {params:{articleId}} = req;
    if(await checkValidArticle(articleId)){
      req.user.author = {
        author: checkValidArticle()
      };
      return next();
    }
    return res.status(404).json({
      success: false,
      message: 'Article ID Not Found',
    });
  }

  /**
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the middleware
   * @param {object} next - 
   * @returns {object} - object representing response message
   */
  static async validateCommentId(req, res, next) {
    const {params:{commentId}} = req;
    const isCommentIdValid = await checkValidCommentId(commentId);
    if(isCommentIdValid){
      req.user.ownerId = isCommentIdValid;
      return next();
    }
    return res.status(404).json({
      success: false,
      message: 'Comment ID Not Found',
    });
  }
}

