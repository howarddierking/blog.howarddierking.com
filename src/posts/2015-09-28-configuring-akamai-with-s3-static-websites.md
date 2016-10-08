---
layout: post.html
title: Configuring Akamai with S3 Static Websites
---

For the next generation of the [Concur Developer Center](https://preview.developer.concur.com/index.html), we decided to break away from the standard enterprise, CMS-backed Web site and do what has become pretty common practice in the open source world for Web sites: we generated a completely static HTML Web site from [markdown](https://daringfireball.net/projects/markdown/) files using [Jekyll](https://jekyllrb.com/).

Even with a static Web site, we want to do as much as possible to reduce latency - especially for mobile devices and parts of the world that may not have tons of bandwith to spare (or just those that happen to be located far from Amazon's Oregon data center). The solution is also a pretty common one: serve the site through a content delivery network. For our CDN, we went with [Akamai](https://www.akamai.com/).

Now, the origin for the Web site is actually just a bucket in Amazon S3, so it's reasonable to question why we didn't go with AWS CloudFront. There are actually quite a few reasons we went with Akamai vs. CloudFront (like the fact that their edge network is _enormous_), though in truth, the biggest reason in our case is that Concur has had a lot of success with Akamai for many years and so it was a known quantity.

The next step, then, was to configure Akamai to properly front the S3 bucket containing the new Web site. This was my first time working through Akamai's Luna portal and I learned quite a few things about it as well as had a few surprise learnings about how S3's static Website hosting feature works. Here's a quick list of my lessons learned:

* It worked out better for us to manage cache settings through Akamai rather than to have Akamai follow the origin's HTTP cache policy headers. For one, I want to have different cache settings for different environments (preview and livesite) and I don't want to have to set those as a part of every site build. Secondly, setting cache policy headers for every item in my bucket seemed like a general [pain](http://www.laurencegellert.com/2012/07/how-to-set-the-expires-and-cache-control-headers-for-all-objects-in-an-aws-s3-bucket-with-a-php-script/).
* Don't use dots in the S3 bucket name if you're going to use SSL. Had I read [the documentation](http://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html) more carefully, I might have noticed this, but I learned the hard way when I started getting invalid certificate errors between Akamai and my AWS wildcard certificate (with CN *.s3-us-west-2.amazonaws.com). When you create a new bucket, S3 uses your bucket name as the left most segment of the hostname (which makes it easy to CNAME!). As an example, a new bucket `foo` will have the hostname `foo.s3-us-west-2.amazonaws.com`. This name also matches that wildcard  certificate that I listed above, which means that you can access your bucket via HTTPS. If, however, you create a bucket named `foo.bar`, you'll end up with a hostname of `foo.bar.s3-us-west-2.amazonaws.com`. This is fine from a simple DNS perspective, but if you try to access it over HTTPS - or pin the AWS certificate to your edge, as I needed to do - the CN of your certificate will not match your hostname. Hence, use dashes over dots.
* If you need to conduct any tests where you're mapping an alternate host name (via modifying `/etc/hosts`), make sure to set `Forward Host Header` to `Origin Hostname` in the Origin Server behavior. Otherwise, Akamai will happily forward along the requested host header to S3 and then S3 will fail to find the requested bucket. This is because of how those S3 hostnames are actually managed. Consider the following dig request:

```
dig foo.s3-us-west-2.amazonaws.com

; <<>> DiG 9.8.3-P1 <<>> foo.s3-us-west-2.amazonaws.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 36272
;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 4, ADDITIONAL: 2

;; QUESTION SECTION:
;foo.s3-us-west-2.amazonaws.com. IN A

;; ANSWER SECTION:
foo.s3-us-west-2.amazonaws.com. 60 IN   CNAME s3-us-west-2-r-w.amazonaws.com.
s3-us-west-2-r-w.amazonaws.com. 5 IN    A   54.231.176.32
``` 

As you can see, the friendly hostname that S3 provides when it creates the bucket is just a CNAME to the region-specific S3 hostname. I didn't dig deeper on this one, but it seems like a reasonable assumption that the bucket identifer is stripped off and then sent along as data which is then used to lookup the bucket in storage.

* If you choose to have Akamai register a new, managed edge certificate for you, make sure you give them (and your project) about a week of lead time.
* One of the things that was the biggest surprise for me was that if you use S3's static Web site hosting feature, you end up accessing it with a different hostname (s3-website-us-west-2.amazonaws.com). This would be great except for one little thing - no HTTPS support. Hence, when configuring your origin hostname in Akamai, use the standard bucket hostname (s3-us-west-2.amazonaws.com) instead.
* Not using S3's static Website feature means that you don't get its default page handling feature for free (e.g. `/ -> /index.html`). This isn't a huge deal - just make sure you add those rules in your Akamai configuration.
* One other word about S3's static Web hosting - Not referencing the s3-website URL doesn't mean that you get to not enable static Web site hosting on your bucket. I'm not 100% on this one, but it appears that enabling this feature is still necessary for getting the correct metadata on content - metadata such as the correct content type headers. If I'm mistaken about this, please just let me know in the comments.
* Since your edge certificate will match your custom domain name for its CN, you need to pin the AWS wildcard certificate in Akamai's Origin Server behavior. You can do this under the `Origin SSL Certificate Verification` section. Under `Trust`, select, `Specific Certificates (pinning)` as the option, and then simply enter the host name of your S3 bucket. Akamai's portal will then grab the public key of the certificate and pin it in your edge configuration.
* In our case, we have a few different environments for the site (e.g. testing, livesite, etc.). There's no need to create separate configurations in Akamai for these different environments. Instead, define the set of all possible hostnames in the hostname configuration section and then just create different rules with different hostname criteria.
* For the test hosts, I found that it was easier to just turn off caching on the edge altogether. Given that test hostnames are updated very frequently, it's not worth it to deal with cache invalidation issues. Additionally, if you're in a large organization, you may not actually have proper permissions to flush the cache for your site.
* Finally, testing on Akamai's network feels a little wonky, but it's manageable, and honestly, you get used to it pretty quickly. I don't want to repeat what others have already documented quite well, [so here's a great post on the process](http://my.globaldots.com/knowledgebase.php?action=displayarticle&id=25).

So there you have it. This captures my experience connecting Akamai's edge network so that it can serve content from a static Web site hosted in an AWS S3 bucket. Hope it helps if you're facing a similar challenge, and do let me know if I've gotten something wrong in my understanding.
