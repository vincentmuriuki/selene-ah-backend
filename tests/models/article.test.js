import { expect } from 'chai';
import { sequelize, dataTypes, checkModelName } from 'sequelize-test-helpers';
import ArticleModel from '../../server/models/article';
import UserModel from '../../server/models/user';
import CategoryModel from '../../server/models/category';

describe('Model for an Article', () => {
  const Article = ArticleModel(sequelize, dataTypes);
  const article = new Article();
  checkModelName(Article)('Article');
  context('should have properties', () => {
    it('should have property body', () => {
      expect(article).to.have.property('body');
    });
    it('should have property title', () => {
      expect(article).to.have.property('title');
    });
    it('should have property published', () => {
      expect(article).to.have.property('published');
    });
  });
  context('check associations', () => {
    const User = UserModel(sequelize, dataTypes);
    const Category = CategoryModel(sequelize, dataTypes);

    before(() => {
      Article.associate({ User });
      Article.associate({ Category });
    });
    it('should have a belongsTo association with UserModel', () => {
      expect(Article.belongsTo.calledWith(User)).to.equal(true);
    });

    it('should have a belongsTo association with CategoryModel', () => {
      expect(Article.belongsTo.calledWith(Category)).to.equal(true);
    });
  });
});
