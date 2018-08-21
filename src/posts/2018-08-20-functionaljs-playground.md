---
title: Functional Javascript Playground
layout: post.html
summary: "I'm a big believer that the functional programming approach may be the only way to write Javascript code and stay sane. To continue building up my own skill as well as share some of those opportunities with you, I've created a repository to show and get feedback on examples."
headerImage: /images/functional-js.png
---

I'm a big believer that functional programming may be the only way to write reliable Javascript code and stay sane. However, I also want to acknowledge the reality that functional programming in general can be intimidating to developers who are relatively new to it (and/or who may have nightmares of lisp programming from a survey of languages course at university); and it can be hard to do well in a language like Javascript, since the language supports first class functional constructs along with ... well ... pretty much every other language construct ever conceived. 

Therefore, in the spirit of continuous learning for both you and me, I've created a [new GitHub repository](https://github.com/howarddierking/functionaljs) where I'm learning and practicing functional Javascript design by taking existing, imperative code and implementing it in a functional design using the [Ramda](https://ramdajs.com/) library. Over time, my hope is that this will turn into a nice reference for design and/or refactoring.

Here's what I would love your help with.

1. Take a look at the current code samples and let me know where you see opportunities to simplify or design seams that I missed. This effort is as much about me learning/improving my functional chops as it is sharing what I've discovered with you.
1. Using GitHub issues, please share with me your favorite [shareable - no employer stuff] imperative Javascript code; you know, that code that's always given you an icky feeling, but that you've never quite known what to do with.

Now, while I have no idea where this all may go in the end, allow me to share with you one thing that I've learned from working through the currently posted scenarios. It can be difficult to write functional equivalents to smaller blocks of imperative code because reasoning in functional programming terms seems more natural at a higher level of abstraction than imperative code. Much of the imperative logic that I looked at dealt with checking for null values on individual variables, or branching statements, or loops, and so on.  Reasoning about this kind of code can be done in functional terms, but I believe the more valuable application would be to apply a functional design at a larger scope, and thereby eliminate the need for much of those lower level statements in the first place. Put another way, I find functional design to be an effective tool for expressing code's intent.
