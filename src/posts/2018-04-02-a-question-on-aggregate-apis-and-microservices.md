---
title: A Question on Aggregate APIs and Microservices
layout: post.html
summary: "I received the following question from one of our service teams last week and thought it was likely the type of issue that a lot of you are dealing with (or have solved) in our current world of 'microservice all the thingz!'"
headerImage: /images/spongebob-microservices.jpg
---

I received the following question from one of our service teams last week and thought it was likely the type of issue that a lot of you are dealing with (or have solved) in our current world of "microservice all the thingz!" The question went something like this:

> For a current (or future) transactional API endpoint (for example CREATE [entity]]), with the move to micro services do you think (or know) that the API will still be at the highest level as it is today and behind the scenes any data stored within a micro service would just be taken care of in the ‘aggregate’ API, <br><br>
> OR <br><br>
> Is it the case where each micro service supporting its data would provide their own endpoints (whereby the data points are exploded over a wider distance than previously) where a consumer of such end points to achieve something like a CREATE entry transaction would have to interact with as many endpoints as is necessary.

This is a fantastic question and one that I think highlights how *we as a software development community are like little children - happy to bump into and trip anybody in our way as we chase the latest shiny object.* In this case, the stated shiny object is the overloaded and therefore meaningless term "microservices".

I think there are 2 great topics embedded within this question, and I'll address them individually. However, the answer to the specific questions - in good software industry fashion - is "it depends."

## 1. The Internal Face Should Be Manageable

Contrary to what your favorite vendors may be telling you, microservices is not an end unto itself. In fact, microservices isn't really a defined thing at all from an implementation perspective. Were I to try and generalize all of the blogs, rants, marketing spin, etc. to arrive at a definition, I would likely just come back to [Wikipedia's](https://en.wikipedia.org/wiki/Microservices). The most important part of that description is the _reason_ for considering microservices.

> Microservices-based architectures enable continuous delivery and deployment.

So, to the first part of the question, I would say that it should not be some kind of foregone conclusion that we "move to micro services" at the same rate (or at all) for every aspect of the application. Service decomposition must be done in order to achieve some real, measurable outcome - not because you heard that it [worked for Netflix](https://www.gartner.com/webinar/3437517). This is doubly important because this architectural shift has some very real trade-offs: 

* Many (most?) developers have little to no experience actually being on the hook/pager for operating a production service and, speaking from some experience here, it takes some getting used to. So while I'm not suggesting that no action be taken in decomposing systems into services, I am suggesting caution in the rate of decomposition and the size of the resulting services so as to not end up in the [nanoservices anti-pattern](http://arnon.me/2014/03/services-microservices-nanoservices/).
* The word transaction gets thrown around pretty loosely these days, so I'm not 100% sure whether it's referenced here in a general or strict sense. However, if we're talking about a strict ACID transaction, trying to implement this as a part of a distributed system over HTTP is just asking for pain - lots and lots of pain. If there's a legitimate transaction boundary at play, I would question where there is really a "service seam."

Again, the goal of microservices (per Wikipedia) is to enable continuous delivery and deployment. It should be able to accomplish this by making systems easier to reason about, easier to build, and easier to test. If a microservices refactoring doesn't accomplish this goal, reconsider why you want to decompose the services in the first place.

More generally, the point that I want to make about microservices architecture is that it is an *internal, implementation detail*. The decision to go down this path (or to not go down the path) should not have a side effect on the user experience.

## 2. The External Face Should Be Unified

On that note, the API is a key part of the user experience - meaning, it should be ... you know ... usable. One of the best ways to make an API usable is _(spoiler, it's not HATEOAS)_ consistency. And unsurprisingly, consistency grows more difficult as more and more APIs are published.

Here are just a few ways that a sprawling API landscape can get in the way of consistency, and usability by extension.

* Different names used for the same concept (and the same name used for different concepts)
* Service endpoints reflect the organization rather than a real domain concept
* Services adopt different idioms for common functions - some examples include: 
  * Parameters (1 parameter for a message vs. many parameters)
  * Hypermedia
  * Errors
  * Paging, sorting
  * Content negotiation strategies, supported media types

Another way that microservices attempts to attain continuous delivery and deployment is to enable parallelization of work by having independent teams own individual services end-to-end. Based on that strategy, it is reasonable to conclude that a current microservices architecture will inevitably result in a proliferation of APIs.

It may be possible for the stars to align and your internal service interfaces could form a delightful developer experience for your customer. However, I've never seen it happen, and I would argue that even if it were to happen, the utopia would last only until your next API versioning event. So to answer the second part of the initial question, I think that it is more than prudent to include an API "UI layer" into any system that plans to follow a microservices path. In a show of hypocrisy, I'll mention that [even Netflix figured that out](http://netflix.github.io/falcor/starter/what-is-falcor.html).

I'll go one step further and say that I believe [GraphQL](https://graphql.org/) to be a fantastic API UI layer technology - but that's probably a post for a different day :)
