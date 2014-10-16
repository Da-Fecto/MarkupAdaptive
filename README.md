MarkupAdaptive
==============

This module aims to be a helper for developing an adaptive site. MarkupAdaptive is a module that injects classnames representing 'media queries'. Fire events after the browser is resized and fires an event when a media query is changed. Optionally it can write a cookie with the ‘media query’ classname of the current viewport size. The main purpose of this module is all about syncing media queries with javascript. 

Say you want to have a slider on the iPad but don't want that slider on the phone you now can destroy the slider exactly on the right time. 

The module script works with injected media queries and a HTML element tested against those. This javascript process starts real early in the load process and is extremely fast. It starts even before the body tag is parsed. In Explorer 7 and 8 clientWidth is used to pinpoint the “classname of the viewport size”.

### How to use

1. Install the module
2. Optionaly set your prefered settings in the module configuration.
3. Call the script like this: 
    - <script><?php echo $modules->get('MarkupAdaptive'); ?></script>
4. You're ready to go

A working example is hosted on [lightning.pw](http://nobelium-knh.lightningpw.com/), don't forget to view the site with devtools to see the additional info that's available for you.
