---
layout: post.html
title: 'Surprise! JavaScript Guard Clauses'
---

I spent more time then I had planned this weekend debugging an issue in some code I wrote, and at the end of it all, discovered a JavaScript language feature that I had read about a while ago but never used (intentionally, that is). To explain, consider the following predicate function definition (and yes, I know that [Underscore](http://underscorejs.org) has this function - my specific case would have brought in some additional concepts, so I'm simplfying here).

```
var hasProperty = function(obj, key){
    return obj && obj[key];
};
```

What would you expect to happen here? If you're like I was, you would have expected this statement to be evaluated as "if both obj and obj.key exist return true, otherwise false". After all, isn't this truthy evalutation one of the things that makes JavaScript fantasti-magical?? 

So, back to the question, what would you expect to happen with the above code? 

If you were like me, you would have been wrong.

Turns out that using the logical 'and' operator like this is known as a guard clause and actually evaluates as "if the first value is truthy, then return the second value, otherwise return the first value".

You can see this played out in some really simple examples (using Node.js' REPL environment).

```
> var obj1 = {foo:'bar'};
undefined
> obj2 = {bar:'baz'};
undefined
> hasProperty(obj1, 'foo');
'bar'
> hasProperty(obj2, 'foo');
undefined
> hasProperty(null, 'baz');
null
> hasProperty(false, 'baz');
false
```

So having nailed down the issue, the question remains of how to still take advantage of truthy evaluation while ensuring that my function operates like a predicate. The answer is to perform a double negation on the result of the logical operation. The first negation coerces the value to a boolean (when not truthy enough, add more truthy!!) - the second negation gets you back to the originally desired boolean value. This changes the original function definition to the following.

```
var hasProperty = function(obj, key){
    return !!(obj && obj[key]);
};
```

And this produces the expected results.

```
> hasProperty(obj1, 'foo');
true
> hasProperty(obj2, 'foo');
false
> hasProperty(null, 'baz');
false
> hasProperty(false, 'baz');
false
```

A more complete explanation which also covers the inverse of the guard clause (known as the default clause) is described [here by Sean McArthur](http://seanmonstar.com/post/707078771/guard-and-default-operators).