---
title: Enterprise Software Must Die
layout: post.html
---

Yup. All of it.

(Warning: this is a bit of a rant, so thoughts are based more in anecdote than data)

I understand that there was a point in time where building software that was capable of supporting large companies used to be an incredibly difficult task. At some levels, it still presents challenges. However, in the world of multi-tenant, mobile-driven, Internet-facing consumer applications, this characteristic of scale is no longer what is associated with the term "enterprise software".

Instead, when one hears the term, they tend to think more of these characteristics:

* Expensive
* Long implementation cycles
* Ultra-configurable
* Costs a lot of money
* Requires an additional company (typically a "Systems Integrator") to help get it setup and configured
* OMG my eyes are bleeding from the cost

At this point in time, I'm coming to the view that with one caveat (that one is that a system should support federated identity) that even the largest of enterprises should not select "enterprise software" and should actively start looking at rolling off of current investments in favor of solutions that have characteristics more like consumer software.

Why? A few reasons.

* Enterprise software is generally built to scale to large companies, but in a relatively controlled environments. Consumer SaaS software must be built to scale to the "in the wild" levels of the Internet.
* Enterprise software optimizes around supporting a near unbounded set of "configuration" and custom "implementations". What this translates to in practice is that the product can be morphed into something that so vaguely resembles its original state that you are effectively guaranteed to be locked into the version you originally purchased for all time.
* Nearly every decision point with enterprise software is based on negotiation rather than a simple value judgment. Oh, and that negotiation probably happens way over your pay grade. Hit a critical bug? Find the contact point in your company, have them connect to their customer representative, and they'll work out a solution that probably ends up solving a different problem than the one you found. In the meantime, you'll have found a work-around, whether that's bastardizing a field to hold another field's data or adding a new customization (which feeds back into the 2nd problem).
* The result of all these - plus the cost to implement - is that enterprise software typically has between a 5-10 year off ramp. Enterprise software vendors know this, and the result is that they aren't forced to optimize around delivering value and obsessing on quality. Instead, they can negotiate in such a way that the customer desires are always just one patch away (many times for an additional fee).

Consumer software, on the other hand, tends to have a near immediate off-ramp. Don't like the experience? Find a critical bug that the vendor doesn't seem interested in fixing? Don't stress about finding a work around - just find a product that works better for you! On first inspection, this may seem like the wild west of constantly having to switch between SaaS providers. However, the great effect here is not the expectation that you will be constantly switching products, but rather that it forces all product vendors to focus on customer satisfaction and quality of service. 

Put another way, at the end of the day, consumer software is about retaining customers via carrots whereas enterprise software retains customers with sticks (also known as lawyers).

So in sum, even when building software targeted at big companies, build the software as if you were building it for consumers. If you need a new capability for your enterprise, look past the big "enterprise software" vendors and find a consumer solution that also works for companies. Also, once you've got your license. Beware of deep customizations. If that's what you need, go back and revisit your requirements to determine whether your selected product is still a good fit for your business. If you do need to customize, prefer public-facing APIs over intra-product hooks.

If we can shift our mindsets in this way, then hopefully - given enough time - today's "enterprise software" can fade away into a distant memory.
