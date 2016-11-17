---
layout: post.html
title: Some Functional Javascript Goodness
summary: "The best code is the code that you don't have to write. Functional techniques can help write less - and therefore more reliable - code. Even in Javascript."
---

One of my pet projects is an [international postal address formatter](https://github.com/howarddierking/international-address) library. I built this for one of my teams as they have this as a requirement and there was nothing already on NPM - so [now there is](https://www.npmjs.com/package/international-postal-address). In the process, I got to stretch myself in my functional programming skills using [Ramda](http://ramdajs.com/), and I wanted to show you a [I think] cool example.

```
'use strict';

let cf = require('./countryFormatters');
let locales = require('./locales');
let R = require('Ramda');

let caseInsensitiveComparer = R.curry(function(x, y){
  return x.toUpperCase() === y.toUpperCase();
});

// (k -> Boolean) -> {k: v} -> v | undefined
let propBy = function(pred, object){
  let w = R.wrap(pred, (fn, val, key) => pred(key));
  let t = R.pickBy(w, object);
  return R.nth(0, R.values(t));
};

exports.formatter = function(defaultFormatter, locale){
  if(arguments.length === 1){
    locale = defaultFormatter;
    defaultFormatter = cf.formatters.unitedStates;
  }

  let v = propBy(caseInsensitiveComparer(locale), locales.formatters);
  return R.defaultTo(defaultFormatter, v);
};

```

This module takes a locale code (e.g. 'en-us') and selects a formatter - a function - from a JavaScript object. Here's a sample of that object.

```
exports.formatters = {
  "bg-BG": cf.formatters.bulgaria,
  "zh-CN": cf.formatters.china,
  "hr-HR": cf.formatters.fmrYugoslavia,
  "cs-CZ": cf.formatters.czech,

  ...
}
```

It would have been super-easy if I could have just use Ramda's [`propOr`](http://ramdajs.com/0.21.0/docs/#propOr) function. Unfortunately, that function does an exact string comparison, and to make the API easier to use, I wanted to do this comparison in a case-insensitive way, and therefore want to be able to pass in my own predicate function to use in the comparison. Ramda [does have a function](http://ramdajs.com/0.21.0/docs/#pickBy) that allows for this, but it requires a function signature that is biased towards objects. Put another way, using it directly would cause the case insensitive comparison function to leak details about what it is being applied to. That's when I discovered Ramda's [`wrap`](http://ramdajs.com/0.21.0/docs/#wrap) function. This function is super-cool in that allows you to specify a function that you want to wrap, then specify the wrapper function, including whatever signature you need.

Using these Ramda function, I was able to create the `propBy` function that wraps the generic `caseInsensitiveComparer` function in a way that will make Ramda's `pickBy` function happy, then get the result (which is either an object with 1 key-value pair or undefined) and return the first value. Using Ramda's [`nth`](http://ramdajs.com/0.21.0/docs/#nth) function is also really nice because if you pass a falsey value to it, it will simply return `undefined` as the result rather than blowing up.

This is a super, hugely awesome thing about functional programming in general. The functional programming mindset treats everything as a set - even if that means a set of cardinality 1 or 0 - which eliminates entire classes of errors from programs (e.g. null/undefined, array index out of bounds, etc.)

The result of `propBy` (remember, it's either a value or undefined) then gets passed to Ramda's [`defaultTo`](http://ramdajs.com/0.21.0/docs/#defaultTo) function, which returns either the value (if it exists) or a specified value if it is undefined.

In short, applying functional thinking to this problems take what could otherwise by a bunch of value checking and branching logic and reduces it to a small amount of code.
