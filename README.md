MarkupAdaptive
==============

This module aims to be a helper for developing an adaptive site. MarkupAdaptive is a module that injects classnames representing 'media queries'. Fire events after the browser is resized and fires an event when a media query is changed. Optionally it can write a cookie with the ‘media query’ classname of the current viewport size. The main purpose of this module is all about syncing media queries with javascript. 

Say you want to have a slider on the iPad but don't want that slider on the phone you now can destroy the slider exactly on the right time. 

The module script works with injected media queries and a HTML element tested against those. This javascript process starts real early in the load process and is extremely fast. It starts even before the body tag is parsed. In Explorer 7 and 8 clientWidth is used to pinpoint the “classname of the viewport size”.

### How to use

1. Install the module.
2. Optionally set your preferred settings in the module configuration.
3. Insert the script like this.
    - `<script><?php echo $modules->get('MarkupAdaptive'); ?></script>`
    - This script should run **before document ready** so it should be in the HEAD.
4. You're ready to go.

```javascript

/**
 * Getting information with Javascript.
 *
 */

// How to catch the end of a resize (with jQuery)
$('html').on('resized', function(e) {
    console.log('Browser window is resized');
});

// Respond on a media query change
$('html').on('mediaquerychange', function(e) {
	// Get the old class name before the “mediaquery” change has occurred
	var oldClass = MarkupAdaptive.getOldClass();
	// Get the new class belonging to the current “mediaquery”
	var newClass = MarkupAdaptive.getClass();
	console.log('mediaquerychange, from: “' + oldClass + '” to: “' + newClass + '”');
});

// Get the current class
var current = MarkupAdaptive.getClass()

// Get the old class, the class before the current
var old_class = MarkupAdaptive.getOldClass()

// Mediaquery JSON object which originates from your Modules config
var sizes_object = MarkupAdaptive.getJson()

// Mediaquery JSON object which originates from your Modules config'
var array_with_classnames =MarkupAdaptive.getArray();

// Is the current browser IE8 (returns true/false)
MarkupAdaptive.isIE() // (bool)

// Is the current browser IE8
MarkupAdaptive.isIE(8) // (bool)

// Is the current browser less then or equal to IE9 (lt, lte, gt, gte)
MarkupAdaptive.isIE(9, 'lte') // (bool)

// get the cookie, when checked in the module configuration
function getCookie(name) {
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
    return match ? match[1] : null;
}

console.log('Classname cookie value: ' + getCookie('MarkupAdaptive'));

```

A working example is hosted on [lightning.pw](http://nobelium-knh.lightningpw.com/). This page doesn't use any media queries in the stylesheet just to show that it is possible. It is not recommended however. Don't forget to open devtools to see the javascript events in action.

Big thanks to [conclurer](https://www.conclurer.com/)! This instant ProcessWire hosting is awesome.
