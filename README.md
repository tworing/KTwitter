# jQuery KTwitter plugin

version 0.1 (2012-04-18)

Requires jQuery v1.2.6 or later

Rate Limited by the Twitter API: 150 requests per hour, measured against the public facing IP of the server or device making the request.

## Usage:

Step 1: Add jquery.js & jquery.ktwitter.js to your html file:

	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<script type="text/javascript" src="jquery.ktwitter.js"></script>

Step 2: Add a div element to your html file:

	<div id="myDiv"></div>

Step 3: Select the div element and call `KTwitter()` function. `KTwitter()` takes a single string argument - your screen name(Twitter ID), like this:

	$('#myDiv').KTwitter('libuchao');

Or takes a single Object argument(only the 'screenName' property is required, everything else is optional), like this:

	$('#myDiv').KTwitter({
		screenName      : 'libuchao',     // [string]  * Required, the screen name of the user.
		tweetCount      : 10              // [integer] Specifies the number of tweets to try and retrieve.
	});

The object named 'defaultSetting' below is the default setting of this plugin, and the comments are also there.

	// Default setting of this plugin.
	var defaultSetting = {
		screenName      : 'libuchao',     // [string]  * Required, the screen name of the user for whom to return results for. Helpful for disambiguating when a valid screen name is also a user ID.

		tweetCount      : 10,             // [integer] Specifies the number of tweets to try and retrieve, up to a maximum of 200. Include retweets in the count.
		showAvatar      : true,           // [boolean] Show user's profile image.
		showUserName    : true,           // [boolean] Show user's user name, for example "Barack Hussein Obama Jr."
		showScreenName  : true,           // [boolean] Show user's screen name, for example @Obama
		showTweetsTime  : true,           // [boolean] Show the time tweets are created
		showOriginalUrl : true,           // [boolean] Show original urls, not "t.co/xxxxxxx".
		includeRetweets : true,           // [boolean] When set to either true, the timeline will contain native retweets (if they exist) in addition to the standard stream of tweets.
		excludeReplies  : true,           // [boolean] Prevent replies from appearing in the returned timeline.
		openInNewWindow : true,           // [boolean] Open hyperlink in new window.
		animateDuration : 2000,           // [integer] The duration(milliseconds) of the animation.

		loadingText     : 'Loading...',   // [string]  The text will be displayed when the tweets is loading.
		widgetWidth     : '360px',        // [string]  The width of the widget.
		widgetMargin    : '0px',          // [string]  The margin of the widget.
		widgetPadding   : '0px',          // [string]  The padding of the widget.
		textColor       : '#000',         // [string]  This color will be applied to tweets text.
		screenNameColor : '#999999',      // [string]  The color of screen name.
		userNameColor   : '#3D7FFA',      // [string]  The color of user name.
		evenBgColor     : '#8ADEE2',      // [string]  This background color will be applied to tweets whose index number is a even number.
		oddBgColor      : '#91E5E7',      // [string]  This background color will be applied to tweets whose index number is a odd number.
		textSize        : '16px',         // [string]  Tweets's font size.
		textHeight      : '1.4',          // [string]  Line height, also accept value like '20px'.
		textFont        : 'Georgia',      // [string]  Font family.
		hyperlinkColor  : '#3D7FFA',      // [string]  The color of the hyperlink.
		tweetsTimeSize  : '14px',         // [string]  The font size of the time text.
		tweetsTimeColor : '#999999'       // [string]  The color of the time text.
	};

## Screenshot

![jQuery KTwitter plugin widget](https://github.com/libuchao/KTwitter/raw/master/screenshot.png)