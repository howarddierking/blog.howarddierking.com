---
layout: post.html
title: On API Gateways
---

Do you or your company build Web APIs and, if so, do you use an API gateway to broker traffic between your customers and your products? In this post, I want to tell you a little about our experience with this class of products and add a little of my opinion, but if you're using an API gateway, I want to hear about your experience - the good and the bad.

So what do I mean by an API Gateway? I'm describing the set of products that sit between your Web API and the consumers of your API and provide a set of application-layer capabilities. Some of the most commonly used (or at least, most commonly advertised) include the following:

* API key management and authentication
* Request throttling
* Management and monitoring
* URL canonicalization
* Data format transformations
* Managed "external" API service with mapping to "internal" APIs
* Automatic documentation and proxy code generation
* Community portal

Some of the players in this space (I'm sure that there are many that I'm missing, so don't consider this list exhaustive by any stretch): 

* Mashery
* Apigee
* Layer7
* Akana
* StrongLoop

About a year ago, we selected an API gateway vendor and began what turned out to be a long and painful process of rolling it out. At the time of this writing, it is still not rolled out in production. Without getting into all of the details of our experience, I'll say that the problems have run the gamut from technology incompatibilities between the gateway and our data center to a lack of automated deployment scripts (Note: if you're an API gateway vendor, don't expect to sell into a globally distributed company unless you have a fully scripted deployment), to a thousand little paper cuts in between. However you slice it, _it hasn't been the experience we were hoping for_.

And more fundamentally, I think therein lies the problem. I think that we (the "royal we") license these products thinking that they are going to solve all of the hard problems of operating an Internet-scale Web application for us. We therefore spend lots of money, push requirements out of our applications and into the gateway, and are then disappointed and disenchanted when the gateway turns out to be what it is - just another layer in our stack that we still have to understand and manage.

But with API gateways, I think that the hope-to-despair roller coaster proves a bit more insidious. In our optimism (or hope?) that a product can solve problems that are many times the result of our own past design/architecture decisions we ironically turn off our architecture brains.

(I should mention here that the most common reason I've heard from people who have deployed an API gateway is that it helps make up for API design and systems architecture decisions that they now regret).

Here are a few areas where I find these products to be problematic. As a disclaimer, this is based only on my experience with a subset of products - if these issues are not common to most products, please let me know.

* They externalize functionality that really belongs inside the application services themselves or other parts of the infrastructure
* They end up become a single point of failure for the entire set of services
* They end up spanning multiple layers of infrastructure, preventing optimization at the various levels
* They can be difficult to distribute and manage globally

Let me circle back and say this perhaps a bit more bluntly - while you may have legitimate requirements for an API gateway, the law of the masses suggests that what you more likely have is poorly designed APIs. Adding an API gateway to this mix will not make things better (It will more than likely make things worse). If you're going to invest in your stack, invest in improving your API and infrastructure first. Then, you'll be able to clearly see where an API gateway can add value rather than just mask a problem.

So do we need an API gateway at all? And if so, what should it do?

I think that there's a collective realization out there (or maybe I'm just perceiving it as such) that having a single gateway on top of a distributed network of services may not be a terribly good idea - especially a heavier gateway product that does a lot of compute for each request. In our case, we've also realized that there are many functions advertised by these gateway products that are much better realized using an edge network (right tool for the right job, if you're not sick of hearing me say this by now). We are already an Akamai customer and would rather benefit from their enormous network and set of capabilities then we would mimic them in a more limited way using a gateway product. Techniques like using the DNS system for service name partitioning works really nicely with edge networks and many of the optimizations that they can provide.

That said, there do seem to be a set of common functions that all services within our network of services need to share - and so I think that there is room for a gateway of sorts. For example: 

* Authenticating tokens issued by our STS (yes, if we want token issuance, this should be either our own service, or a product that really focuses on identity management and federation)
* Redirection based on the user's required region
* [Maybe] Some basic logging and metrics

As you can see, the list of unique value-adding gateway things gets a lot smaller once you actually use all of the tools that you probably already have. It certainly makes the list small to the point where it's harder to justify spending the hundreds of thousands of dollars that many of these products cost. So then how should a gateway be implemented? 

Perhaps more important to me is the principle that individual service teams are end-to-end accountable for their services - and by that reasoning,  gateway components need to be factored into the design, deployment, and management of the individual service stacs (e.g. no unnecessary externalizing of the stack). Given this principle of service and service team autonomy, the gateway can exist in 2 forms:

1. As a runnable component that can be deployed directly into a stack. Linux containers give us a super-straightforward way to accomplish this, but any virtualization technology can aso accomplish this (e.g. baking Amazon machine images, etc.)
1. As a set of requirements and constraints. This piece is really important as it enables innovation to happen on the implementation of the gateway itself over time. For example, a NodeJS-based solution like Strongloop may be perfectly sufficient today. Tomorrow, we may want to move to a native solution like nginx.

In our recent experience, stepping back from the product sales pitches and RFPs and just looking at the our core requirements and data flows helped us realize something else which can provide some clarity on our expectations of a gateway. We realized that nearly every bit of shared logic that would be rolled into our gateway and reused across services was related to processing different groups of claims from within our tokens. For example, a high level service authorization rule would be based on a claim assertion for the user's access to the related service. Similarly, multi-data center routing could be accomplish by an assertion and possible redirection on an allowed region claim. We're still going through the exercise of determining whether all of the different capabilities we want from a gateway can be generalized to claims processors, but it's an enticing prospect. Regardless of how that effort plays out, though, the key takeaway is that we may not have had this realization if we we hadn't stopped comparing different products and started paying attention to what we were really trying to do.

So I'll end as I began, by asking you -

* Are you using an API Gateway?
* What were your goals and expectations?
* Are you getting what you wanted from the gateway?
