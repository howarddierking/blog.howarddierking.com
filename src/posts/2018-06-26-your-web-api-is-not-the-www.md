---
title: Your Web API is Not the WWW
layout: post.html
summary: "One of the most common techniques used by the REST faithful to shut down any questioning of the faith is to appeal to the WWW. This post attempts to establish the fallacy of such an appeal."
headerImage: /images/dogma-jesus.jpg
---

One of the most commonly-implored techniques that I've heard by the REST faithful to shut down any questioning of the faith is what I'll call an "appeal to the WWW". There are variations, but they all tend to sound something like the following (I've added the snarky rhetorical phrasing because that's what all variations sound like in my head):

> If only there was some super-successful reference implementation of REST that we could just follow...

To be honest, I thought we passed all of the hyperbole and team-choosing a few years ago, but the recent rise of [GraphQL](https://graphql.org) and the [associated tide of backlash posts](https://www.google.com/search?q=graphql+vs+rest) clearly proved me wrong. And look, I get it. If we were to go back in time just a few years, you would find me preaching the good news of HATEOAS and feeling perpetually frustrated at my perception of people just not 'getting it'. And I continue to believe that a solid understanding of REST is an invaluable tool in reasoning about alternate design choices in distributed systems. I simply no longer believe that it is "the way" to design a Web API.

To clarify, I don't believe that REST is incorrect, but that the REST constraints are insufficient for designing an API or service that is useful for much of anything. And this ties back to what this post is about - the "appeal to the WWW". Because the reason for REST's insufficiency is found in the fact that it is a _description_ of the WWW architecture, not a _prescription_ for recreating it. The WWW is a system that can be described by the constraints of REST. In fact, REST was written in order to do just that. 

Similarly, while you _could_ design an application that is suitably described by REST, doing so requires many additional design decisions that are beyond the scope of REST and are arguably far more important. Unfortunately, by conflating REST and the WWW, many of the REST faithful have deprioritized all of those design choices in favor of the general architectural constraints and insodoing put it in a place for the more cynical among us to reject it outright.

To have a more reasonable conversation about REST - and how REST relates to technologies like GraphQL, we must first start by acknowledging that REST is not the WWW - and neither is your Web API.

The reasons why tend to all revolve around the same issue - *the content type*.

Contrary to popular belief, the WWW does not rest (see what I did there?) on HTTP alone. In his book "Weaving the Web", Sir Tim Berners-Lee defines the WWW in terms of 3 inventions:

* HTTP
* URL
* HTML

As a RESTful API designer, it's not difficult to get behind HTTP and URL since these map most clearly to chapter 5 in Fielding's dissertation. HTML tends to be more problematic, however, because while [researchers like Jon Moore have proven some interesting uses of HTML](https://www.infoq.com/presentations/web-api-html) as a content type for APIs, it is generally thought to be overly burdensome for API implementations. However, the universal support of HTML in all Web browsers is one of the biggest reasons for the WWW's relative stability in spite of explosive growth, so it cannot be explained away as "just a content type" in the course of designing an API strategy seeking to achieve similar properties. When HTML is taken out of the equation and replaced with the more general REST constraint of "self-describing messages" - which is another way of saying, "use whatever you want as long as you provide the associated metadata" - the requirements of REST are met, but the system could be completely unusable. Each server operator is free to support whatever content type she wishes, and many of these content types define little more than serialization instructions (e.g. JSON). Dealing with the actual content becomes the wild west.

So then why not just standardize Web API clients and servers on HTML (or some other generic content type)? Because Web APIs have a different client and communicate different content than the WWW.

Firstly, the WWW was originally conceived of as a means for enabling researchers at different institutions to share their publications with one another using the Internet. As such, much of HTML's design concerns rendering content to a screen for consumption by a human. Conversely, Web APIs are consumed by a variety of different client types for a wide variety of purposes. Even in the case where Web API content is consumed for the purpose of rendering a user interface, the variety of user interface types has grown to a point that it cannot be adequately described by a single markup language.

Secondly, HTML defines the structure and semantics for rendering a single page. The domain is page rendering - the semantics of the data being rendered are left to the human consumer. Again, this is fitting with the WWW's vision, but it is opposite the needs of most Web APIs where the domain is tied to the data itself.

As a super-simple example, consider the following HTML form.

```html
<form action="something">
  <div>
    <label for="firstName">First Name</label>
    <input type="text" id="firstName">
  </div>

  </div>
    <label for="lastName">Last Name</label>
    <input type="text" id="lastName">
  </div>
</form>
```

What happens if I were to change the surrounding HTML document structure to the following?

```html
<form action="something">
  <fieldset>
    <legend>Person</legend>
    <div>
      <label for="firstName">First Name</label>
      <input type="text" id="firstName">
    </div>

    </div>
      <label for="lastName">Last Name</label>
      <input type="text" id="lastName">
    </div>  
  </fieldset>
</form>
```

On the WWW, this kind of change has minimal impact for 2 previously-stated reasons:

* The client is a Web browser whose domain is rendering UI markup as codified in HTML
* The user is a human who is capable of reasoning about the data 

Now, what if I have the same scenario with a Web API using `application/json`? A sample response may look something like this.

```javascript
{
  "firstName": "Howard",
  "lastName": "Dierking"
}
```

To implement a grouping in JSON similar to the HTML fieldset, I would introduce a containing object resembling the following:

```javascript
{
  "Person": {
    "firstName": "Howard",
    "lastName": "Dierking"  
  }
}
```

However, if you've ever written a Web API client, you can immediately see some problems. Unlike the HTML example, the domain of this content is not rendering, but rather business data (people in this case). However, the data is bound by its representation - its document and format - such that a client must reason about it through the lens of the document structure rather than the data itself. Implementing the grouping change would necessarily require a version change to the Web API in order to avoid breaking clients. Whether that version change is done via the resource identifier (URL) or representation metadata (content type) is a red herring in this case because the end result is the same: the client must be updated in order to avoid breaking. Additionally, the data contained in the response document has local scope, meaning that a client has no obvious way to determine whether the same content provided by two different APIs means the same thing. In the case of the WWW, these types of issues are less critical because again, the ultimate consumer of HTML is a human, who is capable of reasoning about the data "out-of-band". In the case of the Web API, however, the consumer is likely a program rather than a person, making the requirements for binding to and comprehending data fundamentally different than those of the WWW.

To pull the discussion back to my original assertion: 

* REST _describes_ the _architectural_ characteristics of the WWW
* The WWW's success is just as much a function of a standard content type - HTML - along with a small number of interpreters for that type (Web browsers) and ultimately, a human consumer of the content
* Focusing solely on the architectural characteristics and downplaying or dismissing the problem of content/data yields systems that are at best of limited use.

> Hence, your Web API is not the WWW

What then are some approaches for creating data-oriented APIs which are usable by non-human consumers. At present, I'm interested in two high-level approaches.

1. The non-REST approach (aka the GraphQL approach)
2. Linked data

GraphQL burst onto the scene relatively recently as a result of Facebook developers' need to solve these described problems of data resiliency for their own platform ([similar initiatives were also developed by companies like Netflix](https://github.com/Netflix/falcor)). At it's core, GraphQL is not REST, though it does adhere to several of REST's constraints. Its primary path of divergence is related to REST's uniform interface constraint, where GraphQL substitutes REST's constraint (consisting of resources, representations, messages, and hypermedia) with its own, more restrictive protocol. As such, GraphQL has types rather than resources, has JSON rather than an expansive set of representation serializations, and has queries and mutations rather than hypermedia-driven state transitions. By constraining REST's more flexible uniform interface constraint, GraphQL (and similar approaches) trade-off dynamism and flexibility for usability by generic clients.

On the other end of the spectrum is [linked data](http://linkeddata.org/). As I've [previously discussed on this blog](https://www.howarddierking.com/2016/10/15/a-linked-data-overview-for-web-api-developers/), linked data was created by Sir Tim Berners-Lee - also the creator of the WWW - as the WWW for data. As such, it directly addresses the data-related limitations of the WWW described above (as well as solves some other interesting problems) by creating a globally-scoped, content type-neutral data model ([RDF](https://www.w3.org/RDF/)) along with multiple serializations of that model. As you might expect, because linked data follows on the work of the WWW, a linked data system naturally meets the same architectural constraints described by REST. Client requirements are still more extensive than in the case of GraphQL, since types in a linked data system can be more dynamic than in a statically-typed system, but with that dynamism comes a great deal of power. In my estimation, linked data is the only style of Web API that is both RESTful and useful. 

So which direction is right for you? Obviously, it depends on your needs. I suspect that the majority of applications would benefit from the generic client support and static types of GraphQL without needing the dynamism of a linked data API. However, there's nothing stopping you from having both. In fact, the way that I've been building systems for a while now is to use GraphQL externally and RDF internally for communication between services. When I have a need to expose a more dynamic API surface externally, I can then simply expose my linked data graph without having to change any other part of the system. GraphQL clients, of course, continue functioning without any knowledge of the underlying data model.

Whether you need a static type system like GraphQL or a dynamic, logical data model API like linked data, one key holds true: Your Web API's currency is data. The WWW is about documents. 

Your Web API is not the WWW.
