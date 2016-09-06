const metalsmith = require('metalsmith');
const drafts = require('metalsmith-drafts');
const markdown = require('metalsmith-markdown');
const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');
const serve = require('metalsmith-serve');
const watch = require('metalsmith-watch');
const dateInFileName = require('metalsmith-date-in-filename');
const collections = require('metalsmith-collections');
const moment = require('moment');
const excerpts = require('metalsmith-excerpts');
const pagination = require('metalsmith-pagination');

var build = metalsmith(__dirname)
  .metadata({
    site: {
      title: 'blog.howarddierking.com',
      url: 'http://blog.howarddierking.com'
    }
  })
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
  .use(pagination({
    'blogposts': {
      perPage: 5,
      layout: 'homepage.html',
      first: 'index.html',
      path: 'blog/page:num/index.html',
      pageMetadata: {
        title: 'Archive'
      }
    }
  }))
  .use(layouts({
    engine: 'qejs',
    directory: 'layouts',
    moment: moment  // <-- the ability to pass libraries to the template engine may be the best feature
  }))
  .use(serve({
    verbose: true
  }))
  .use(watch({
    pattern: '**/*',
    livereload: true
  }))
  .source('./src')
  .destination('./site')
  .build(err => {
    if(err)
      console.log(err)
    else
      console.log('Site build complete!');
  });
