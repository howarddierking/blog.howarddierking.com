const metalsmith = require('metalsmith');
const drafts = require('metalsmith-drafts');
const markdown = require('metalsmith-markdown');
const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');
const dateInFileName = require('metalsmith-date-in-filename');
const collections = require('metalsmith-collections');
const moment = require('moment');
const excerpts = require('metalsmith-excerpts');
const pagination = require('metalsmith-pagination');
const feed = require('metalsmith-feed');
const path = require('metalsmith-path');
const sitemap = require('metalsmith-mapsite');
const env = require('metalsmith-env');
const R = require('ramda');

module.exports = metalsmith(__dirname)
  .metadata({
    site: {
      title: 'blog.howarddierking.com',
      url: 'http://blog.howarddierking.com',
      author: 'Howard Dierking'
    }
  })
  .use(env())
  .use(drafts())
  .use(markdown())
  .use(excerpts())
  .use(dateInFileName({
    override: true
  }))
  .use(collections({
    blogposts: {
      pattern: 'posts/*.html',
      reverse: true
    }
  }))
  .use(permalinks({
    pattern: ':date/:title'
  }))
  .use(feed({
    collection: 'blogposts'
  }))
  .use(pagination({
    'blogposts': {
      perPage: 5,
      layout: 'homepage.html',
      first: 'index.html',
      path: 'page:num/index.html',
      pageMetadata: {
        title: 'Howard Dierking\'s Blog'
      }
    }
  }))
  .use(path({
    baseDirectory: '/',
    directoryIndex: 'index.html'
  }))
  .use(sitemap({
    hostname: 'http://blog.howarddierking.com'
  }))
  .use(layouts({
    engine: 'qejs',
    directory: 'layouts',
    moment: moment,  // <-- the ability to pass libraries to the template engine may be the best feature
    R: R
  }))
  .source('./src')
  .destination('./site');
