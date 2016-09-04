const metalsmith = require('metalsmith');
const drafts = require('metalsmith-drafts');
const markdown = require('metalsmith-markdown');
const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');
const serve = require('metalsmith-serve');
const watch = require('metalsmith-watch');
const dateInFileName = require('metalsmith-date-in-filename')

let build = metalsmith(__dirname)
  .metadata({
    site: {
      title: 'blog.howarddierking.com',
      url: 'http://blog.howarddierking.com'
    }
  })
  .use(drafts())
  .use(markdown())
  .use(dateInFileName({
    override: true
  }))
  .use(permalinks({
    pattern: ':date/:title'
  }))
  .use(layouts({
    engine: 'qejs',
    directory: 'layouts'
  }))
  // .use(serve({
  //   verbose: true
  // }))
  // .use(watch({
  //   pattern: '**/*',
  //   livereload: true
  // }))
  .source('./src')
  .destination('./site')
  .build(err => {
    if(err)
      console.log(err)
    else
      console.log('Site build complete!');
  });
