---
title: My Workflow
layout: post.html
summary: "Like many of you, I've tried (and abandoned) many different systems and tools over the years to support an effective and sustainable personal workflow. After using the same system for a few months now, I think I may have found something that works for me."
headerImage: /images/checklist.jpg
---

I initially became interested in personal workflow methods and tools when I started at Microsoft in 2006. Microsoft differed from my previous roles in that projects generally required coordination across multiple teams - meaning that there were lots of tasks to manage. Additionally, the corporate culture made heavy use of emails and meetings - meaning that tasks could originate from a variety of sources at almost any time. Without some kind of structure, working at Microsoft could very easily become purely reactionary. And as you may have experienced in your own work, reactionary work may keep you busy, but it doesn't make you very effective. Most importantly, this kind of work doesn't feel very satisfying.

So as the barrage of information threatened to overload me, my skip-level manager at the time suggested I read "[Take Back Your Life!](https://www.amazon.com/Take-Back-Your-Life-Microsoft-ebook/dp/B00JDMPP38/ref=sr_1_1)" by Sally McGhee. The book provided a process and strategy for using Outlook to manage a personal workflow. This worked especially well for me because at the time, the bulk of my tasks originated from something that came in through Outlook. Over the years that followed, this book along with ["Getting Things Done"](http://gettingthingsdone.com/) and ["Getting Results the Agile Way"](https://www.amazon.com/dp/B005X0MFD2/ref=dp-kindle-redirect) influenced the bulk of the method and mindset I used to try and keep up with my life - even as it was becoming more and more complex and fast moving. I've tried implementing these methodologies using a variety of different tools.

* Outlook
* OneNote
* Excel (because really, what _can't_ be done in Excel?)
* Evernote
* Paper sticky notes
* GitHub issues
* Trello

I won't say that I've found "the one" in this post, because I have been and will continue to be hacking away and finding new ways to improve my own productivity. However, I'm feeling pretty good about the current approach and tool set that I'm using. So I'll quickly share that here with you.

## Principles

If there's an overarching theme to all of this, it is *be intentional with everything you do*. Unsurprisingly, different things work better or worse for different people, because we're all ... you know ... different. Some of what I'm going to write about here may work well for you - some won't. If you're curious about a technique or tool described here, try it out - but don't feel like you need to stick with something that isn't really working for you just because it may be working for me _at this point in time_.

When getting into the details of a specific process or tool, here are a few additional principles that I have found useful.

* Single task list - In the past, I have tried to keep separate task lists for work projects, family activities and tasks, freelancing projects, etc. It has never gone well for me and I have almost always ended up spending an unnecessary amount of time switching between lists and mentally trying to hold relative priorities in my head when figuring out what to do next. Unsurprisingly, something eventually falls through the cracks.
* The process comes before the tools - There are *tons* of really fancy workflow tools with lots of features and integrations to other tools - so much so that they can give you the impression that if you just use the tool, your life will practically manage itself. The problem is that super-slick tools can cause you to unintentionally let the tool define your workflow. This can be subtle (as I've seen with some workflows based around Evernote) or obvious (as is the case with many Outlook-based workflows). Either way, the best case is that you end up boxed into a workflow that no longer feels natural because of tooling. The worst case is that your tool-based workflow never feels natural (because it isn't) and you eventually abandon it altogether. Instead, figure out the workflow that you want, then find the tool (or tools) that naturally support it.
* Minimal interaction with tools - One of the nasty side-effects of the tools driving the process is that you can end up spending an unproductive amount of time "feeding the machine" of whatever tool(s) are driving your workflow. Again, Outlook is probably the most obvious offender to most people. As such, I try to hold to a principle of minimal interaction when evaluating tools. Interestingly, I've found that the more features a tool tends to have, the more likely it expects a higher amount of interaction.

## Methodology and Tools

So, with the high level stuff out of the way, here's how I'm managing my workflow at the moment and into the foreseeable future.

### Single Kanban Board with Trello

I have found that a [Kanban](https://en.wikipedia.org/wiki/Kanban)-style workflow works best for me over a more structured framework like [Scrum](https://www.scrum.org/resources/what-is-scrum). I think the biggest reason for this is that for a personal workflow, I don't find task level estimation to be helpful for planning and I therefore find them to be a source of unnecessary obsessing ("is this item 2, 3, or 5 story points?!?!"). I also find some of the resultant artifacts like burndown charts to be a distraction. Now, before you think I'm unfairly bashing Scrum, I think Scrum can work great in team environments - I just find it a bit over the top for my personal workflow. If it helps you, go for it! At any rate, I use a Kanban flow using Trello as my digital board. Because I use the same board for every aspect of my life, I use Trello's labels for categories such as "work projects", "personal", "family", etc. I do this because I have found it helpful to be able to see at a glance if task-level priorities actually line up with my higher level life priorities. Put another way, if I look at my backlog or weekly lists and see that they are completely dominated by work tasks, I need to step back and re-evaluate.

![My Trello Board](/images/my-workflow-trello.png)

Trello is one of those tools that is so flexible, it can be anything you want it to be. This quality can also make it completely unusable if you don't have a strategy for structuring it in a way that is suitable for the workflow you're trying to achieve. In fact, I had tried using Trello in the past, and abandoned it when my task lists grew past a certain size. The friction I experienced in this case had less to do with something inherently wrong with Trello and more to do with the fact that I was using the standard "todo", "doing", "done" board structure. Therefore, as I've built up my current board around how I like to work, I've found the following pipelines helpful.

* Research - I keep a separate pipeline for books I want to read, courses I want to take, etc. The reason for the separate list is that I tend to complete these on a much different (e.g. slower) schedule than I do tasks in my backlog. I have a lot of research interests and didn't want to end up polluting my more tactical pipelines with them.
* New - Once your backlog gets over a certain size, it is a royal pain to add a card to the bottom of the list and then move it up and down to prioritize it within that same gigantic list. Having a separate list for new items makes the backlog grooming process easier. It also keeps things clear throughout the week what are the priorities based on the last grooming exercise compared to inbound items.
* Backlog - This one is pretty much what it sounds like - the prioritized list of tasks. To add one point of clarification for my workflow, it represents the prioritized list of tasks that are not scheduled for the current week.
* This Week - This pipeline represents the tasks that are "scheduled" for the current week, as determined during my weekly retrospective/planning ceremony (more on that one later).
* Active - What I'm working on at the moment. I allow for more than one item in this pipeline at a time because even though research items have their own backlog, active research items live together with short-lived tasks in this pipeline.
* Waiting - Tasks that are blocked waiting on someone else.
* Done - My favorite pipeline of all.

Additionally, you may notice from the picture the colored background for some of the pipelines. Because I want to enforce some self-discipline with my Kanban workflow, I use a [WIP limit plugin for Trello](https://chrome.google.com/webstore/detail/kanban-wip-for-trello/oekefjibcnongmmmmkdiofgeppfkmdii?hl=en-US). At the moment, I'm only setting limits on my active pipeline (4) and my weekly pipeline (15). As in the case of any agile process, these limits are based on observations about my typical velocity.

### Time Tracking

I avoided time tracking for a long time as I didn't really see the necessity. However, as my role changed and I had to deal with more and more interruptions, managing time quickly became one of the most important skills that I needed to develop. I started tracking my time using [Toggl](https://toggl.com/) a couple of years ago, but I didn't really stick with it. However, last year I heard about this simple time management technique called the [Pomodoro Technique](https://cirillocompany.de/pages/pomodoro-technique) where you basically slice your time into 25 minute, focused blocks with fixed breaks in between. When I noticed that Toggl had built-in support as a pomodoro timer, I decided to give it another shot and I've been happy with it.

![My Toggl Dashboard](/images/toggl-dashboard.png)

As you can see, Toggl also provides some handy dashboards so that (assuming you use it consistently) you can see how you're allocating your time over a given period. I'm not particularly obsessive about this aspect, but it can be useful to see whether how I actually spend my time matches up to how I _say_ I want to spend my time. It also has a nice little iPhone application so that I can track my time without being tethered to my computer. _If any Toggl folks are reading this, I would love to see an iPad equivalent, as that's what I use for most of my technical reading._

### Weekly Retrospective and Planning
I have only one "ceremony" in this workflow and that is a weekly retrospective and planning. Rather than describe it in prose, I'll just show you the Trello card that I duplicate during every retrospective session.

![Weekly Retrospective Card](/images/weekly-retrospective.png)

I'll quickly point out a small handful of things that you may or may not see right away.

* The checklist includes a mix of personal and work-related tasks
* "Weekly Estimation" is code for "Adjust weekly WIP limits if you have good reason. Otherwise, fill up the weekly pipeline until you hit the WIP limit."
* To archive cards in the done list, I use the "archive all the cards in this list" feature of Trello. I found this easier than archiving and recreating the entire list.

### Handling Meetings, Email, Slack
Unless you have the luxury of being independently wealthy and working on projects that only you will ever see or care about, you probably have to interact with others as a part of your work. Our professional and personal lives are environments of constant interruption and I believe that our ability to tune out the noise and create the time to focus - to think - is the most important discipline that determines whether we end up being busy or being effective. I'm still struggling to find the right balance myself in this arena, but here are some techniques that I'm currently using.

* Meetings - I attend most meetings with my iPad and a [Moleskine](http://www.moleskine.com/) notebook. I use OneNote on the iPad to pull up specific agenda items that I'm bringing into the meeting. I then close the iPad and take all notes by hand in the notebook. I have a few resaons for this low-fi approach - one of them being that physically writing something down reinforces my natural learning style. Most importantly, though, I want to convey to the others in the meeting that I am _present_ - and having my attention directed at a screen is the fastest way to undermine that message.
* Email, Slack, etc. - I would like to tell you that I check email in the morning, at lunch, and in the evening - and that I keep Outlook closed for all the time in between. However, the fact is that I'm not there yet. One technique that I'm planning to start doing this week is keeping messaging clients closed during my pomodoros and then checking during my breaks for any emergencies. Depending on the importance of what's happening, I can either close the messaging client(s) again, or schedule a new pomodoro to focus on resolving whatever's happening. Again, not sure yet how this will work - but will have a better idea in a week.

I hope that some elements of my workflow prove useful to you. At the very least, perhaps this post will have you think through your own workflow with a bit more intentionality. Either way, thanks for reading and if there are specific techniques or tools that work for you, let me know so that I can see how they might fit into my workflow!
