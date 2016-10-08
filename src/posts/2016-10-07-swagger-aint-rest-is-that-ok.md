---
layout: post.html
title: Swagger Ain't REST - is that OK?
headerImage: /images/you-keep-using-that-word.jpg
---

If you've spent much time with me, you've undoubtedly heard me ramble on at length about linked data. And in those conversations, you've likely heard me say something to the effect of "linked data _is_ REST". However, I haven't really spent much time talking about REST by itself - especially considering the amount of importance heaped on it by proponents of the "API Economy". I've focused my attentions elsewhere primarily because as an architectural style, REST isn't something that a team can just go and implement. Rather, REST describes (in the form of constraints) the properties of the World Wide Web.

I want to briefly wade into the general topic of REST (I'm sure to great disagreement from some of you) for 2 reasons:

1. I care more that folks understand what REST is and is not than I care about whether people build "RESTful APIs". As I hope you'll see, REST is not some kind of silver bullet solution; and in fact, it brings its own challenges.
1. I believe that many API strategies, while well intentioned, end up being hamstrung by a faith-like allegiance to an incorrect understanding of REST.

So, let's dive in.

### REST

Let's do a [very] quick definition of REST. REST was *part of* Roy Fielding's doctoral thesis; the purpose of the thesis was not to define something novel (e.g. REST), but rather to compare and contrast architectural styles of the time with the style of the project that Fielding was working on in his graduate studies. That project was the WWW, and this is really important, because it gives us insight into the "spirit of REST." As Fielding looked at what made the WWW unique, he landed on the following (note - I'm paraphrasing for readability):

* client-server: enables multiple clients to develop and evolve independent of the server
* stateless: enables the infrastructure to scale and evolve independent of client and server; also aids in system resiliency
* cache: can improve system efficiency
* uniform interface: enables the server to evolve independent of the clients
	* resources: create a level of indirection between database entities the concepts that clients consume (and therefore are bound to)
	* representations: enable multiple expressions of a resource for different types of client
	* self-descriptive messages: the data needed to direct a client to handle a message is contained in the message itself
	* hypermedia: the set of available operations and data at any point in a workflow are contained in the message as a set of links
* layered system: enables maintainability at scale
* code-on-demand: enables server to provide optimized path for supportive clients

People love to get hung up on the meaning of what Fielding may or may not have meant by the details within each of these bullets (which is a bit ironic as he wrote in reasonably precise terms), which makes having the lens of the WWW all the more important. Let's consider the formal REST definition through the lens of the Web.

* lots of versions of lots of browsers (with the notable exception of IE :)) can process documents from the same Web site without the Web site knowing of their existence
* HTTP connections are logically torn down after each client-server interaction, meaning that state needs to be held passed by the client in each interaction; there are hacks like session that enable a logical statefulness in interactions, but it's just that - _logical_ - and even it tends to limit some of the benefits of the statelessness constraint.
* the Web has multiple layers of caching, from the browser, to the origin server and everywhere in between. All of them can follow the same cache policy as specified in the appropriate HTTP headers
* the uniform interface of the Web is the super-important part
	* documents are named with dereferenceable URLs
	* each document is of a specific type (e.g. HTML, CSS, jpeg)...
	* ... and that type is communicated in the message (e.g. content-type header) so that the client knows how to comprehend it
	* the user navigates from one document to another using links contained in the documents themselves
* because all interactions work the same way, the Web has lots of different layers where different optimizations can happen (e.g. Akamai)
* in certain scenarios (e.g. OAuth), the server sends Javascript down to the browser to automate what would otherwise be custom code or a user action. This isn't required, but it's helpful.

There's a meta-point here that I want to emphasize.

> the Web and its supporting architecture is about enabling a user to discover and navigate an undetermined and ever changing set of _documents_ using generic client applications.

So, given this lens, let's consider where we are today.

### API Strategies
Regardless of the buzzwords used to describe it, most developers - and companies by extension - have a function-centric approach to building software. We build stored procedures to manipulate relational entities; we build services to satisfy the requirements of user interface workflows. As an extension of this mindset, when challenged to build a new generation of "RESTful APIs", we look for a familiar path - one that enables us to specify functions. From this, it is only natural that we might land on something like Swagger. In practice, there's really no difference between Swagger, RAML, API Blueprint, and WSDL 2.0 (in fact, there's not very much _philosophical_ difference between Swagger and WSDL 1.0). The primary differences are aesthetic.

For its intended purpose, Swagger is just fine. It enables the developer to define function signatures, it allows for parameter definitions to include complex types defined using a syntax like JSON-schema, it even accounts for different aspects of HTTP by defining functions in terms of URL templates and HTTP methods, and specifying return values in terms of status codes. There's just one problem...

> A Swagger API is not RESTful - neither in definition nor in spirit.

It fails the definition test because it violates the uniform interface constraint of using links to navigate between different states (operations or data). It also would require a good deal of hacking to have a Swagger-designed API support things like code-on-demand.

It fails the spirit test because it is fundamentally function-oriented rather than data-oriented. It is little more than a modern way of enabling the same kinds of developer workflows that WSDL and other RPC service description languages were created to support. This is evident in how much interest you can see in code generation. I regularly hear interest from folks wanting to generate clients and servers from Swagger documentation files as well as generate Swagger documentation files from underlying API code. (As an aside, speaking as someone who worked on WCF at Microsoft, I can say with certainty that these kinds of attempts to optimize for ease over simplicity never end well.) Whether you agree or disagree with the practical trade-offs of this approach, it seems pretty clear that the "happy path" for Swagger is that of RPC, and this runs counter to how the Web (and REST by extension) works.

### Does it Matter?
Like I said, I'm more interested that you understand REST than I am that you implement it. By defining and then juxtaposing REST with Swagger, I've hopefully set the stage for stepping back and asking the more important question:

> Does REST fit for what we're trying to do?

Again, the lens of the Web can serve as a guide to answer this question. There are some key differences between the _workloads_ of the Web and the resulting implementation details that sit above the issues of architectural style addressed by Fielding. Some of those details, as well as their juxtapositions with the API domain, include the following.

* The unit of information in the Web was the document. The unit of information in the API space is more fine-grained to an individual datum.
* The consumer (decision-making agent) of the Web is a human being. The consumer of an API is a program.
* Clients of the Web are generic (e.g. Web browsers). Clients of APIs are generally domain-specific.
* Interactions on the Web are overwhelmingly read-only, and mutation interactions are generally simple (e.g. HTML forms). API interactions are far more write-heavy and are more complex in terms of the data sent.

These differences alone lead me to two conclusions:

1. Linked Data is, as others have described, "REST done right", both in definition and in spirit. It also has quite a few additional benefits that I'll cover in future posts.
1. REST may not be the most appropriate fit for transactional types of workloads.

Note that by "transactional", I don't mean ACID - I'm using the term in a more general sense here.

> Great, so we're all good with Swagger then?

Not so fast :)

See, if we're saying that we're OK with not building a RESTful architecture for transactional workloads, then we need to step back and look at API strategy from a purely practical point of view. In my opinion, Swagger sits in between RPC and REST, and ends up being the worst of both worlds. It requires the client to construct URLs and comprehend results (or it allows you to generate code in order to have a false sense of security for comprehension), but in the end, the server can do whatever it wants. Even in the case where the server is ruthlessly honoring its corresponding Swagger document, *any* change to the endpoints, the parameters, or the document models, will require you to version your API (after all, a goal of Swagger is to enable a server to specify it's "contract" - which is no different than a Java or C# interface). Given the reality that things change (rather quickly these days), we will quickly find ourselves needing to make a decision to take either the Apple path (regularly obsolete versions and break customers) or the Microsoft path (support lots of versions for a long time). And from what I've seen, most organizations have neither the clout of Apple or the deep pockets of Microsoft to justify either approach.

There is another approach we can consider for the transactional workloads. An approach that is already gaining traction for UI workloads. GraphQL enables the client to control not just the data to be fetched from a service, but also the shape of the data. There are 2 notable benefits of this approach.

* Even though it's not RESTful, the focus is still on the data rather than the functions. Generally speaking, data is far more stable than functions. In practice, this leads to an even more important property...
* Because the "uniform interface" in GraphQL is simplified to say "server needs to completely satisfy both the data and shape requirements of the client over all time", a GraphQL interface will almost never need to be versioned. My understanding is that Facebook has been using GraphQL for all of their transactional workloads (even between back end services) for quite some time now and has not yet had to version their URLs. If you're reading this and work at Facebook, I would love to get more details on this claim.

Therefore, the strategy with which I'm experimenting looks like this.

* model data as a directed graph using RDF (linked data)
* expose that graph using JSON-LD for analysis clients (e.g. data science)
* enable transactional workloads using a GraphQL interface
* have the GraphQL schema consume the linked data model

> So, should we pivot (yet again) our API strategy?

That sounds terribly disruptive to any organization. If you have teams that are making progress building APIs, whatever the form, I don't think anyone would want to see progress halted because of fear of an upcoming change. In fact, the principle I would argue for when it comes to building APIs is the "chill out" principle - instead, we should craft strategies more loosely in favor of empowering teams to ship _independent_ APIs. Towards this end, I believe in 3 initial focus areas.

1. Services are exposed via HTTPS and DNS
1. Services handle authentication and authorization the same way
1. Services get their infrastructure automation setup so that they can move faster and satisfy our regulatory requirements

When service teams accomplish these things, it's fine to debate the merits of different HTTP headers, status codes, formats, etc.

But considering the above 3 items, is parsing text really that hard?
