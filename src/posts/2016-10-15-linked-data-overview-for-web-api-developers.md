---
layout: post.html
title: A Linked Data Overview for Web API Developers
---

For a while now, I’ve held the belief that the biggest reason people get the whole “REST" thing wrong is because they are looking at Roy Fielding’s doctoral dissertation – the paper that coins the term “REST” - as a prescription for how to design APIs.

There are 2 things wrong here that I think explain the current state of the API world when it comes to REST. First, is the idea that the terms and descriptions in the paper can be exclusively applied to the server. Reading [Fielding's dissertation](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm) (and if you read it, I would encourage you to read the entire paper, not just chapter 5), it’s pretty clear that he wasn't looking at the world so narrowly, but rather was describing the entire system – the interactions between all of the components in a network-oriented architecture. Of possible greater importance, though, was that Fielding wasn’t trying to create something novel with REST – in fact, his goal was to describe an existing system and identify those characteristics made it unique among other architectural styles of the time. That existing system was the world-wide web – a project that Fielding was working on at the time along with the WWW’s creator, Tim Berners-Lee.

So the big idea with REST is that it is a _description_ of how the Web works.

To then get a better idea of what a RESTful system should look like for data (as opposed to the documents of the traditional Web), we can’t stop with Fielding – we have to keep going to see what Tim Berners-Lee thought. And it turns out, he thought about this quite a bit – still does, in fact. The bulk of the discussion that follows exists out there on the Web in one of two general camps: Linked Data and Semantic Web. I tend to identify more with the first camp is that latter tends to be a little far on the pedagogical end of the spectrum. However, there’s good stuff to learn from both groups.

So what’s it all about? Put simply, the idea is to enable data on the Web to be consumed and produced as if it were a single massive database – much like the Web for documents is treated like a single massive encyclopedia (among other things). This is accomplished by what Tim Berners-Lee described as the [“5 stars” of linked, open data](http://www.w3.org/DesignIssues/LinkedData.html).

| Open Data Level | Description |
| --- | --- |
| ★ | Available on the web (whatever format) but with an open licence, to be Open Data |
| ★★ | Available as machine-readable structured data (e.g. excel instead of image scan of a table) |
| ★★★ | as (2) plus non-proprietary format (e.g. CSV instead of excel) |
| ★★★★ | All the above plus, Use open standards from W3C (RDF and SPARQL) to identify things, so that people can point | at your stuff |
| ★★★★★ | All the above, plus: Link your data to other people’s data to provide context |

Now, that may still sound a little grandiose for what most API developers do, so let's get a little more tactical regarding the “rules” of linked data.
1. Use URIs as names for things
1. Use HTTP URIs so that people can look up those names.
1. When someone looks up a URI, provide useful information, using the standards (RDF*, SPARQL)
1. Include links to other URIs. so that they can discover more things.

Now, on the surface, this doesn’t sound all that different from what we hear about with REST, right? I mean, we use http URIs for identifying resources, and we even link resources together – what’s missing? Well, there are quite a few things at the implementation level that make how we tend to build services different from a linked data mindset. But at the core, the biggest challenge we face today (though most folks haven’t yet recognized it) that linked data addresses is this: in our current approach to designing and building APIs, our data has only local scope. So consider the following example.

```
GET http://api.concursolutions.com/receipts/12345

HTTP/1.1 200 OK
Content-Type: application/json

{
  “amount”: 123
}
```

In this very simple example, the receipt http://api.concursolutions.com/receipts/12345 has global scope, because it has a fully qualified URL for its identity. However, everything inside the document returned has zero meaning outside of that document. This causes technical challenges (e.g. I say “amount” and you say “total”) and missed opportunities (e.g. creating correlations with third party data) because it means the data for this receipt cannot be effectively mashed up with data from other services (including our own) without trying to enforce some kind of draconian data management policy. And even such a policy would work only for our own services – try driving such a policy across a partner! It also means that clients of this service must be tightly coupled, not to the semantics of the data, but rather to the structure of the document. Creating and validating with a technology like JSON Schema is in part an acknowledgement of this coupling.

So how is linked data different? The abstract data model behind linked data is called [RDF (resource description framework)](https://www.w3.org/RDF/). It is an abstract data model in the sense that it’s not tied to a specific serialization (which is a really good thing as I’ll discuss shortly) and it describes the entire universe of data as triples of subject – predicate – object. So in the example above, we would have 1 triple that looks like:

`http://api.concursolutions.com/receipts/12345  |  amount  |  123`

To then elevate “amount” to have global scope (meaning that it can avoid name collisions and thereby be reliably mashed up with data from other data sources), we need to name it using a fully qualified URL. We can do this is a couple ways. One of them is to mint a new URL describing the term “amount” using a custom vocabulary. However, one of the most powerful things about the linked data universe is that instead of always minting our own terms, we can leverage existing vocabularies – doing this enables our receipts to more easily interoperate across a variety of different systems.

`http://api.concursolutions.com/receipts/12345  |  https://schema.org/price  |  123`

Now, you may be thinking that while neat, changing the predicate from amount to a URL means that our JSON documents will look super-ugly. And this is why RDF is amazing. Because it’s an abstract data model, it can have many different serializations. Some of them include [RDFa](https://rdfa.info/), [Turtle](https://www.w3.org/TR/turtle/), [RDF-XML](https://www.w3.org/TR/rdf-syntax-grammar/), and most recently, [JSON-LD](http://json-ld.org/). The amazing thing about JSON-LD is that it’s fully compatible as RDF and as plain old JSON. This means that the flow can look exactly the same as it did before for clients that don’t speak linked data. However, for those that do, there’s some bonus.

```
GET http://api.concursolutions.com/receipts/12345

HTTP/1.1 200 OK
Content-Type: application/json
Link: <http://schema.concursolutions.com/contexts/receipts.jsonld>; rel="describedby"; type="application/ld+json"

{
  “amount”: 123
}
```

That context, then maps our vanilla JSON to fully qualified linked data, meaning that linked data aware clients can then do amazing, amazing things.

```
"@context": {
  "amount": "https://schema.org/price"
}
```

You can even see alternate representations to show that it’s valid RDF if you look at it in the [JSON-LD playground](http://json-ld.org/playground/).

```
_:b0 <https://schema.org/price> "123"^^<http://www.w3.org/2001/XMLSchema#integer> .
```

So what does all this mean again? A couple of takeaways at present.

1. We should be thinking of our systems as data-oriented rather than service-oriented (services are simply a way to produce and consume data)
1. We should be thinking about our data as a single graph of linked data
1. We should be thinking of how we can connect our graph to known vocabularies so that we, our customers, and our partners can use it in unforeseen ways to mine more value from it.
1. We should be thinking of what a linked data client looks like. From what I’ve seen, I believe that [Facebook’s GraphQL](http://graphql.org/) has many of the properties of a linked data client – and I’m looking forward to learning more about it and seeing if it plays out.

So as I'm sure you can tell, this is just the tip of the iceberg and it's where I've been spending a lot of my focus over the last year (and plan to continue in the foreseeable future). I'll be writing quite a bit more about this topic going forward and would love to hear from you if you've done much work in the space. Also, if you want to get your hands dirty with some of the referenced ideas and technologies, we're hiring :)
