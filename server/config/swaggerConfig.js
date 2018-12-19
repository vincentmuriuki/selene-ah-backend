import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  info: {
    title: 'Authors Haven',
    version: '1.0.0',
    description: 'Authors Haven Creates a community of like-minded '
    + 'authors to foster inspiration and innovation by leveraging '
    + 'the modern web. It allows sharing information that would make '
    + 'the world a better place. It allows sharing information that '
    + 'would make the world a better place.'
  },
  host: 'https://selene-ah-backend.herokuapp.com',
  basePath: '/api/v1'
};

const options = { swaggerDefinition, apis: ['./docs/**/*.yaml']};
const swaggerConfig = swaggerJSDoc(options);

export default swaggerConfig;
