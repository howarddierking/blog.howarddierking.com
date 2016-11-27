---
layout: post.html
title: "The \"Must Haves\" for a Service-based Architecture"
summary: "There are lots of options and even more opinions about how to properly build a service-based system. Here, we cut through the buzzword bingo and get back to the fundamentals."
---

Over the past several years, I've seen lots of architecture-related efforts come and go when it comes to services. These efforts have typically involved introducing one more more technologies that, if everyone would just get onboard, would move the organization to a next-generation, 100% available, reliable, compliant, secure stack. A few examples include REST, Kubernetes (then Swarm, then microkernels, then...), Consul.io, and Kafka (pub-sub).

Now, put my sarcasm aside for a moment, because I believe that none of these things are bad - in fact, I think that every single one of the technologies listed (and their associated architectural patterns) can be very good things. The problem here, and the reason why I believe many organizations never make significant progress towards their technology goals, is that we have put far too many patterns and technologies into the "must have" category where as most of them better fit into the "should have" or even "nice to have" categories. One of the key steps towards affecting change is to be brutally honest with where you are on the [hierarchy of needs](https://en.wikipedia.org/wiki/Maslow%27s_hierarchy_of_needs) and then move realistically, both in direction and pace.

So here's where I think many organizations are and as a result, here's a strategy for breaking out of our complexity paralysis and moving forward.

### Services? Which Services
Many organizations have efforts underway to break up a legacy "monolith" into a network of services, but - in my opinion - our models tend to be weak in knowing what those services should be. In fact, the only model that we seem to regularly fall back on is the organizational chart. The result is that we end up with "services" that are unintentionally leaky abstractions and highly coupled to one another. Sure, there may be some superficial boundaries, but when you design your services around your org structure - and when an organization defines its offering based on the *code* that it "owns" - you will inevitably end up with a set of interdependent function calls. To make matters worse, those function calls will be directly shaped by the implementation details of the underlying code. Such implementation details range from chosen database type to how the language and framework serializes its native types to formats such as XML or JSON. It is possible to take on some of these inevitable risks with top-down mandates and policy such as "you must use Swagger". However, I think that these efforts may be trying to address the symptoms rather than the underlying problem.

What's the underlying problem, you ask? It's that carving out a domain by services (e.g. functions) *cannot* produce a cohesive domain data model. I believe that the converse, however - carving out services via a comprehensive data model - is a strategy with a much higher chance of success. How do you arrive at that data model, then? How much would you like to bet that I think linked data has something to do with it? :) If we focus on getting a basic data model identified, my thesis is that we should be able to look at the resultant graph and see the clusters of the data model that should be managed together. We should draw a line around that cluster, and voila! There's your service.

### Focus on the Fundamentals
Once we have some services identified, we then get back to the question of how those services should interact, how they should be hosted, etc. I truly believe in efficiency, and I sympathize with the goal of reducing duplicate effort. However, I don't believe that to be where most organizations currently find themselves in the hierarchy of needs. I am a big believer in emergent architecture for a couple of reasons, but one of them is that the process for making architectural choices needs to happen in a manner that reflects the reality of how we make business and product choices - and in all those other areas, we move with the market. If we can't have a market-driven approach for architecture, we will inevitably end up with something that works for a point in time, but has a difficult time adapting when the world changes. As in coding, we should accept inefficiencies up front for the sake of learning, then refactor for efficiency as our learnings take us up our hierarchy of needs.

So then, if we're going to brutally whittle the list of "must-haves", what should we include? Here's what I think.

* Services must publish an SLA and hold themselves to it
* Services must talk to one another in a _reasonably_ consistent manner
* Services must meet regulatory requirements (auditing, etc.) in a consistent manner

Both of these have some tactical sub-points that come out, and while I don't yet know what should be the must-haves for the third category, here's what I think belongs to the first (again, very small list).

* Services must communicate using the same protocol (e.g. HTTPS)
* Services must identify and discover one another using DNS
* Services must authenticate to one another in the same manner (e.g. client certificates)

That's it. Everything else is a "should have" or "nice to have", which is another way of saying, it's market-driven. Don't buy into REST? Fine. It's not like parsing text is a terribly difficult task. Let the market of services determine whether you should use those patterns for your service. For example, if you choose a pattern like XML-RPC where every interaction is an HTTPS POST, it's unlikely that you'll be able to meet your published SLA (and even if you do, you're likely to have a high associated operational expense - which could also be a part of your SLA). This creates the proper *incentives* where you will either adjust your approach or risk having someone else write a competing service that replaces yours. I realize that this must sound a bit Darwinian-extremist, but I believe that most teams will adjust naturally to satisfy their customers. And even if this should prove to not be the case, I would rather a little Darwinism at the individual service level than intractability and then failure at the organization level.
