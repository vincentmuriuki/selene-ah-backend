import db from '../models';

const { Profile, Article, Comment, User } = db;
/**
 * @description contains the controller methods for commenting on an article
 */
export default class CommentController {
  /**
   * @description post a Comment for a particular article
   * @param {object} req - req from route
   * @param {object} res - respose to route
   * @param {object} next - callback function
   * @returns {object} a response object
   */
  static async postComment(req, res, next) {
    const { user: { id }, body:{comment}, params:{articleId}} = req;
    try {
      const commentCreated = await Comment.create({
        comment: comment.trim(),
        userId: id,
        articleId,
      });
      delete commentCreated.dataValues.userId;
      return res.status(201).send({
        success: true,
        message: 'Comment created successfully',
        comment: commentCreated
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @description Get all Comments for a particular article
   * @param {object} req - req from route
   * @param {object} res - respose to route
   * @param {object} next - callback function
   * @returns {object} a response object
   */
  static async getArticleComments(req, res, next) {
    const { params:{articleId}} = req;
    try {
      const comments = await Comment.findAndCountAll(
        {
          include: [{
            model: User,
            as: 'author',
            attributes: ['userName', 'imageUrl', 'bio']

          }],
          attributes: { exclude: ['userId'] },
          where: { articleId }         
        });

      if (comments.count == 0) {
        return res.status(404).json({
          success: 'false',
          message: 'No Comment for this Article',
        });
      }

      return res.status(200).json({
        success: 'true',
        message: 'Retrieved Comments successfully',
        comments
      });

    } catch (error) {
      return next(error);
    }
  }

  /**
   * @param {object} req - req from route
   * @param {object} res - respose to route
   * @param {object} next - callback function
   * @returns {object} a response object
   */
  static async getSingleComment(req, res, next) {
    const { params: { id }} = req;
    try {
      const comment = await Comment.findOne(
        {
          include: [{
            model: User,
            as: 'author',
            attributes: ['userName', 'imageUrl', 'bio']

          }],
          attributes: { exclude: ['userId'] },
          where: { id }
        });

      if (!comment) {
        return res.status(404).json({
          success: 'false',
          message: 'No Comment found',
        });
      }

      return res.status(200).json({
        success: 'true',
        message: 'Retrieved comment successfully',
        comment
      });

    } catch (error) {
      return next(error);
    }  
  }

  /**
   * @param {object} req - req from route
   * @param {object} res - respose to route
   * @param {object} next - callback function
   * @returns {object} a response object
   */
  static async updateComment(req, res, next) {
    const { body:{ comment }, params:{ id }} = req;
    try {
      const article = await Comment.findOne({
        where: { id }
      });

      if (!article) {
        return res.status(404).json({
          success: 'false',
          message: 'Article not found',
        });
      }
      await Comment.update(
        {
          comment
        },
        {
          where: { id }
        }
      );

      return res.status(200).json({
        success: 'true',
        message: 'Comment updated successfully',
      });
    } catch (error) {
      return next(error);
    }
  }

   /**
   * @description A function that deletes comments from the databaseU
   * @param {uuid} commentId - req from route
   * @param {uuid} userId - respose to route
   * @returns {boolean} a response object
   */
  static async deleteCommentFunction(commentId,userId){
    const comment = await Comment.findOne({
      where: {
        id: commentId,
        userId,
      }
    });
    if (!comment) {
      return false;

    }
    await comment.destroy({
      where: {
        id:commentId
      }
    });
    return true;

  }
  
  /**
   * @description Users should be able to delete only their comment
   * @param {object} req - req from route
   * @param {object} res - respose to route
   * @param {object} next - callback function
   * @returns {object} a response object
   */
  static async deleteComment(req, res, next) {
    const { user:{ id, role, ownerId }, params: { commentId }} = req;
    try {
      if (role === 'superAdmin' &&
        await CommentController.deleteCommentFunction(commentId, ownerId)) {
          return res.status(200).json({
            success: 'true',
            message: 'Admin has deleted the Comment successfully',
          });
      }
      if(await CommentController.deleteCommentFunction(commentId, id)){
        return res.status(200).json({
          success: 'true',
          message: 'Comment deleted successfully',
        });
      }
      return res.status(403).json({
        success: false,
        message: 'User cannot delete comment they did\'t create',
      });


    } catch (error) {
      return next(error);
    }
  }
}
