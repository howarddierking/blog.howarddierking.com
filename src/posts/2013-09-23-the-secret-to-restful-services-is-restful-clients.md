---
title: The Secret to RESTful Services is RESTful Clients
layout: post.html
summary: "I'm sitting in the airport waiting to head back to Seattle after several great days at RestFest here in Greenville, SC. Many thanks to Mike Amundsen and Benjamin Young for being such gracious hosts. I’m pretty tired at the moment, but I had a couple takeaways that I wanted to get out there – mainly so that if I forget, I have a reference point to return to."
---

I’m sitting in the airport waiting to head back to Seattle after several great days at [RestFest](http://www.restfest.org/) here in Greenville, SC. Many thanks to [Mike Amundsen](http://mamund.com/) and [Benjamin Young](http://www.bigbluehat.com/) for being such gracious hosts. I’m pretty tired at the moment, but I had a couple takeaways that I wanted to get out there – mainly so that if I forget, I [have a reference point to return to](https://twitter.com/howard_dierking/statuses/335633793518030848).

First, there were a few technologies that caught my attention that I want to spend some time going deeper on. Some of them I had heard of but had not yet gotten around to looking at – some were completely new to me. At any rate, in no particular order, here’s a list of stuff to look at in more detail:

* http://apiary.io – API documentation, testing, mocking
* [JSONt](https://github.com/CamShaft/jsont) – A JSON template language
* [Siren](https://github.com/kevinswiber/siren) – Another hypermedia media type for JSON
* RDF(-a), SPARQL, Semantic Web, Linked Data – This is a pretty gigantic space, and so step 1 here is just understanding what all of the different pieces are. However, given the work I’ve been doing with graph databases, this space feels like a natural evolutionary path forward.

The other big takeaway for me, which is really the thrust of this post, is that we (including myself here) proponents of RESTful (or hypermedia, if you prefer) architecture have spent an unhealthy amount of focus on the server. In fact, I would argue that when most people talk about REST, they are talking about building RESTful services (and as a result, focus on things like URI design). Ironically, by spending too much focus on the server, the hypermedia constraint – which is really the key differentiator for REST IMO – remains abstract and something that dogmatic service developers stick into responses with only a vague idea of how we think a client will/should use those hypermedia controls.

This disconnect between service and clients creates the following kind of interaction that happened during the "lightning talks" at RestFest this year.

* [me to front-end developer] – "having consumed lots of different APIs, what aspect of an API makes it either a pleasure or a pain to work with?"
* [front-end developer] – "that would have to be API documentation"
* [presenter (a few talks later] – "we should be providing less documentation...client developers should be able to discover our API by _following their nose_"

Ummm, hang on a second...

Sure, that sounds like a great idea...

But that’s not the reality that the front-end developer just told you that she lives in.

So where’s the disconnect?

I believe that the problem is that while we may intellectually understand that [REST describes the entire system](http://codebetter.com/glennblock/2012/03/11/you-cant-achieve-rest-without-client-and-server-participation/) (and not just the server), we don’t practically understand what this looks like because we generally build only the server applications and then make a bunch of assumptions about how the clients will "call the server."

What I think we need to do differently is adapt a practice from TDD – that is, start out by building a client first, and then build the server from the outside-in. Building a client first will give us a really clear picture up front on just how usable hypermedia controls are in practice and will hopefully cause us to think more carefully about what controls we use, or where we put those controls (perhaps not everything should be in a header?).

At the moment, I'm testing this approach with [RestBugs](https://github.com/howarddierking/RestBugs), and I hope to have something to show in the next week or so. But the big idea is this: I'm going to write my client to consume a series of static [JSON] files and will see how easy it is to drive my entire workflow through those resources. I’ll then use that experience (and the resulting representation design) to drive the design of my server, which will then drive the runtime execution of my client.

"recursion...see recursion"

I don’t know whether this approach will work yet, but I’m optimistic...

Succeed or fail, should be fun.

Your thoughts?
