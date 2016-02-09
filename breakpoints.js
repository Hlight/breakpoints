/*
	Breakpoints.js
	version 1.0.1
	Fork src: https://github.com/Hlight/breakpoints.git

	Creates handy events for your responsive design breakpoints

	Copyright 2011 XOXCO, Inc
	http://xoxco.com/

	Documentation for this plugin lives here:
	http://xoxco.com/projects/code/breakpoints

	Licensed under the MIT license:
	http://www.opensource.org/licenses/mit-license.php

	Change log:
	1.0.1 - Added default enter/exit event fired on every break - Hlight

*/
(function($) {

	var lastSize = 0;
	var interval = null;

	$.fn.resetBreakpoints = function() {
		$(window).unbind('resize');
		if (interval) {
			clearInterval(interval);
		}
		lastSize = 0;
	};

	$.fn.setBreakpoints = function(settings) {
		function _trigger(type, breakpoint) {
			// console.log(handle, breakpoint, type);
			var win = $(window);
				win.trigger(type+'Breakpoint' + breakpoint);
				win.trigger('breakpoint',[breakpoint,type]);
		}
		var options = jQuery.extend({
							distinct: true,
							breakpoints: new Array(320,480,768,1024)
				    	},settings);


		interval = setInterval(function() {

			var w = $(window).width();
			var done = false;

			for (var bp in options.breakpoints.sort(function(a,b) { return (b-a) })) {

				// fire onEnter when a browser expands into a new breakpoint
				// if in distinct mode, remove all other breakpoints first.
				if (!done && w >= options.breakpoints[bp] && lastSize < options.breakpoints[bp]) {
					if (options.distinct) {
						for (var x in options.breakpoints.sort(function(a,b) { return (b-a) })) {
							if ($('body').hasClass('breakpoint-' + options.breakpoints[x])) {
								$('body').removeClass('breakpoint-' + options.breakpoints[x]);
								_trigger('exit', options.breakpoints[x]);
							}
						}
						done = true;
					}
					$('body').addClass('breakpoint-' + options.breakpoints[bp]);
					_trigger('enter', options.breakpoints[bp]);

				}

				// fire onExit when browser contracts out of a larger breakpoint
				if (w < options.breakpoints[bp] && lastSize >= options.breakpoints[bp]) {
					$('body').removeClass('breakpoint-' + options.breakpoints[bp]);
					_trigger('exit', options.breakpoints[bp]);
				}

				// if in distinct mode, fire onEnter when browser contracts into a smaller breakpoint
				if (
					options.distinct && // only one breakpoint at a time
					w >= options.breakpoints[bp] && // and we are in this one
					w < options.breakpoints[bp-1] && // and smaller than the bigger one
					lastSize > w && // and we contracted
					lastSize >0 &&  // and this is not the first time
					!$('body').hasClass('breakpoint-' + options.breakpoints[bp]) // and we aren't already in this breakpoint
					) {
					$('body').addClass('breakpoint-' + options.breakpoints[bp]);
					_trigger('enter', options.breakpoints[bp]);
				}
			}

			// set up for next call
			if (lastSize != w) {
				lastSize = w;
			}
		},250);
	};

})(jQuery);
