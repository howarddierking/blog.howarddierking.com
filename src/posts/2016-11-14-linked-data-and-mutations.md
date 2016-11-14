---
layout: post.html
title: Linked Data and Mutations
summary: "Whenever talk about linked data, there are generally 2 questions that get asked: what are the practical benefits of applying linked data principles and how do you handle mutations (changes) to data? This addresses the latter."
---

I've spent much of the last couple years thinking about linked data and what that can mean for Web APIs. Whenever I've given a talk on the subject, there are generally 2 questions that get asked. The first is: what are the practical benefits of applying linked data principles such as globally scoped names, RDF, and linking to published vocabularies? For these questions, some answers are more clear (e.g. globally scoped names and a directed graph data model) while others are not (e.g. ability to infer relationships and ability to equivocate terms across vocabularies).

The second question - and the one that I want to go into a bit more - is how to handle mutations (changes) to data. I've been working for a while on a [reference application](https://github.com/howarddierking/building-restful-services) that demonstrates applying linked data principles to API design. Until recently, most of the focus has been around data modeling, content type selection, and content negotiation. And the one commonality between all of these topics is that they can be explored with a read-only API. As an aside, this was not accidental; one of the key messages behind the reference application and its associated narrative is that by starting with a read-only API, you can defer investing in building out server infrastructure and instead focus on building a client implementation to validate many of your API choices early in the design process.  That said, every API needs to eventually support modifying state, and this is where I'm finding the major difficulty comes into play.

When you think about the history of the Web, this really isn't all that surprising. In its early days, the Web was read-only as well. Scientists at CERN and other universities exposed static HTML documents via incredibly rudimentary HTTP servers. [Clients](https://en.wikipedia.org/wiki/History_of_the_web_browser) - some of which were terminal-driven - were doing good to simply de-reference a basic link tag. CGI didn't gain a lot of traction until around 1997, a few years after the Web began.

History lesson aside, the challenge inherent in API mutations lies in how the client discovers the details (both semantics and syntax) for invoking the mutation. At the risk of overgeneralizing, there are 2 primary camps: the RPC camp, which in the JSON world seems to have settled on Swagger, RAML, API Blueprint, etc., and the REST camp, which promotes use of hyperlinks. As you probably know, I have historically considered myself to be pretty solidly in the REST camp. However, as I've been working through mutations in my reference application, I have a lot more empathy for the RPC folks than I used to.

Here's why.

As you've probably noticed from the volumes of content out there on the interwebs, it's pretty easy to argue strongly for a purely link-driven API when that API is read-only. This is because the HTTP uniform interface along with a hypermedia-aware content type is sufficient for a generic client to comprehend all manner of links. However, no application [of value] is purely read-only, and this is where things get interesting. In order to think this through further, let's iterate on an [earlier example](http://blog.howarddierking.com/2016/11/04/service-ownership-and-linked-data/).

```
{
  "@context":{
    "@vocab": "http://schema.concursolutions.com/receipts#",
    "u": "http://schema.concursolutions.com/user#"
  },
  "@id": "http://api.concursolutions.com/receipt/123",
  "user": {
    "@id": "http://api.concursolutions.com/user/123456",
    "u:firstName": "Howard",
    "u:lastName": "Dierking"
  },
  "dateTime": "2099-11-05T15:05:00-0800",
  "total": "9.98",
  "currencyCode": "USD"
}
```

In JSON-LD, `@id` specifies that the property value is a URL, so we can theoretically write relatively generic clients that are capable of following links in a read-only way. However, what if we want to add the ability to update this receipt? More concretely for our receipts service, what if we want to provide a client with the ability to change the state of the receipt? How does the receipt service communicate the details around the following types of information:

* What HTTP methods to use?
* What content type to specify?
* What document shape to send?

From what I'm seeing, there are basically 2 schools of thought regarding the communication of link details. The first, as described in specifications like [HAL-JSON](https://tools.ietf.org/html/draft-kelly-json-hal-08), says that a representation shouldn't try at all to communicate these details to the client. Rather, details should be specified as a part of a custom media type definition or a [media type profile](https://tools.ietf.org/html/draft-wilde-profile-link-04), and the client should review that documentation and construct requests accordingly. The second school of thought is heavily inspired by HTML forms and basically believes that a representation should specify all of the details needed by a client so that it can dynamically construct a request. You can see this influence in media type specifications like [collection JSON](https://github.com/collection-json/spec) and in linked data vocabularies like [hydra](http://www.hydra-cg.com/spec/latest/core/).

I'm not a fan of the media type or profile-based approach largely because I'm not a big fan of custom media types or media type profiles. At best, I think that they specify a data model in an informal, and thereby ambiguous, manner. At worst, I think that they end up becoming rigid and document-schema-like, ultimately becoming bottlenecks for agility and evolution.

Prior to having tried to implement it in my reference application, I would have said that I was comfortably in the HTML forms-inspired camp. However, as I've been going through the exercise of implementing updates via hydra in my JSON-LD representations, I've been realizing a few things.

* HTML forms basically reduce all data to key-value pairs. The world of APIs is not nearly that simple, nor should we try and make it that simple. Vocabularies like hydra give you the ability to specify more complex JSON document structures, but the amount of detail needed grows quickly and can become cumbersome for a client developer to use. [Echoing an earlier post](http://blog.howarddierking.com/2016/10/07/swagger-ain-t-rest-is-that-ok/), my sense is that the current state of hydra puts the purity of design above usability.
* A big value of HTML forms is that it is part of enabling the creation of completely generic clients (e.g. Web browsers). the key piece here is _part of_ - The other reason that generic clients work in the world of HTML is that HTML specifies data, links, _and_ layout/presentation details. To complect these concerns together in the API world is undesirable, and to expect a front-end developer to blindly build UI dynamically from a representation is unrealistic.

So, like I mentioned earlier, while I consider myself in the REST camp philosophically, looking at these 2 schools of thought, I can understand why a developer who is primarily interested in shipping a product would conclude that the hypermedia constraint is simply not worth it and adopt something like Swagger instead.

Because I'm pedantic and stubborn, though, I'm not quite ready to throw in the towel on hypermedia just yet. I think that it can still provide quite a bit of value for mutations - especially for eliminating classes of bugs such as order of operations bugs (if you can't yet do it, there's no link enabling you to do it), not authorized bugs (if you don't have permission, you don't get a link), etc. As such, I'm spending time at the moment thinking about a linked data vocabulary (possibly a subset of hydra) that enables specification of mutation link details in a way that is more formal than a media type, but more coarse-grained than collection JSON or hydra. Here's a [very] early sketch of what I'm thinking.

```
{
  "@context":{
    "@vocab": "http://schema.concursolutions.com/receipts#",
    "u": "http://schema.concursolutions.com/user#",
    "m": "http://schema.concursolutions.com/mutations#",
  },
  "@id": "http://api.concursolutions.com/receipt/123",
  "user": {
    "@id": "http://api.concursolutions.com/user/123456",
    "u:firstName": "Howard",
    "u:lastName": "Dierking"
  },
  "dateTime": "2099-11-05T15:05:00-0800",
  "total": "9.98",
  "currencyCode": "USD",
  "consume": {
  	"@type": "m:Operation",
  	"@id": "http://api.concursolutions.com/howardd/consumed/",
  	"m:method": "POST",
  	"m:expects": "http://schema.concursolutions.com/receipts#Receipt",
  	"m:expectsDocument": "http://http://api.concursolutions.com/receipt/schemas/r.schema.json"
  }
}
```

My thinking behind this approach is as follows:

* `m:method` - Specify relevant HTTP details so that a client can construct the core request.
* `m:expects` - Specify the object type via a dereferenceable link. This way, a client developer can discover more details about the semantics of the data being sent via HTTP messages
* `m:expectsDocument` - Specify the document schema via a dereferenceable link. This way, the client can discover the required syntax for constructing the HTTP message. Ideally, the resource for document schema would be something like JSON schema that is machine-readable and actionable. This would give the client greater assurance that their message would be successfully processed on the server so long as they could successfully validate it using the schema in test.

Again, this is all early thinking. One of the things I'm contemplating even with this design is whether HTTP details are even needed if the expected usage is that a client developer will still need to leverage documentation for the type and/or schema. Perhaps where I'm really headed towards is something more akin to the media-type approach, but with federated, linked data types rather than monolithic, RFC-styled media type specifications.

But these are just my  _thoughts_ - not my _figured out conclusions_. All input is welcomed :)
