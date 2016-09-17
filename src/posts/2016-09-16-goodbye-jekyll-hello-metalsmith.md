---
layout: post.html
title: Goodbye Jekyll, Hello Metalsmith!
---

![It's totally you](/images/its-not-me.png)

While I love the simplicity of [Jekyll](https://jekyllrb.com/) for generating static Web sites from markup documents, the fact that Jekyll is built on [Ruby](https://www.ruby-lang.org/en/) and its respective ecosystem has been giving me increasing frustration. The reason for the growing frustration comes down to this:

> A Ruby app is a bait and switch.

Looking at the code itself, the language has an apparent elegance to it (I mean, if you factor out all of that OO nonsense). There's even this really rich package manager and ecosystem of 3rd party gems. And the best part of all? It works pretty seamlessly on a Mac.

That's the bait.

The switch comes when you're trying to something akin to some of my recent work on the [Concur developer center](https://developer.concur.com). I've been working to make the local machine run scenario easier for individuals and teams who want to see the impact of doc changes before pushing them to a public location (even the dev center's [preview](https://preview.developer.concur.com) environment). In order to accomplish this, I set out to wrap our Jekyll site build process in a Docker container image so that running the dev center locally required no more than `docker-compose up`. As I went through the process of putting this together, the 'switch' I discovered was that at least half of the Ruby gems that we use for the dev center are native packages - meaning that they need to be compiled with a C compiler and have dependencies on the underlying operating system APIs. And getting the dev center build to work in a container turned into a game of Whack-a-Mole - fixing one build error only to hit another one, complete with native stack dump.

The bottom line for me was this - if I wanted to debug native code, I would have written native code.

### Javascript Site Generators

So, that prompted me to see what Javascript static site generators were out there. The last time I looked was probably around 2 years ago, and there were only a small handful of _very_ immature projects - this is why I initally selected Jekyll for static site projects. However, there are now quite a few really promising-looking projects. The most popular ones at the moment seem to be:

* [GitBook](https://www.gitbook.com/)
* [Hexo](https://hexo.io/)
* [Metalsmith.io](http://www.metalsmith.io/)
* [Brunch](https://github.com/brunch/brunch)

I've spent a good bit of time with Metalsmith over the last week or so and while I still intend to try out the others listed, I'm already pretty sold on it. Here are a couple things that I _really_ like thus far about Metalsmith compared to Jekyll.

* Jekyll is built on Ruby, which means installing a bunch of - sometimes native - gems at your machine level. See above rant for why I'm not a fan. Getting started with Metalsmith consists of installing its NPM package (locally) and ... that's it.
* In the name of "convention over configuration", Jekyll is opinionated about the names and structure of directories in a Jekyll project. Metalsmith inserts zero opinion or constraint because the framework itself is little more than a UNIX-style pipe and filter engine. The framework pushes a bunch of files through a pipeline that you define in code. Additionally, everything in the pipeline is a plugin, so it really can be whatever you want for it to be. 
* By extension, while Jekyll clearly allows you to build any kind of Web site, its conventions remind you (well, me anyway) that it was created for building blogs. Metalsmith has no such feeling.
* Jekyll limits you to a templating engine called [liquid](https://shopify.github.io/liquid/). I hate liquid. In order to ensure safety, I find it incredibly restrictive in the operations it supports. In fact, some of the most [complex code in the dev center today](https://github.com/concur/developer.concur.com/blob/preview/_includes/left-navigation.html) is to work around liquid's limited operational expressivity.
* After admittedly limited exposure to it, I have a hard time understanding how people who use [Bundler](http://bundler.io/) can complain about NPM.
* While custom plugin development in Jekyll was not difficult, the functional style of Metalsmith is a downright pleasure to work with.

### Metalsmith in Action

So what does it look like to develop a static site using Metalsmith? Well, the getting started process looks almost exactly like the following.

```
mkdir myproj && cd $_
npm init . 
npm install --save metalsmith
```

That's it! Now, granted, this doesn't do anything, but its a much simpler on-ramp than Jekyll's scaffolding-based approach that produces a bunch of different artifacts requiring a fair amount of studying to understand the larger design picture.

Doing something more meaningful requires creating a Metalsmith configuration, which is nothing more than a standard Node module that requires the `metalsmith` module (which btw exports a function - hurray!) and invokes it, passing the directory of the project. The output of that function can then be chained to any number of other functions (see my use of the markdown function) before finally calling its asynchronous `build` function. 

```
// index.js

const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');

metalsmith(__dirname)
  .metadata({
    site: {
      title: 'blog.howarddierking.com',
      url: 'http://blog.howarddierking.com',
      author: 'Howard Dierking'
    }
  })
  .use(markdown())
  .build(err => {
	  if(err)
	    console.log(err)
	  else
	    console.log('Site build complete!');
  });
```

One other thing to point out here is, as I mentioned earlier, nearly everything in a Metalsmith project is a plugin and installed as an NPM package (including the markdown processor in this example). This gives you tons of choices in how you design and configure your site generator.

One of my very favorite things about Metalsmith is the [layouts](https://github.com/superwolff/metalsmith-layouts) plugin. The plugin allows you to specify almost everything, including your desired template engine. The engine simply needs to be supported by [consolidate.js](https://github.com/tj/consolidate.js), and as you can see, [there are many supported engines](https://github.com/tj/consolidate.js#supported-template-engines). As for me, while it may not be the "new hotness" of template engines, I selected ejs, because it's Javascript.

And while I like the pluggability of engines in the layout plugin, the capability that I'm most excited about is the ability to insert context into template processing. One common use is to insert other Node libraries, such as [moment](http://momentjs.com/) for handling dates. Because I like a more functional style of programming, I also added [Ramda](http://ramdajs.com/) as follows.

```
const layouts = require('metalsmith-layouts');
const moment = require('moment');
const R = require('ramda');

...

.use(layouts({
	engine: 'qejs',
	directory: 'layouts',
	moment: moment,  // <-- the ability to pass libraries to the template engine may be the best feature
	R: R
	}))
```

Speaking of plugins, writing a Metalsmith plugin is as straightforward as a function definition.

```
function myplugin(files, metalsmith, done){
	// do stuff
	done();
}
```

Remember that Metalsmith at its core is little more than a pipe and filter engine for a directory tree of files. As such, every plugin participates at the same level in that pipeline, keeping the interface simple. As most non-trivial plugins will want to ensure that a new function is emitted for every pipeline as well as be configured with user data, most (if not all) plugin implementations wrap the plugin in a higher-order function.

```
function myplugin(config){
	return function (files, metalsmith, done){
		// do stuff with config
		done();
	}
}
```

There are lots of plugins I could enumerate and lots more details I could share, but rather than do all that in this note, I'll point you to a [working example where I migrated this blog](https://github.com/howarddierking/blog.howarddierking.com/tree/6-metalsmith) from Jekyll to Metalsmith. Check it out and let me know your thoughts!
