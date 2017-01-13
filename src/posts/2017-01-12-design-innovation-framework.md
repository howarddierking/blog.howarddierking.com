---
title: Evaluating Software Design Choices
layout: post.html
summary: "Why does it seem that some software projects are constantly running into barrier after barrier when it comes to adoption while others sail smoothly into acceptance? I've put together a framework to try and help answer this question as well as to guide future decision making."
headerImage: /images/lightbulbs.jpg
---

Let me open this post by wishing all [ten] of you who read this blog a very happy new year! I wish for you all a 2017 full of accomplishment and growth - and I hope that some of my ramblings here are able to play a small part in that.

In typical fashion, I spent the last few weeks of 2016 reflecting over the year for both myself and my team. As a part of that exercise, I considered the projects within my group that went well and the projects that struggled - either in meeting expectations or in gaining adoption by other teams within the Company. The result of that reflection was the following chart.

![Innovation Decision Matrix](/images/innovation-decision-matrix.png)

The matrix looks at a project or a design from 2 dimensions. The x-axis considers the "forward-lookingness" of the design. While I think of design here as technology-based, I would image that you could apply the dimension to other definitions, such as UX. A few points along the x-axis (from left to right) that I typically mention as examples are:

* The design is an excuse to play with a shiny new technology
* The design solves a problem on the horizon that we don't yet have
* The design solves a problem that we have but haven't acknowledged
* The design solves a problem that we know we have
* Bug fix

The y-axis considers the number of dependencies, both incoming and outgoing (though in initial thinking, more weight was given to incoming dependencies) between the project and other components of the larger system.

When these two dimensions are put together to form a coordinate plane, the following "zones" emerge.

### The Zone of Incubation
In this quadrant, a project or design is optimized for the future and is somewhat disconnected from the immediate challenges of the larger system or business. Perhaps as a result of this charter, it draws a small number of dependencies and is able to move very quickly in trying and discarding different designs and technologies. An example of projects in this zone include new green field projects as well as many different efforts being undertaken by pure research labs. While the zone of incubation can be an exciting place for any project or team to start, because the efforts in this zone are not critical to the business, it is not a desirable place to stay. As I'm sure many of you have witnessed, when financial times get tough for large organizations, research labs are typically first to hit the cutting room floor. More importantly, however, I believe that everyone wants to make a significant contribution to a worthy cause. And in order to fulfill that need, the product of one's efforts needs to ship to customers.

### The Zone of Pain
Much like the zone of incubation, a design effort in the zone of pain is future-focused and as a result can still have an experimental quality to it. However, unlike projects in the zone of incubation, a project in this quadrant has taken on dependencies. Dependencies here can take on many forms, but two prominent categories include external programs taking a dependency on the project and the project taking a dependency on standardized - and possibly less forward-thinking - infrastructure. In either case, there is an inherent conflict between the long-range design goals of the project and the more tactical needs of its dependencies. The result is, as you may expect, pain.

### The Zone of Rigid Relevance
Many development teams who find themselves in the zone of pain try to alleviate the pain by abandoning original design goals in order to satisfy their dependencies and thereby remove the friction that is causing pain. This is a perfectly understandable response, but it is not without its own side-effect. As a project moves further towards the right of framework and focuses on addressing immediate, tactical issues, the team can find itself becoming less and less able to make changes to the project - even when the change may be critical to the project's longer-term reliability. This becomes a tragic paradox in that while the relevance of the project is increasing in terms of the business, its long term ability to add value to the business is decreasing. Ultimately, this project will likely come under the banner of sustained engineering.

### The Zone of Innovation
A project that is able to evolve _towards_ solving more concrete business problems while aggressively managing its dependencies should find itself in a space where it is able to innovate technologically and simultaneously increase its relevance to the business. Put another way, this is the zone of happiness and sanity. There are many strategies for managing dependencies and they largely depend on the type and direction of the dependency. However, as I evaluate different projects that I have ongoing as well as those from sister teams and my own history, it is this strategy of aggressively managing dependencies that differentiates smooth project execution from the circus variety.

## Apparently Harvard Agrees :)
So here's something funny. Within a couple days of my putting this matrix together and feeling all proud of myself, I picked up the latest issue of Harvard Business Review and was drawn to [an article on blockchain](https://hbr.org/2017/01/the-truth-about-blockchain). Wouldn't you know, the authors had come up with a framework that looked remarkably similar to mine. The focus of the framework was tailored to the narrative of the article (which was to make an argument for a lengthy blockchain adoption timeline), but the 2 axes were  similar (x-axis was labeled "novelty", and y-axis was labeled: "amount of coordination"). I mention the HBR article here because a) it's a nice article for understanding blockchain and b) it helped to solidify and validate some of the thoughts that I was developing. It also provided some additional terms that are useful for thinking about technology.

#### Foundational technology
> "Blockchain is a foundational technology: It has the potential to create new foundations for our economic and social systems. But while the impact will be enormous, it will take decades for blockchain to seep into our economic and social infrastructure."

#### Disruptive technology
> "blockchain is not a “disruptive” technology, which can attack a traditional business model with a lower-cost solution and overtake incumbent firms quickly."

## An Example

In my case, I used this framework as a way to plot and thereby understand why projects in my organization experienced different results in terms of properties like execution friction and adoption. However, the more I looked at the plot, the more I realized that the matrix was helpful for evaluating smaller design decisions within projects - and doing this is enabling me to think more strategically about how I can introduce innovations (even innovations involving a higher number dependencies) over time in a more phased approach.

As an example, one of the projects that my team manages is the API Gateway. This project, from the onset, was to have many dependencies (e.g. every service that wished to be exposed to the outside world). The gateway could very easily solve this challenge by acting as a simple reverse proxy. However, we had an architectural vision for the gateway that went far beyond the immediate problem. Our design would enable a distributed network of gateways that would collectively act as a naming authority for all HTTP resources, regardless of their location. This location transparency would enable a service team to use any infrastructure it wanted, on-premise or cloud, thereby enabling innovation at a rate faster than would have been otherwise possible. While I continue to believe that this design is correct, we failed to realize that the mismatch between the long-term nature of our design combined with the high number of dependencies would (and did) land us in the zone of pain. Looking at it through the lens of this framework, I think that we would have introduced the design in phases (right to left), solving the immediate challenges first, then revealing more of the longer-term vision over time.

So what about you? Does this framework resonate with any of your experiences?
