---
layout: post.html
title: How This Blog is Setup
---

I've been trying to get caught up on my backlog of things that I generally like doing but haven't been finding the time to do recently, and a current project at work has me working in the same technology on which this blog is based - so it gave me a convenient excuse to - yet again - try and revive this blog. We'll have to see how well I do in keeping up with writing. I find that in the world of tech bloggers, and trainers - but more on that in a later post - people fall uneasily into one of two camps: there's the folks who work day jobs as practitioners and then keep up with writing out of the pure joy or catharsis that the activity may provide. There are also folks who write because it's either a part of their job or because it's a marketing activity to promote their job (e.g. training). I would aspire to be in that first category and while I have nothing against those in the latter category, it's just not really for me. If I'm going to err on a particular side, you should expect that this blog will go silent while I'm up to my eyeballs in building and learning.

So, now that I've made excuses for my silence over the last few months...

This blog. Hopefully by now, you've at least had some exposure to [Jekyll](http://jekyllrb.com), as it's become incredibly popular over the last year or so due to it being the engine for [GitHub Pages](https://pages.github.com). In the event that you don't feel like following links, the executive summary is that Jekyll (and frameworks like it) do all of that fancy transformation and rendering work that frameworks like [ASP.NET](http://www.asp.net) do on the server and they do it as a build step. The input consists of HTML templates (like in those server-based frameworks) and a set of [markdown](http://daringfireball.net/projects/markdown/syntax) files that define your content. The output is a completely static Web site that can be deployed anywhere on anything capable of hosting HTML files (which is pretty much everywhere). If you're running a content Website (e.g. not a Web application), you would be absolutely crazy not to at least take a look at this over your current content management system. Here are a few reasons.

* Cost - I originally moved my blog from it's home on [CodeBetter](http://codebetter.com) because I wanted to experiment with an idea that I was/am very passionate about - and that is the idea that most things on the Web (including APIs) have a dynamic head and a relatively static (and long) tail of data. And that the architecture of services should be better molded to reflect that reality. As such, a simple test was to generate this blog as a static Web site, move it to AWS S3 storage (which I pay for) and see how much it actually costs to run. Now, I realize that I'm not nearly as popular as [some](http://www.hanselman.com), but I get a reasonable amount of traffic (thanks Google!) and to date, I have only ever incurred enough cost that Amazon felt it worthwhile to even bill me (I typically stay under 10 cents per month).
* Workflow - Most of the content management systems out there spend a lot of energy (and charge a lot of money on the high end) building UX around creating the illusion of powerful workflow capabilities - but it's just that, an illusion. Most of these can't even come close to providing the flexibility in workflow that I have out of the box with [Git](http://git-scm.com) branches and [GitHub](https://github.com) for things like reviews.
* Security - What attack vectors? It's a freakin' static Web page!!
* Complexity - There are no database connections dropped, no issues with scaling out Web servers...it's a freakin' static Web page!! If I really, really, really need to scale, I go into my AWS console and through [CloudFront](http://aws.amazon.com/cloudfront/) on the front of my S3 bucket and call it a day.
* Portability - One of my biggest complaints with traditional content management sytems is that you go to all this trouble defining your content using their tools (or maybe something like Windows Live Writer) and after all that hard work, when you one day decide that maybe you want to consider moving your content to some other platform, you discover that your "content" is spread across a bunch of different tables in a relational database and formatted in some vendor-specific XML format. With Jekyll, it's simple text. Pick it up and do as you wish with it.

So here are a few data points on the setup for this blog.

* generated with Jekyll
* code hosted on [Bitbucket](https://bitbucket.org) (at the moment because of the free private repositories; thinking about it now, I'm not sure why I felt strongly that it needed to be private)
* site hosted on [Amazon S3](http://aws.amazon.com/s3/)
  * blog subdomain CNAME registered to point to the S3 bucket
  * S3 bucket static Web site option enabled
* updates pushed manually through the [AWS CLI](http://aws.amazon.com/cli/) (though I'm considering either moving to GitHub pages or tossing a build server up there to run Jekyll and push to S3)

While the process was generally painless, there are a couple of gotchas that you may want to be aware of.

* When you setup your S3 bucket, it's pretty locked down by default. Note that this is a good thing - but you will need to create a security policy that grants access to the Internet. There are [good samples out there](http://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html) for doing this.
* For AWS, pay attention to the region that your site is hosted. Even then, you'll likely [need to keep track of this page](http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region) and adjust your AWS config file (or your command parameters when syncing) as I've seen the region value change on more than one occasion.

As I mentioned, I'm spending a good bit more time with Jekyll at the moment because we're currently rebuilding our entire developer documentation site on it. So here are something areas where I'm currently learning. Note that this blog will likely be getting a bit of an upgrade over the next month or so as it's also my learning Jekyll playground.

* Ruby and Liquid Templates - I was able to get this blog up and going without really knowing any Ruby. However, as I want to do more things with a full-fledged documentation site, I want a better understanding of what is actually happening behind the scenes - and I so I want to at least be able to read the Jekyll source and understand how to better use tools like [bundler](http://bundler.io) and [gems](https://rubygems.org). Also, it's still somewhat fuzzy to me where is the line between the [liquid template syntax](http://liquidmarkup.org) and where I need to (or can) jump into full Ruby programming.
* Jekyll configuration system - The basic idea that I have at the moment is that you can put YAML data practically anywhere in the site directory structure and Jekyll magically finds, parses, and makes the data available. While I know that this is an exaggeration, I want to have a better sense of how all that works.
* Plugins - I suspect that once I get more solid with the first 2 bullets, I'm going to want to build my own plugins. 

And there are probably quite a few things that I don't even know that I don't know yet - I'll try and write about them as I discover them!
