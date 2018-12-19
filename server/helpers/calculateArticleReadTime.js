/**
 * @description function to calculate the time it takes to read an article
 * @param {string} article - article title
 * @returns {function} string
 */
const calculateArticleReadTime = (article) => {
  const wordPerMinute = 270;
  const count = article.split(' ').length;
  let timeToRead = count / wordPerMinute;
  return timeToRead = timeToRead.toFixed(0);
};
export default calculateArticleReadTime;
