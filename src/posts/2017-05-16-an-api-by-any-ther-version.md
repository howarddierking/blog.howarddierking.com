---
title: An API by Any Other Version
layout: post.html
summary: "Version 3 of my thoughts on API versioning. Spoiler: It's all just about names."
headerImage: /images/red-rose-isolated-pv.jpg
---

> "A rose by any other name would smell as sweet"

I've written and spoken on the topic of [API](http://blog.howarddierking.com/2012/11/09/versioning-restful-services/) [versioning](http://blog.howarddierking.com/2013/09/12/versioning-restful-services-v2/) numerous times over the last several years - particularly in regard to RESTful APIs. However, as APIs become more mainstream and the number of scenarios and expectations grows, it seems like it may be time for another turn of the crank in thinking about API versions. As always, these are just my thoughts, and I'm always interested in hearing yours.

In previous posts, I've addressed API versioning from an almost purely technical (or architectural) perspective. In considering recent discussions, I think this narrow focus may be problematic. In this post, I would like to step back and ask a more basic question: who is the audience for an API version and what is his/her expectations of that version?

As I've had the opportunity to observe the "API Economy" evolve over the last several years, I've noticed that the audience for APIs has extended beyond the traditional developer crowd. For example:

* *Business developement* and partner enablement groups have the responsibility of ensuring that customers and partners can succesfully integrate with your data via your API.
* *Product marketing* and sales organizations want to sell your API as a product (or at the very least a shiny new feature).
* *Support* needs to know precise details related to your service _when_ it fails and customers report the failure.

And of course, let's not forget about the developer, who ultimately needs to write code tht binds and makes calls to your service. Given these different stakeholders and their respective concerns, an API version number needs to communicate a variety of different assertions about an API.

* *Progress* - Like the "Latest commit" message on a GitHub project page, the version number can communicate to potential customers and partners that the API is in a state of active development and not something soon to be abandoned by you or your company.
* *Differentiation* - I've heard this described with terms like "launch waves" and the like, but in a more general sense, if your API is a product, then the API version number is a way to denote the model. 

![telsa facing left](/images/tesla-left.jpg) ![telsa facing left](/images/tesla-right.jpg)

(Both pictures here are of a Tesla Model S. However, there could be about 100,000 USD difference between them, so that model number is pretty important.)

* *Compatibility* - Particularly for developers, an API version number is an assertion of compatibility between the API and its consumers. There are several different levels of assertions that can be made using the version number ranging from a single incrementing number (e.g. "every change is a potentially breaking change") to a more complex statement made via [semantic versioning](http://semver.org/).
* *Contextual Anchor* - Take a look at the URL for this post and make a mental note of its various components. What does the path contain beyond the page slug? The date of publication, right? The date here (and for many content management and publishing systems) uses date as version number that anchors the content in a context - in this case, time.

Hopefully at this point, you'll agree that a version number can mean different things to different people and it's not simply about denoting changes to code. The next point of discussion that often follows is around where the version number should go - or, put a different way, what should be versioned?

* Is it the resource?
* Is it the representation? 
* Is it the content type?
* Should we version in the URL or use headers?
* ...

I'll open up this part of the discussion by committing a logical fallacy (albeit a good one). A few years ago when I started immersing myself in the REST world, I remember having a discussion with [Henrik Nielsen](https://en.wikipedia.org/wiki/Henrik_Frystyk_Nielsen) where I was trying to impress him with my newfound knowledge of resources, representations, and their respective metadata. Much of my thinking at the time was reflected in my [first versioning post](http://blog.howarddierking.com/2012/11/09/versioning-restful-services/). Henrik, being the ever-patient, good guy that he is, simply smiled and said something to the effect of "they're all resources - just give them URLs." 

I was confused. How could somebody who worked with folks like [TBL](https://www.w3.org/People/Berners-Lee/) and Fielding not agree with my brilliant, nuanced understanding of REST?? At any rate, I published my thinking and continued building and researching. As I started getting deeper into researching [http://linkeddata.org/](linked data), however, this view started making more sense to me for the following reasons.

* Philosophically, there is a connection between the _concept_ of a thing and the thing itself. This one is a bit meta, but one of the key arguments made for versioning representations (typically the content type) is that there's a difference between the idea of a thing (the resource), the thing itself (the entity), and the way that the thing is presented to a client (the representation). However, I think this statement may be only partially true. Rather, I would make the argument that the difference between all of these things only becomes apparent over time and that in a context (usually a place in time), they are all the same. This leads to an interesting dillemma in practice.
* When versioning representations (e.g. content types) rather than resources (URIs), the aforementioned context gets lost. Following the example I cited in my first post on versioning, I may have a resource named `/children/youngest`. At different points in time, this resource may map to different entities. And on the surface, this seems like a perfectly appropriate approach. However, unlike this blog post, something important gets lost - the context in which this concept has a consistent meaning (time in this case). In his talk, [The Value of Values](https://www.youtube.com/watch?v=-6BsiVyC1kM), Rich Hickey labels something like this "place-oriented programming" and analogizes it to maintaining your source code on your local file system, simply overwriting files when you need to make changes. My point here is that it's problematic to try and separate meaning from context. 
* Links - one of the most fundamental primitives in APIs - do not take metadata (e.g. HTTP headers) into account. This means that if you really want to build a hypermedia-driven system, you are faced with the choice of either creating your own protocol for specifying metadata (and hoping that your clients intuitively find and use it correctly) or relying on out-of-band tools like documentation.

Pulling this back to the discussion of API versioning, I would like to ask you to consider the following:

> API versioning is not about versioning at all - it's about unambiguous names

In the world of Web APIs (and certainly in the world of linked data), names are fully-qualified URIs. The namespace property of URIs inherently makes them unambiguous. Splitting a name between a URI and some blob of metadata is a great way to introduce ambiguity. So, echoing the comments I made [in the past](http://blog.howarddierking.com/2013/09/12/versioning-restful-services-v2/), *different representations are still resources*, and *name resources using a fully-qualified URI*.

Now, the great things about a single, consistent way of naming things combined with the level of indirection provided by a resource is that *you can have multiple names for the same thing at a point in time*. The best illustration of this idea for developers is, in my opinion, Git. 

![Git logo](/images/Git-Logo-2Color.png)

At its core, Git is simply a collection of immutable commits. Every committed change gets its very own name/identifier in the form of a SHA1 hash. However, because working with Git would be arguably more difficult if a requirent included memorizing and entering hash codes, Git supports higher level constructs such as tags and branches, which are little more than friendly labels that point to a specific commit. So an operation like `git merge my-awesome-topic-branch` is really just a friendly way of saying `git merge 086ad264cce0b50bbb8f4c5475cefec52ab696f6`.

In the Web API world, there are lots of great tools and techniques that we have available for providing this same kind of Git-like friendliness, even in a world of lots of URIs. The most often used technique is content-negotiation - either server-driven or client-driven. While this post is already getting long, I'll avoid going into the details of content-negotiation strategies and instead provide you a [reference implementation](https://github.com/howarddierking/building-restful-services/tree/master/module4). However, I'll mention here that techniques such as what I've described here goes beyond versioning and includes *all* types of variations, including different representations.

So I guess you could say that this post now constitutes "v3" of my thoughts on versioning Web APIs. I hope that it gave you a new and possibly different way of thinking about versioning. At the very least, I hope that the Shakespearian reference was mildly entertaining.
