/*
 *  jQuery KTwitter plugin: display your tweets.
 *  version 0.1 (2012-04-18)
 *  Requires jQuery v1.2.6 or later
 *  Rate Limited by the Twitter API: 150 requests per hour, measured against the public facing IP of the server or device making the request.
 *  Author: lichao2012@gmail.com
 *
 *  Usage:
 *  KTwitter() takes a single string argument - your screen name(Twitter ID), like this: 
 *		$('#myDiv').KTwitter('libuchao');
 *
 *  Or takes a single Object argument(only the 'screenName' property is required, everything else is optional), like this:
 *		$('#myDiv').KTwitter({
 *			screenName      : 'libuchao',     // [string]  * Required, the screen name of the user for whom to return results for. Helpful for disambiguating when a valid screen name is also a user ID.
 *			tweetCount      : 10              // [integer] Specifies the number of tweets to try and retrieve, up to a maximum of 200. Include retweets in the count.
 *		});
 *
 *  The object named 'defaultSetting' below is the default setting of this plugin, and the comments are also there.
 */
 
(function( $ ) {

	$.fn.KTwitter = function ( options ) {

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

		// opts is the final setting of this plugin
		var opts;

		// If the argument is a string
		if (typeof options === 'string') {
			opts = $.extend(defaultSetting, {
				screenName : options
			});
		} else {
			opts = $.extend(defaultSetting, options);
		}

		return this.each(function() {
			
			var $this = $(this);
			
			$this.css({
				'margin'     : opts.widgetMargin,
				'padding'    : opts.widgetPadding,
				'width'      : opts.widgetWidth,
				'color'      : opts.textColor,
				'font-size'  : opts.textSize,
				'line-height': opts.textHeight,
				'font-family': opts.textFont
			});

			// Show the loading text when the tweets is loading...
			$this.html('<p style="margin:0;padding:15px;text-align:center;font-weight:bold;border-radius:10px;'
				+ 'background-color:'
				+ opts.evenBgColor 
				+ '">'
				+ opts.loadingText
				+ '</p>'
			);
			
			$.ajax({
				url: 'https://api.twitter.com/1/statuses/user_timeline.json?include_entities=1' 
					+ '&include_rts=' + ( opts.includeRetweets === true ? '1' : '0' )
					+ '&exclude_replies=' + ( opts.excludeReplies === true ? '1' : '0' )
					+ '&screen_name=' + opts.screenName
					+ '&count=' + opts.tweetCount,
				//url: 'http://127.0.0.1/ktwitter/test.json.php?callback=?',
				dataType: 'jsonp',

				success: function (data) {
					// All tweets will wrap in this $ul emelent
					var $ul = $('<ul style="margin:0;padding:0;list-style-type:none;text-align:left;"></ul>');
					// Process all tweets you loaded.
					for(var i = 0, dataLength = data.length; i < dataLength; i++) {
						var tweetsText = '';
						var tweetsHead = '';

						// Tweet or retweet
						var tweet = data[i].retweeted_status ? data[i].retweeted_status : data[i];

						tweetsText += tweet.text;

						if (opts.showAvatar === true) {
							tweetsHead += '<img style="float:left;padding:0;margin-top:4px;margin-right:3px;border-radius:5px 5px 5px 5px;" src="';
							tweetsHead += tweet.user.profile_image_url + '"/>';
						}

						if(opts.showUserName === true) {
							tweetsHead += '<a class="KTwitterUserName" href="https://twitter.com/#!/';
							tweetsHead += tweet.user.screen_name +  '">';
							tweetsHead += tweet.user.name + '</a>';
						}

						if(opts.showScreenName === true) {
							tweetsHead += '<span style="margin-left:3px;color:' + opts.screenNameColor + '">';
							tweetsHead += '@' + tweet.user.screen_name + '</span>';
						}

						if(opts.showUserName === true || opts.showScreenName === true) {
							tweetsHead += '<br />';
						}

						// Add hyperlink to user id you mentioned.
						if(data[i].entities.user_mentions.length > 0) {
							for(j = 0; j < data[i].entities.user_mentions.length; j++) {
								tweetsText = tweetsText.replace(new RegExp('@' + data[i].entities.user_mentions[j].screen_name, 'g'),
									'<a href="https://twitter.com/#!/'
									+ data[i].entities.user_mentions[j].screen_name
									+ '">'
									+ '@' + data[i].entities.user_mentions[j].screen_name
									+ '</a>'
								);	
							}
						}
						
						// Add hyperlink to url text.
						if(data[i].entities.urls.length > 0) {
							for(j = 0; j < data[i].entities.urls.length; j++) {
								// Revert to original urls if you don't want to use the "t.co" short urls.
								if(opts.showOriginalUrl === true) {
									tweetsText = tweetsText.replace(new RegExp(data[i].entities.urls[j].url, 'g'),
										'<a href="' + data[i].entities.urls[j].expanded_url + '">'
										+ data[i].entities.urls[j].display_url
										+ '</a>'
									);
								} else {
									tweetsText = tweetsText.replace(new RegExp(data[i].entities.urls[j].url, 'g'),
										'<a href="' + data[i].entities.urls[j].url + '">'
										+ data[i].entities.urls[j].url
										+ '</a>'
									);
								}
							}
						}
						
						var tweetBody = '';
						tweetBody += '<p style="margin:0;padding:0;">';
						tweetBody += tweetsHead + tweetsText ;
						tweetBody += '</p>';

						// Process the tweets's time.
						if( opts.showTweetsTime === true ) {
							var tweetsTime = new Date(tweet.created_at);

							var lgetTimezoneOffset = new Date().getTimezoneOffset() * 60000
							var timeSub = parseInt((new Date().getTime() - (tweetsTime).getTime()  ) / 1000);;

							if(timeSub < 60) {
								tweetsTime = timeSub
									+ (timeSub == 1 ? ' second' : ' seconds') + ' ago';
							} else if(timeSub < 60 * 60) {
								tweetsTime = parseInt(timeSub / 60)
									+ (parseInt(timeSub / 60) == 1 ? ' minute' : ' minutes') + ' ago';
							} else if(timeSub < 60 * 60 * 24) {
								tweetsTime = parseInt((timeSub / 60) / 60)
									+ (parseInt((timeSub / 60) / 60) == 1 ? ' hour' : ' hours')  + ' ago';
							} else {
								tweetsTime = parseInt(((timeSub / 60) / 60) / 24)
									+ (parseInt(((timeSub / 60) / 60) / 24) == 1 ? ' day' : ' days') + ' ago';
							}

							tweetBody += '<p style="padding:0;margin:1px 3px 2px 0;text-align:right;'
								+ 'font-size:' + opts.tweetsTimeSize + ';'
								+ 'color:'+ opts.tweetsTimeColor + '">';
							tweetBody += tweetsTime;
							tweetBody += '</p>';
						}
						
						$('<li style="margin:0;padding:8px 5px 5px 8px;min-height:58px;word-wrap:break-word;"></li>')
							.html(tweetBody)
							.appendTo($ul);
					}
					
					// Set color to hyperlink emelents
					$ul.children().children('p')
									.children('a').not('.KTwitterUserName')
										.css('color', opts.hyperlinkColor);

					// Set color to user name
					$ul.children().children('p')
									.children('a.KTwitterUserName')
										.css('color', opts.userNameColor);

					// Set background color to list elements
					$ul.children('li:even').css('background-color', opts.evenBgColor);
					$ul.children('li:odd').css('background-color', opts.oddBgColor);

					// Set a radius corner to the first list element
					$ul.children('li:first-child')
						.css({
							'border-top-left-radius'     : '10px',
							'border-top-right-radius'    : '10px'
						});

					// Set a radius corner to the last list element
					$ul.children('li:last-child')
						.css({
							'border-bottom-left-radius'  : '10px',
							'border-bottom-right-radius' : '10px',
							'padding-bottom'             : '8px'
						});
					if(opts.openInNewWindow === true) {
						$ul.children().children('p').children('a').click(function(e) {
							e.preventDefault();
							window.open(this.href);
						});
					}
					
					$this.html('').hide();

					$ul.appendTo($this);

					// Show tweets with animation
					$this.slideDown(opts.animateDuration);
				}
			});
		});
	};
})( jQuery );