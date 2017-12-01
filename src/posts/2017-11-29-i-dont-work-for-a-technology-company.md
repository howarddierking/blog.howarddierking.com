---
title: I Don't Work for a Technology Company
layout: post.html
summary: "I don't work for a technology company...and it's likely you don't either."
headerImage: /images/Lancaster_McDonald's_sign.jpg
---

# And it's likely that neither do you

One of the projects that my team works on is a [GraphQL](http://graphql.org/) server. The service provides a consistent, data-focused interface between multiple types and versions of front end applications and multiple types and versions of back end APIs. Now, let me be clear up front: _this post is not about GraphQL vs. REST_. As I'm sure will be unsurprising to the vast majority of you, our back end services differ wildly in terms of design (from RPC to "Pragmatic REST" (aka RPC) to full-blown hypermedia), content types and granularity of resources. So our decision to use GraphQL is based on what I think are 3 realities that are *specific to a company and a culture*.

1. The management culture is not top down - so mandating a common API design spec is not going to happen
1. In absence of that, API design will continue to diverge across all of the back end teams
1. The UI teams don't care about the aesthetic preferences of the back end teams

So - agree or disagree - there's your context for why GraphQL made sense for us.

## Our GraphQL Service
The first (and current) incarnation of our GraphQL server had noble motives, but was overly optimistic in its ambition. We decided to design, build, and operate a single GraphQL server that would define and contain the schema for the entire company. By putting ourselves in this position of technical middle-man, we would then also be able to be the gatekeepers for defining a new "clean" data model for the company - and thereby save the company from itself. 

If you've been down this road, you know exactly how it played out. A team of 12 - no matter how talented - could not develop the level of domain expertise to cover the entire business domains of travel and accounting fast enough to define, articulate (e.g. argue for), and implement a clean-room data model. In the meantime, UI teams had started down the path of using the service and the velocity of their requests for new parts of the business to be exposed via GraphQL grew exponentially. To quote my Product VP, the team had lost control over its own backlog.

So, took the lessons learned from running the current service and pivoted towards building out a platform whereby other teams could create and deploy GraphQL fragements and we would stitch them together into a unifying schema and provide all of the runtime capabilities. The phrase I've been using inside the company is that we want to create the AWS Lambda of GraphQL. So imagine my surprise this morning when I discovered that [AWS is already thinking in this direction](https://aws.amazon.com/blogs/aws/introducing-amazon-appsync/).

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">TFW <a href="https://twitter.com/awscloud?ref_src=twsrc%5Etfw">@awscloud</a> announces the release of a new offering that potentially obsoletes the thing you&#39;ve been working on - <a href="https://t.co/aqNaMZ239H">https://t.co/aqNaMZ239H</a></p>&mdash; Howard Dierking (@howard_dierking) <a href="https://twitter.com/howard_dierking/status/935924284307861504?ref_src=twsrc%5Etfw">November 29, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## This Seems Familiar

In all honesty, this morning's discovery shouldn't have been all that surprising. We followed a [similar](http://blog.howarddierking.com/2015/05/24/on-api-gateways/) [path](http://blog.howarddierking.com/2016/10/21/there-is-no-data-center/) with our [API Gateway](http://blog.howarddierking.com/2017/05/04/thoughts-on-a-next-generation-api-gateway/) project, and while at the end of the day the company is still running its own API Gateway, I suspect that the technology has already been surpassed by what's available either commercially or in the open-source community and we will soon find ourselves in that all-too-familiar place of deciding whether to accept pain in moving forward with a better technology or staying with what we've built because we've custom-tailored it to the ways that we do [have always done] things.

## The Problem

I've had the opportunity to see this type of problem present itself several times now, and while each instance looks a little different, I think there's a common root cause that looks something like this clip from the movie, ["The Founder."](http://www.imdb.com/title/tt4276820/)

<iframe width="560" height="315" src="https://www.youtube.com/embed/uu1nCM--5wo?rel=0" frameborder="0" allowfullscreen></iframe>

In this clip, Ray, the main character in this story of the McDonald's fast food chain, is lamenting some of the challenges he's facing with the restaurants when his counterpart lays out a very poignant assertion: that Ray doesn't realize what business he is actually in. I'll encourage you to watch the movie for the rest of the story, but I'll bring up this quote because I think that it applies to most of us in the software development world. Most of us don't realize what business we're actually in - and as a result, we make decisions that are either unhelpful to, or in some cases downright harmful to our actual business. 

My company, like many of yours, is a business software company. *It is not a technology company.* "What's the difference?" you might ask. After all, with slogans like "[every company is a technology company](https://www.forbes.com/sites/forbestechcouncil/2017/01/23/why-every-company-is-a-technology-company/)" and "[software is eating the world](https://www.wsj.com/articles/SB10001424053111903480904576512250915629460)" having taken root as a part of our every day world view, it's difficult to see or care about the difference. However, it's important because - as I said - it affects how we make choices. 

I'll toss out a couple quick definitions so that even if you disagree, we can disagree having the same understanding of terms.

* A technology company's market value is derived primarily from the *creation* of technology. How the technology is used and who it is used by does not strongly correlate to that value.
* A [business] software company's market value is derived primarily from the *application* of technology to improve an existing business process. In fact, in a lot of ways, the only material difference between a software company and an internal IT organization is that the deliverable from the former is a resellable software product as opposed to an internal tool.  

Both of these are necessary and good functions. However, when you try to apply them in the wrong context, you're asking for all sorts of problems - problems ranging from wasted time and money to architectural decisions that set your company back years.

So why do we keep chasing after trying to reinvent the wheel and build technology rather than simply add value to our respective businesses by building software? I'm sure that there are as many answers as there are people, but I'll take a stab at a few common ones that I've both felt and observed.

* Many of us possess a natural mix of curiosity and arrogance. We want to understand how something works and then [too] quickly conclude that we can do it better.
* We have bought into the belief that there is a hierarchy where pure technology development is superior to business software development. This feeds into..
* We're insecure. Nobody wants to be known as a "builder" if they can instead be the "engineer" or (even better) "the architect"

> As a result, we reinvent the wheel, but in a way that only works for our car, and then we build the rest of our car in a way that only works for our wheel - and our customers are the ones who suffer for it.

## "But...Netflix!"

Clearly, there are examples out there where an organization started as a software company and morphed into a technology company. However, in most of the examples I can think of, that transformation happened as a function of scale at a level that you and I will likely never have to concern ourselves with. To restate something that's been said many times, [_you are not Netflix_](https://thenewstack.io/reminder-you-are-not-google-and-dont-try-to-be-netflix/).

## The Path Forward

The message in this post should not be taken negatively. In fact, what I'm suggesting here is that we should all take a great deal of pride in what we're doing rather than wishing or pretending that it is something else. So here are a few reflective questions and actions that I'm talking about with folks in my organization.

* If you work at a technology company, build the most air-tight, broadly used technology imaginable. If you're a service, consider all of the *abilities and make sure that I as your customer have visibility into all of those measures (preferably through a programmatic interface). Craft an operational model that takes into account how large companies do things like purchasing, support contracts, etc.
* If you're a business software company, be obsessed with that end user. You know, the one that spends half of their day wishing that they could just go back to using Excel. Don't give them any room for those thoughts.
* If you want to work on a pure technology project and you work for a product company, either a) find an open-source project to work on (I hear there are a few looking for good contributors) or consider trying to move to a technology company. Don't risk your customers' happiness for your own personal ambitions.
* If you want to work on a product but you're working on more of a pure technology, I've found that working on internal process optimization projects can sometimes help scratch that itch. Otherwise, consider moving to a product company.

Again, at the end of the day, neither type of business is better - just different - with different customers - who expect different deliverables. 
