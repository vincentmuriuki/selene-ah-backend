import models from '../models';
import {
  SUCCESSFUL_RATING,
  SUCCESSFUL_RATING_UPDATE,
  GOT_ARTICLE_RATING_MESSAGE,
  NO_ARTICLE_RATING
} from '../helpers/responseMessages';
import generalHelpers from '../helpers/generalHelpers';

const { Rating } = models;
/**
 * @descrption class for handling article rating
 */
class RatingController{
  /**
   * @description - This method adds rating to an article
   * @param {object} req - the request object containing the input data
   * @param {object} res - response from database operation
   * @param {object} next - callback function
   * @returns {object} response object
   */
  static async rateArticle(req, res, next) {
    try {
      const { rating } = req.body;
      const { articleId } = req.params;
      const userId = req.user.id;
      const ratedArticle = await Rating.create({
        userId,
        articleId,
        rating
      });
      return res.status(201).json({
        success: true,
        message: SUCCESSFUL_RATING,
        data: ratedArticle
      });
    } catch(err) {
      return next(err);
    }
  }

  /**
   * @description - This method adds rating to an article
   * @param {object} req - the request object containing the input data
   * @param {object} res - response from database operation
   * @param {object} next - callback function
   * @returns {object} response object
   */
  static async updateRatingById(req, res, next) {
    try {
      const { articleId } = req.params;
      const { rating } = req.body;
      const userId = req.user.id;

      const ratedArticle = await Rating.update(
        { rating },
        { where: { userId:userId, articleId:articleId }}
      );
      return res.status(200).json({
        success: true,
        message: SUCCESSFUL_RATING_UPDATE,
        data: ratedArticle
      });
    } catch(err) {
      return next(err);
    }
  }

  /**
   * @description - This method adds rating to an article
   * @param {object} req - the request object containing the input data
   * @param {object} res - response from database operation
   * @param {object} next - callback function
   * @returns {object} response object
   */
  static async getSingleAticleRatings(req, res, next) {
    try {
      const { articleId } = req.params;
      const articleRatings = await Rating.findAll({
        where: { articleId: articleId }
      });

      if (!articleRatings) {
        return generalHelpers.responseMessageHandler(
          res, NO_ARTICLE_RATING, 404, false
          );
      }

      return res.status(200).json({
        success: true,
        message: GOT_ARTICLE_RATING_MESSAGE,
        data: articleRatings
      });
    } catch(err) {
      return next(err);
    }
  }

  /**
   * @description - This method adds rating to an article
   * @param {object} req - the request object containing the input data
   * @param {object} res - response from database operation
   * @param {object} next - callback function
   * @returns {object} response object
   */
  static async getArticleRatingForUser(req, res, next) {
    try {
      const {articleId} = req.params.articleId;
      const userId = req.user.id;
      const userRating = await Rating.findOne({
        where: { articleId, userId}
      });
      return res.status(200).json({
        success: true,
        message: GOT_ARTICLE_RATING_MESSAGE,
        data: userRating
      });
    } catch(err) {
      return next(err);
    }
  }
}

export default RatingController;
