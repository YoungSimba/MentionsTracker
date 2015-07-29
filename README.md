MentionsTracker will automatically monitor your Twitter account for mentions.   When it finds those mentions, it will process them, store them, show them in the UI, expose them via an API endpoint and RSS feed, send an email digest, and share weekly stats with integrated social networks.

In order to test this, you will need to head to Twitter and register an application. You can do that here: https://apps.twitter.com/. Once you have an application, update the consumer key and secret inside secrets.js.

You can now test things out by making a request to http://localhost:3000/auth/twitter 

You should be able to click Login with Twitter, get redirected to Twitter, authorize access to your Twitter account, and have a User created or get logged in as an existing user.
