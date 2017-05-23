# TwitterStory - Twitter Toplinks App (developed for YourStory)

1. The app should let the user login with Twitter. (https://dev.twitter.com/docs/auth/oauth/faq)

2. Once authenticated, the app pulls just the tweet's that contain URLs from a users stream (friends + users post) for the past 7 days

3. Persist the tweets in the database

4. Once stored, the application should then compute and display

	a. Actual Tweets containing links

	b. Which user has shared the most links

	c. List of Top Domains that have been shared so far

---

### Getting Started
* Install MongoDB, Node.js on your system.
* Clone the repo git clone https://github.com/utsavbhagat172/twitterstory.git
* Install the packages npm install
* Get keys(consumerkey, accesskey) and token from [twitter](https://apps.twitter.com/) for your application.
* If developing locally, 'http://localhost:8080' is not recognized as a valid URL for twitter developer apps, use 'http://127.0.0.1:8080'
* Create a file in config directory (auth.js) to store the keys obtained from twitter:
```javascript
// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

'twitterAuth' : {
'consumerKey' 			: 'YourConsumerKey',
'consumerSecret' 		: 'YourConsumerSecret',
'accessToken'        	: 'YourAccessToken',
'accessTokenSecret'  	: 'YourAccessTokenSecret',
'callbackURL' 			: 'YourCallbackURL'
}
};
```
* Start the server `nodemon server.js`
* Go to URL:  'http://127.0.0.1:8080'

