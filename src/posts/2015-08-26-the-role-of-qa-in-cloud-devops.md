---
title: The Role of QA in Cloud DevOps
layout: post.html
---

[Warning: Potentially Inflammatory Topic]

Today was a bit of a rough day for me in that I did something that is generally a bit aggressive for me. I abruptly closed an issue that was opened by one of our QA folks, thereby halting the discussion. The issue wasn't really a bug - even though it was opened as one. It was more of a questioning of the API's resource naming strategy (more specifically, a question around the use of singular and plural nouns for a specific path segment).

To be really honest with you, I'm not sure whether I did the right thing weighing in as forcefully as I did (my PM told me in no uncertain terms that I made a mistake). When I look back on today in a few months, I may conclude that the way I handled this issue was more akin to that of an irritated dev or dev lead rather than a dev manager and certainly not a director. If so, this is just one of those hard lessons that I get to learn.

It has been bugging me though, and in that, has given me the opportunity to reflect on why I closed the issue, what were some of my underlying beliefs and assumptions, and what I think should be done differently with regard to QA in general - especially in the new world of DevOps, networks of services, and the cloud.

First, a little context for why I closed the issue. It was the culmination of a few things:

* This was an issue that we had already debated as a team over a month prior and had resolved to leave the scheme as-is until there was data that supported changing it. A data point in the decision was that there was no supporting evidence that an alternate style actually improved comprehension of the API and making the change increased the complexity of the supporting code. As far as I was concerned, this issue was a done deal until there was new evidence. Continuing to pull team member focus back to this and away from other work was an unwelcome distraction.
* I've been spending some time recently looking at the work that the QA team has been doing, and am disappointed. The output that I'm seeing is basically rewriting functional tests that the dev team had already written. The only difference that I can see is that they are writing them in Java. Almost from the beginning of the project, I've been asking for QA support in the form of establishing baseline QoS metrics and setting up the infrastructure to measure against those (as well as automation like [Chaos Monkey](https://github.com/Netflix/SimianArmy/wiki/Chaos-Monkey) throughout the entire development life cycle. Instead, what I fear is happening is that because some of those tasks are unfamiliar and intimidating, QA is simply retreating to what it knows how to do - which is what it has been doing for the last 20 years or so.

Now, it's possible that I'm forming opinions based on missing context and bad assumptions. If so, I'm more than happy to own that. However, for QA folks who believe that the role of QA is to write "traditional" functional test automation, let me at least give you the perspective of a dev manager trying desperately to build a mature, large scale cloud system. There are a 2 main problems with the traditional approach.

1. The bar for writing functional tests has become insanely low. Low enough to the point where it adds just a small amount of additional value on top of the unit tests that the dev team owns. In fact, in some cases, the technology bar for writing functional tests is low enough that the dev team could choose to go ahead and write/maintain those as well. 
1. The stuff that really matters for my team is all of the stuff around the code. For example, at what point do I saturate an instance? Do I have autoscaling configured correctly? Can I really do a 0 downtime deployment? Did this new algorithm that hurt maintenance actually improve latency? Should we enable CDN?

Let me put it another way. I want QA as a partner in driving value to the service - not as a housekeeper dusting and arranging the furniture to make the room slightly more aesthetically pleasing.

> The role of QA needs to change _from_ writing tests that verify functional (and perhaps nonfunctional) requirements _to_ setting up the baselines - the scaffolding of measures and alarms - that will give the dev team freedom to experiment on all aspects of the system (both code and infrastructure) with confidence.

I believe that this is the best way for QA to drive significant value in a world where the dev team needs to continue iterating faster and faster.

But again, this is just my perspective based on the context I have. What say you? Are you in a dev organization that has QA support - and what does that look like? Are you in QA and think that I'm completely out in left field? That's fine too. Let me know!
