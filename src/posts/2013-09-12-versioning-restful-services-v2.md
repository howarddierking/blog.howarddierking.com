---
title: Versioning RESTful Services v2
layout: post.html
summary: "See what I just did there?"
---

See what I just did there? ^^

Done :)

Since publishing both the [REST Fundamentals course](http://pluralsight.com/training/Courses/TableOfContents/rest-fundamentals) as well as my [previous post on RESTful API versioning](/2012/11/09/versioning-restful-services/), I’ve had the opportunity to think more about versioning in practice as I’ve been a part of designing the next major revision to the NuGet API (v3). This has been very helpful for a couple of reasons, but the most important one is that NuGet is a real application that has both non-trivial scale requirements and a number of different clients – many of which are not controlled by the NuGet core team. Going through this API design exercise has both validated some of my earlier thinking as well as revised some other thinking. The point of this post is to lay some of that out. The NuGet experience has also surfaced some other architectural concepts which I’ll mention here but save the details for a later post (part of why this post was so delayed is that I was thinking that I would try to cover both new architectural principles and API versioning revisions in the same post – and I’ve now realized that there’s no need to hold up one for the sake of the other).

Let’s start out by reviewing the principles and strategies I laid out in the previous post for versioning RESTful APIs:

The key versioning principle is this: how you version depends on what part of the uniform interface you’re changing

1. If you’re adding only, go ahead and just add it to the representation. Your clients should ignore what they don’t understand
1. If you’re making a breaking change to the representation, version the representation and use content negotiation to serve the right representation version to clients
1. If you’re changing the meaning of the resource by changing the types of entities it maps to, version the resource identifier (e.g. URL)

So where has my thinking changed? It’s primarily around strategy #2 and it relates to several of the comments from that earlier post. For example, Aaron comments:

> Where this breaks down is that I cannot specify the accept type in the image tag, so how can I be sure that the server will default my request to image/jpg? <br><br>
> Further, If i wanted version 2, I cannot specify that either. So I feel like there might actually be some validity in using a version based uri scheme for these types of scenarios.

I agree.

In my original thinking, I was much more zealous about the promise of server-driven content negotiation than I am today. There are a few reasons my ideological shift away from the panacea of server-driven content negotiation based on the NuGet API v3 experience (really, [it’s not just because Fielding avoids it](http://groups.yahoo.com/neo/groups/rest-discuss/conversations/topics/5857) – though I tend to agree with his reasoning).

* Inconsistent support from caches
* Different levels of support from clients with regard to their ability to manipulate the outgoing HTTP request
* Lack of determinism for handling the response
* Reliance on compute-bound service architectures

I think that the first 2 reasons are pretty well understood, so I’ll focus on the last 2.

## Lack of Determinism in Responses

Even when I was promoting it for everything, I have always had some level of discomfort for purely server-driven content negotiation as it can put the client in a rather helpless position with regard to the responses it receives and what it can do with those responses. The client can certainly ask for a particular version or format of a representation, but at the end of the day, the server is in control of what the client gets. It’s a bit like when I cook dinner for my kids – "you get what you get and you don’t get upset".

Or, put another way, it’s [kind of like this](http://www.youtube.com/watch?v=M2lfZg-apSA)...

It’s fine to take suggestions and give the client back what you think will work best. However, this should be for convenience/optimization. The ability of your server to correctly interpret a client’s preferences should not be the sole way to enable the client to work with different variations of server resources. Instead of the purely server-driven approach, I’m now building systems whereby any semantic change yields a new resource with a new resource identifier (URI).

Tactically, there are several approaches that can be considered. One would be to simply not use server-driven content negotiation and always return links for the different variations of a resource.

A more hybrid approach would use server driven content negotiation to provide a "best guess" resource which would then use client-specified preferences (via metadata such as HTTP’s accept header) to either issue redirects to the correct concrete variation resource or return a response based on client preferences which would then include links to those alternate variations as well as a link to the canonical resource for the response body itself. This link to the canonical resource is critical as the response from the best guess resource will vary by client and likely change over time.

Given the example from the earlier post of the client-server interaction for getting a bug representation, this hybrid data flow might look something like this:

1. client sends GET request for /api/bugs
1. server response looks like the following:
  1. contains a JSON-formatted body
  1. includes a content-location header with the value /api/bugs.v1.json
  1. includes links in the body to /api/bugs.v1.xml and /api.bugs.v2.json (and XML, naturally) – note that these need link relationship values that the client can make sense of – the client should not be required to parse or analyze the URI itself.
1. client processes the JSON response and optionally bookmarks (saves) the /api/bugs.v1.json URI to use in future requests
1. if the client would rather work with XML, then the client grabs the URI for the XML representation (from the suppied link relationship type) and follows it.

The key to all of this is – as is the case with nearly all RESTful interactions – that the client determines which URIs to follow based on some metadata (the link relationship type) rather than by any sort of examination or parsing of the URI itself.

One of the areas here that I’m still working through is around how much to leverage HTTP’s controls for communicating some of the link semantics (the content-location header is a good example). While it would seem like the obvious right answer to use every available HTTP control, our experience with the NuGet API design is suggesting that broader architectural goals may trump HTTP "purity."

## Using Non-Compute-Bound Architectures

One of the comments I made in the last module of the Pluralsight course is that when it comes to cloud computing, the benefit of a RESTful architecture is that it lets you leverage the infrastructure of the Web. Put another way, a RESTful design should scale more cheaply than a non-RESTful design. When looking at the cloud from an architectural point of view, all services basically fall into 2 buckets: compute and storage. Of these, storage is universally cheaper, less error-prone, and more scalable than cloud services which are more compute-based. Examples of compute-based cloud services include things like:

* Virtual machines
* Web roles/sites/etc. (environments that run back end Web application code)
* Cloud databases

Whereas examples of storage-based cloud services include things like:

* Blob storage
* Table storage

While it’s certainly possible to achieve high degrees of performance and reliability from compute-based services, it generally requires more investment than services built on  storage-based cloud services. As such, for services that have high availability and scale needs, moving as much of the “api” to static, linked data in cloud storage is an appealing design. In such a design, changing the state of the data is the responsibility of many different agents that monitor for state conditions and then act across one or more of the data. This topic warrants a post or 2 of its own, but I mention it here because these larger architectural considerations have had an impact on how I’ve been thinking about versioning and content negotiation (e.g. how do you version if every resource needs to be stored as linked blobs?). For example, cloud storage providers and CDNs have limitations with respect to what HTTP headers they can serve. Also, dynamic content negotiation is not an option without introducing a compute-based intermediary. Again, the point of mentioning this architectural thinking is only to show how it impacts the tactical choices that I might make when deciding if and how to use content negotiation for versioning.

## Ramifications

The most notable impact of this revised approach for versioning (and content negotiation in general) is that it results in a very large number of URIs to manage. For the server, this isn’t a terribly difficult problem as we have lots of intelligent libraries and infrastructural services for managing HTTP resources. For the client, however, it further underscores the need to write clients in a way that they treat URIs as opaque strings, and simply follow links based on the link relationship type metadata. By extension, this also means that the path of resources consumed by a client will be heavily directed by which bookmark or entry point resource the client starts from – so make sure that your RESTful service is providing a good entry point resource with a set of choices (links) for alternate resources. These could be different versions and/or different formats. Also, it’s a good idea to provide similar links with each resource consumed by a client (as appropriate), since you never know what resource will be bookmarked by a client and later used as a starting point.

## Revised Summary

So, in my revised thinking, the overarching principle remains the same:

> how you version depends on what part of the uniform interface you’re changing

But I’ll add another principle (well, borrowed it from Fielding actually):

> all important resources must have URIs

This ends up impacting versioning strategies as follows:

* If you’re adding only, go ahead and just add it to the representation. Your clients should ignore what they don’t understand
* If you’re making a breaking change to the representation or changing the meaning of the underlying resource, create a new resource with a new name (URI)
* Use content negotiation in such a way that it can provide an optimized path to resources, but always give the client control (by way of links) to make different choices

I hope that this discussion continues to prove useful. And should I continue to revise my thinking, I will try and be a bit more timely in publishing my thoughts.

Finally, many thanks to Aaron and Cort for continuing to nudge me to get this post written!
