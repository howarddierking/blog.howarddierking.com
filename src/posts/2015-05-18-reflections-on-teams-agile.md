---
layout: post.html
title: 9 Months In - Reflections on Teams and Agile
---

I've been a dev manager now for about 9 months and I have to say that I'm really enjoying this role. It's not a job without frustrations, and I haven't escaped the all of the frustrations that I had as a PM - particularly that of trying to balance writing code with "other duties as assigned." However, when it's all summed, I think that I'm a much better fit for operating on the engineering side of the house than I am at the business side.

Which brings me to something that's been on my mind for a little while: process; and more specifically, agile.

In a [relatively recent talk](https://vimeo.com/110554082), Erik Meijer [in]famously said, “Agile is a cancer that we have to eliminate from the industry." And while I don't agree with every detailed point in the talk, I think that Meijer gets it right in saying that we spend too much time talking about writing code and not enough time writing code.

As a data point, the week before I started, the entire engineering org spent 3 days - *3 ENTIRE DAYS* in an agile training course. Let me underscore that one more time: there were 3 days where no actual engineering work was getting done because the engineers were learning - not how to do engineering better - but how to talk about the engineering work that they weren't doing. All of the usual topics were covered: Scrum, planning poker, etc. And perhaps unsurprisingly, the larger body of folks came out of that training with just as much disagreement (or more?) as they came into it with. In fact to this day, there is still not consensus as to what a story point means.

Now, all that said, I realize that the above may have been a bit overly dramatic, but can we agree that it's a hard sell to brand anything requiring 3 days of training as "agile"? Even the [creators](http://pragdave.me/blog/2014/03/04/time-to-kill-agile/) of the [agile](http://blog.toolshed.com/2015/05/the-failure-of-agile.html) manifesto are coming out saying that we've taken a good thing and made it into something horribly unrecognizable. I'm going out on a limb here, but I would guess that such a thing was the result of the usual 2 suspects:

* Individual developers looking for the quick fix, cookie-cutter solution to avoid having to reason about each new project as if it was, you know, unique
* Tool vendors and consultants who were more than happy to sell (at a high premium) the appearance of that silver bullet solution

So enough of the negative. I'm happy to say that while my team doesn't have a constant velocity (because, you know, sometimes we slow down to learn new stuff), we tend to move pretty quick. So here's how we do it -

We don't do "Agile".

We do "agile".

By that, I mean to say that we have a small set of principles that we go by, and then we leave it up to the team to figure out what tactics, ceremonies, etc. it wants to put in place. We are accountable to a business organization, so we do have some constraints that we need to operate within, but it's up to the team (which includes our PMs) to determine the best way to meet those constraints.

So first, the principles:

* communicate
* the team is accountable for the work
* communicate
* the individual is accountable to the team
* communicate

That's it. From there, different strategies and tactics can fall out and change over time. In fact, as people come and go in the teams, I expect that each unique group will interpret the principles in ways that work best for them. For now, here are some of the things that the teams are doing.

* Single-threaded execution - I'll break from Erik's view and say that planning poker can actually be a nice stress relief from a planning session (and as I mentioned, the business has given us the constraint that we need to be able to estimate our work). However, when planning poker hurts people is when the team estimates and the individual is accountable. This is just wrong. As a result, our teams estimate together and execute together - there are no assignments. This is not unlike many of the agile methods out there, but that's not really the point. The point, rather, is that the team isn't following some kind of methodology - it's optimizing around the adapting the prinpciples to the people on the team.
* Execution over theory - This one seems like it should just be obvious, but I can't tell you how many *long* architecture sessions I've sat through where very smart (and very expensive) folks sat around debating the theoretical pros and cons of boil-the-ocean architectural decisions. Conversely, we always try to start small, bake measurement in on the front end, and move fast. Maybe you can't build an operating system that way, but it works pretty well for a business application.
* We sit together - helps eliminate *lots* of meetings. Oh, and we use [Slack](https://slack.com) over email whenever possible.
* 360 Performance reviews - it would undermine the principle of the individual being accountable to the team if that individual's performance was measured primarily by the manager. So we don't do that. Reviews are based on peer evaluation, are conducted roughly 5 times per year so that there's time for any needed coaching/course correction, and are based on everyone evaluating everyone else along a set of dimensions:
  * _Teamwork/Helpfulness_ - how does the individual support his teammates when they run into challenges? Does this individual proactively jump in and help to unblock issues or does he retreat into a task. Does he proactively pick up tasks from the task board or does he wait to have work assigned?
  * _Technical Acumen_ - how well does this individual know the technology that the team is using? How effectively does he learn and assimilate new information? Does the individual raise the bar of excellence for the team regarding development practices?
  * _Leadership_ - is this individual the "go to" person for the project or a specific technology area? Does the individual lead by example, not ever coming across as being "above" a given task? Does he help others in the team to better understand new technologies and concepts? Does he communicate with clarity?
  * _Effectiveness_ - is this individual someone who is execution-oriented? Does he live out the principle that "shipping software wins over ideas"? And does he do this in a manner that keeps the quality bar high?
  * _Problem Solving_ - how does this individual deal with ambiguity? Can he break large problems into smaller, more solvable bits? Does he unblock roadblocks effectively? Does he dig deep to identify the root causes of a problem and go after those causes rather than the symptoms?
  * _Next Steps_ - What are some things that you/the team can do to help this individual continue to develop? What are some things that the management team can do?

A couple other observations as I reflect on my time thus far and the team that we've put together:

* We want full stack engineers - one thing that we all feel pretty strongly about is that a service team should have end-to-end accountability from the design to the operations. As such, team members know more than just how to write code. They know how to carve out subnets, know how to setup failover, how DNS works and how to best utilize an edge network. They also have a list about a mile long of stuff they know that they don't know. Which leads me to..
* Continuous learning - One of the things that we do each Friday is block off the afternoon where the team can spend researching. We find that this is never enough time - and that's a good thing. A couple of the topics of great interest at the moment are all things containers, CoreOS, and global deployment automation.
* Nerf weaponry - obvious, but essential nonetheless

So where does this approach start getting challenging? Glad you asked, because that's where I find myself at the moment. A lot of our initial success was, IMO, the result of the fact that we started out as a small team. And as is often the case, the reward for success is that the team and the engineering challenges get bigger. And ironically, those 2 have a multiplier effect towards the overall challenge. So while I wanted to share in this post some of the things that have worked for us, I also don't want to be disingenuous (like all those "Agile" consultants) and give you the impression that we've found the formula for repeated success. In fact, if you've got some tips on what worked for you, I would love to hear them.

However, with a handful of good principles (which I think we have) and a continued focus on hiring great people, I'm confident that we'll sort it out.

By the way, we're hiring :)

