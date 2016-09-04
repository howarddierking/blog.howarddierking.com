---
layout: post.html
title: "My Next Pluralsight Course (plus, I need your help)"
---
I couple of years ago, I created the course [REST Fundamentals](http://pluralsight.com/training/Courses/TableOfContents/rest-fundamentals) for [Pluralsight](http://pluralsight.com). The course seems to have resonated well with folks and as such, Pluralsight has given me the opportunity to produce a follow up course, which I'm titling 'Building RESTful Cloud-Scale Services.' The big idea for the course is this: while cool architecturally, REST isn't an end unto itself, but a means to achieving a certain set of system characteristics. Prior to the rise of cloud computing, the value behind some of these characteristics seemed questionable because of the economics of computing. Put another way, in the world where applications ran on owned hardware, it didn't really matter whether or not an application was wasteful with CPU resources, because it was highly unlikely that it would exceed the CPU's capacity and (more importantly) the hardware had already been paid for (via capital expenditure) and there was therefore no tangible cost associated with the waste.

Cloud computing changes the economic model. Hardware resources are not owned - they are leased. CPU-based services are the most expensive category of cloud services (and the most prone to failure), and because the cloud economic model makes computing into an ongoing, operational expense, architectures that are wasteful - particularly with CPU resources - have a tangible cost impact. This means that many of the characteristics that are realized in a RESTful architecture have a very real impact, not just in terms of developer-focused values such as evolvability, availability, etc. (though they also realize these values), but also to a business's bottom line.

In the course, I want to combine a couple of things, including REST, to derive a practical reference architecture for cloud-based services. One of the key tenets of this architecture is that services optimized for storage are significantly cheaper to run, more reliable, and more performant than those based on CPU. Most services today, including those built on frameworks like [ASP.NET Web API](http://asp.net/web-api), [NodeJS](http://nodejs.org/), and [Sinatra](http://www.sinatrarb.com/) are CPU bound, meaning that a request is sent to a server (code running in a process that listens on a socket) and the server executes some user code to handle the request and generate a response. I think that given the wide adoption of these sorts of frameworks, this topic should be interesting to most folks.

In proving out this tenet, I'm running a few different experiments and collecting some data. One of these is experiments is this blog. As I mentioned, I recently moved this blog off of a shared blog site which was built on the [Wordpress CMS](http://wordpress.com/) and am now running it as a completely static set of HTML pages hosted in an [S3](http://aws.amazon.com/s3/) bucket. I'm tracking cost via the AWS billing portal and comparing that with usage statistics collected with [Google Analytics](http://google.com/analytics). 

This is a good start to the experiment, but I'm hoping to get a bigger sample set of data - and for that, I would like your help. If you're open to sharing, I would like to collect the following information from a broad set of Web sites and/or services (all data would be discussed in aggregate - so no worries about your info leaking out in any way).

* Average _total_ monthly hosting cost
* Platform
    * Operating system
    * Framework
    * Architecture description (e.g. nginx gateway, expressjs middle tier, SQL Server back end)
* Montly page views - for this, please also indicate whether you're instrumenting from the client or the server, as this might impact how the data gets aggregated
* HTTP address of the site/service - I'll use this to run a few tests to measure things such as latency. I promise to not run load tests on your site :)
* (Optional) Geographic diversity - % page views by region/country

If you're open to working with me on the course by sharing this data, send me an email, DM me on twitter, etc. 

Bottom line: I want to do what I can to help move the discussion around REST past the realm of the theoretical ivory tower and demonstrate real, measurable outcomes - both for the developer and for the business. I hope that you'll help me do that.