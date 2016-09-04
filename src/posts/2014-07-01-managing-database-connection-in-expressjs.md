---
layout: post.html
title: Managing a Database Connection in an ExpressJS Application
---

A Web API or Web application backed by a database of some sort is a pretty typical application architecture regardless of what language or platform we might be looking at. So you can imagine my surprise that I haven't really ever been able to find a satisfactory answer for how to best accomplish this kind of thing for an Express application that uses MongoDB. Maybe I either don't know how to search very well, or maybe I just don't really understand the answers that I'm finding, but the [typical kind of answer that I've come across](http://stackoverflow.com/questions/18044113/connection-to-mongodb-native-driver-in-express-js) in the past reads something like this:

"You can isolate the connection inside of a module, add it to the module's exports, and then just import the module in other modules that need database services" 

The implication is that it's super-simple (and if it really is this simple, then I clearly cannot Node as well as I thought I could). The problem is that [good] NodeJS database drivers are async. So the call is never as simple as:

```
exports.db = new Connection();
```

The connection, rather, is returned asynchronously via a callback. So the question is where and when then should the connection be opened? 

Even if you encapsulate opening the connection asynchronously inside of a module, you would still have to worry about the timing of when database accessing functions on that module were called by other code (e.g. the module exports can return before the connection has actually been created). On looking at the code in the referenced stack overflow question, I started second-guessing myself, wondering whether I could have assigned database functions to my exports from within the connect callback function, but [the API documentation](http://nodejs.org/api/modules.html#modules_module_exports) confirmed that my having not taken that approach was based on sound judgment at one time or another.

In my case, I'm using the [official MongoDB driver](http://docs.mongodb.org/ecosystem/drivers/node-js/), and in that driver, the connection actually represents a pool, so (as I discovered the hard way) you'll end up exhausting resources if you try and create a lot of new connections (as in, per request) since it will end up creating a bunch of connection pools. The right solution is to open the connection once and hold it for the lifetime of the application. 

Again, the challenges for me were 2-fold:

* The best way to initialize the connection asynchronously but in a way that was deterministic with respect to time (e.g. how to not introduce a race condition)
* How to flow the connection (or database module) through my request handlers

I had originally tried (thought I was being clever) to encapsulate the connection lifetime within my module by initializing it lazily in the first access and then holding it in a module level variable - something like this:

```
var dbClient;
var ensureDbClient = function(callback){
    if(dbClient) return callback(null, dbClient);
    MongoClient.connect(mongoConnectionString, mongoConnectionOptions, function(err, db){
        if(err) return callback(err, null);

        dbClient = db;
        callback(null, dbClient);
    });
};
```

If you've spent much time with NodeJS (or any asynchronous environment for that matter) you can probably spot the problem pretty quickly. However, I didn't recognize it until my system was under load. When requests are coming in at a high enough frequency, this code will end up exhausting resources pretty quickly because the code path that returns the module-level variable dbClient will never actually be followed. Put another way, before the code has a chance to actually set dbClient equal to the new connection value, many more requests would have arrived and followed the same path to create a new connection [pool], thereby exhausting system resources.

Cleverness Fail.

One solution option that seemed more promising was to create the connection during the application startup and save it as a global variable. The part about creating the connection during startup made sense. In fact, creating the connection prior to starting the application [still] seems to me like the only way that you can ensure that only one instance of the connection will exist for all requests to the application. However, the global variable part wasn't ideal because I don't like the impact this has on testability.

I ended up with a hybrid approach where I create the connection just prior to starting up the server. However, instead of adding it to the global scope I pass it in as context to create a middleware function which then injects the context into all of my handlers. This gives me the same effect as having it as a global variable, but it makes testing pretty straightforward since I'm just hanging it off of a regular function parameter.

Here's my app.js code.

```
// middleware factory
var requestContextInjector = function(context){
    return function(req, res, next){
        _.keys(context).forEach(function(key){
            console.info('Adding request context key [' + key + ']');
            assert(!req[key], 'Conflict adding request context for key: ' + key);
            req[key] = context[key];
        });

        next();
    };
};

// initialize the database and start the server
bugsdata.init(function(err, data){
    app.use(contentExtensions);
    app.use(express.bodyParser());
    app.use(requestContextInjector({ bugsdata: data }));
    app.use(app.router);

    // routes 
    app.get('/bugs', routes.index);
    // ....other routes here....

    http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'));
    });
});
```

So what are your thoughts here? How do you typically manage your connections? Is there some generally accepted pattern that I just haven't found yet?