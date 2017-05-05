---
title: Thoughts on a Next Generation API Gateway
layout: post.html
summary: "Today's API Gateway products are geared towards addressing deficiencies in upstream services rather than adding unique value. I have some thoughts on what a next-generation, value-adding gateway might look like."
headerImage: /images/gateway-future.jpg
---

Over the last two years, I've had the opportunity to look at a number of different API Gateway products as well as participate in the design and development of a [fit for purpose](http://blog.howarddierking.com/2015/05/24/on-api-gateways/) gateway service for my company. Through these opportunities, I have landed on a conclusion about the current API Gateway landscape and a vision for the future of API Gateways.

First, on the state of API Gateways today, I have a simple conclusion:

> Today's API Gateway products are geared towards addressing deficiencies in upstream services (sometimes better written with quotes around "services") rather than adding unique value.

Now, this isn't to say that there's not some value in prolonging the life of an outdated or poorly constructed system by putting an API Gateway in front of it. In fact, one of the mistakes that I made in the design of our internal gateway was not focusing enough up front attention on these types of problems and instead prematurely building for the long-term vision. That said, I also think that there is a tremendous opportunity for API Gateways to do far more than they do today. I believe that API gateways can help move the industry forward rather than dragging out the lifetime of otherwise outdated systems.

## My Ideal Gateway

At the end of the day, an API Gateway should provide two high level functions:

* Act as a standard naming authority for one or more Web APIs
* Offload zero or more cross-cutting processing jobs (e.g. authentication)

As is always the case, however, the devil (or the opportunity) is found in the details behind both of these functions. The future API Gateway service that I have in mind would combine capabilities from a few current technology trends, illustrated as follows:

![Next Generation API Gateway](/images/api-gateway-next-gen.png)

### Software Defined and Mesh Networking

In my experience, the addition of an API Gateway to an enterprise is typically wrapped up in parallel efforts to modernize infrastructure, application architecture ([Microservices, anyone?](http://arhipov.blogspot.com/2015/03/misconceptions-about-microservices.html)), culture - or for my team, all of the above. Unless the enterprise chooses to manage all of these moving pieces and sometimes conflicting goals through the [organizational structure](http://www.gartner.com/it-glossary/bimodal), there needs to be an acknowledgement and support for divergence as a result of granting teams a higher degree of autonomy and accountability. In my experience, this phenomenon can be most clearly observed in the rate and degree of public cloud adoption.

While there are many different strategies for public cloud adoption, there appears to be a correlation between cloud strategy and network design. For example, if the organization has built up expertise in designing and tightly managing networks (in this world, I've typically seen security viewed as a predominently network concern), the cloud strategy will be designed to fit within the organizations view of the network. This could mean using technologies like [AWS Direct Connect](http://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html) to bridge networks together; it could mean Re-IPing large segments of infrastructure in order to preserve a consistent IP space. The cloud strategy becomes a function of the network strategy.

On the other hand, if the organization builds the cloud strategy around services and autonomous teams, the network design should be [assumed to be fragmented](http://blog.howarddierking.com/2016/10/21/there-is-no-data-center/).

And this is where there is tremendous opportunity for a next-generation API Gateway service. The gateway can operate at a level above the network or set of otherwise disjointed networks and provide routing in/out and between them. This enables individual services to be referenced by stable names without having to depend on shared (and typically centrally-managed) infrastructure such as a network address space or service discovery backplane. As a result, it enables teams to better manage their dependencies, both on one another and on single, shared services and infrastructure teams.

One of the most interesting possibilities about this API Gateway service design, though, is in its ability to support both hybrid-cloud and multi-cloud scenarios. The former is all-too-familiar scenario for most large enterprises who have made investments in on-premise infrastructure and are now trying to move workloads into the cloud. While such a proposal looks great on slides, the process of making it happen can get bogged down pretty quickly - many times because of aforementioned differences in network architecture. An API Gateway that sits outside of the cloud provider and on-premise networks and can route between them can enable incremental migration to the cloud without first requiring a "big bang" network rationalization.

If rationalizing network architectures between a cloud service provider and on-premise is hard, trying to further rationalize networks across multiple cloud service providers will prove even harder - particularly over time. However, by operating at a level above, a next-generation API Gateway could handle multi-cloud topologies with the same elegance as it would hybrid-cloud scenarios.

### Global Traffic Management

If the API Gateway service is built to sit above and route traffic across different networks, it seems only fitting that it should be able to do this at a global scale. More concretely, as a namespace authority, the API Gateway would supply stable resource names for every service-based resource in the system, regardless of the network on which that resource is hosted, anywhere in the world. Because of the regulatory requirements imposed in different regions, the API gateway can also add value to enterprises by providing resource naming and enforcement capabilities that conform to transparency and data privacy laws. 

### Serverless Computing 

Serverless computing has become all the rage over the last year with all of the major cloud service providers supporting lambda-style computation. Even non-Google sized companies like [Auth0](https://webtask.io/) are getting into the serverless game (shout out to my friends [Glenn](https://medium.com/@gblock/) and [Tomek](https://tomasz.janczuk.org/)!). Clearly, there's something here, right??

In my experiences with API Gateways, I've found that at some point, every product and every framework requires custom logic. Most commonly, it's related to security, but I'm sure that there are about as many reasons as there are services out there. Given this, an API Gateway service that had the ability to run cross-cutting logic (such as authentication) and thereby push it closer to the network edge would be a valuable addition to an enterprise needing to operate a system at global scale.

Additionally, a serverless execution platform pushed outward to the system edge would open up a new platform business opportunity for processing components. Common components such as token validation and/or certificate enforcement could be provided as a part of the gateway product itself. Additional components could be developed and sold as add-ons.

## Getting to the Ideal

As I've discovered over the last year, crafting a vision is much easier than realizing it. Realizing the product vision I've described here will require diligence in network design, configuration management, security, and probably a dozen or so other engineering areas (many that I'm sure I haven't even considered yet). It will also require development by or partnership with a company that has a large global network presence. The challenges are neither few in number nor easy to overcome, but the resultant service could accelerate enterprise movement to the cloud and perhaps even make the cloud a more reliable place to run applications. Who knows? It could even breathe a little more life into that on-premise infrastructure.
