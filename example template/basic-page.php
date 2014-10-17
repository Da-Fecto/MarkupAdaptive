<!DOCTYPE html>
<html lang="en" class='original classes should stay here'>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <!--
        On modern devices (read no IE8 and lower) a proper meta viewport
        tag has to be set. The script works with injected mediaqueries
        and those rely on a proper meta vieport tag.

        For IE7 & IE8 innerWindow document.documentElement.clientWidth
        is taken. This size is tested against the 'Base classnames (media
        queries)' Module config settings.
        -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title><?php echo $page->title; ?></title>
        <style>

            html, body {
                margin: 0;
                padding: 0;
                font-size: 100%;
                vertical-align: baseline;
                }

            body {
                font-family: sans-serif;
                min-height: 100%;
                font-size: 1em;
                line-height: 1.75em;
                }

            body:before,
            body:after {
                content: '';
                color: #000;
                font-size: 30em;
                display: inline-block;
                position: fixed;
                opacity: .25;
                bottom: .25em;
                left: -0.1em;
                z-index: -2;
                }

            body:after {
                color: #FFF;
                left: -0.15em;
                opacity: 1;
                z-index: -1;
                }

            h1 {
                font-size: 6em;
                line-height: 1em;
                display: inline;
                margin: 0;
                padding: 0;
                color: #fff;
                }

            h2 {
                font-size: 1.5em;
                line-height: 1em;
                margin: 0 0 1em 0;
                }

            p {
                margin-top: 0;
                margin-bottom: 24px;
                }

            span { font-size: .2em; }

            #top {
                text-align: center;
                margin-bottom: 5%;
                }

            .lead .gutter { background: #FFF; }
            .lead .gutter { background: #FFF; }
            .lead p { margin: 0 }
            .lead .col-60 p { font-size: 1.1em; }
            .col-40 .gutter {
                background: #000;
                color: #FFF;
                }

            .column {
                display: inline-block;
                position: relative;
                vertical-align: top;
                }

            .gutter {
                margin: 5px;
                padding: 10px;
                overflow: hidden;
                position: relative;
                background: rgba(255,255,255, .5);
                }

            .max-width {
                max-width: 1440px;
                position: relative;
                padding: 0 5px;
                margin: 0 auto;
                }

            /**
             * Using the classes direct
             *
             */

            .column a.button {
                padding: 0 10px;
                line-height: 32px;
                display: inline-block;
                float: right;
                background: #000;
                color: #FFF;
                border: 1px solid #000;
                margin-left: 10px;
                margin-top: 10px;
                }

            .column a.button:hover {
                background: #FFF;
                color: #000;
                }

            .xsmall body { background: #225B66 }
            .xsmall body:before { content: '.xsmall' }
            .xsmall body:after { content: '.xsmall' }
            .small body { background: #19A5A5 }
            .small body:before { content: '.small' }
            .small body:after { content: '.small' }
            .medium body { background: #65BF6E }
            .medium body:before { content: '.medium' }
            .medium body:after { content: '.medium' }
            .large body { background: #ECCE4F }
            .large body:before { content: '.large' }
            .large body:after { content: '.large' }
            .xlarge body { background: #FC6E59 }
            .xlarge body:before { content: '.xlarge' }
            .xlarge body:after { content: '.xlarge' }
            /* pseudeo elements are not supported by IE7 */

            .xsmall h1 {
                font-size: 2em;
                background: #225B66
                }

            .small h1 {
                font-size: 3.5em;
                background: #19A5A5
                }

            .medium h1 {
                font-size: 4.5em;
                background: #65BF6E
                }

            .large h1 {
                font-size: 5em;
                background: #ECCE4F
                }

            .xlarge h1 {
                font-size: 6em;
                background: #FC6E59
                }

            /**
             * Classes reached upto and including
             *
             */

            .xsmall .column { width: 100%; }
            .small .column { width: 50%; }
            .medium .column { width: 33.33333%; }
            .large .column { width: 25%; }
            .xlarge .column { width: 20%; }

            .row .col-40 { width: 40%; vertical-align: bottom}
            .row .col-60 { width: 60%; }
            .upto-medium .row .col-40 { width: 100%; }
            .upto-medium .row .col-60 { width: 100%; }

            a { text-decoration: none; }
            .xsmall a { color: #225B66; }
            .small a { color: #19A5A5; }
            .medium a { color: #65BF6E; }
            .large a { color: #ECCE4F; }
            .xlarge a { color: #FC6E59; }

            /* from large and higher */
            .from-large #top {
                background: #000;
                color: #fff;
                }

            /* from large and higher */
            .upto-medium #top {
               background: #FFF;
               color: #000;
                }

            /**
             * Make adjustments for IE7 or IE8 only
             *
             */

            /* IE7 & IE8 */
            .oldie .column { margin-bottom: 5px; }

            .ie7 .column,
            .ie7 .fullwidth {
                display: inline;
                zoom: 1;
                }

            .ie7.xsmall .column { width: 100%; }
            .ie7.small .column { width: 49.95%; }
            .ie7.medium .column { width: 33.25%; }
            .ie7.large .column { width: 24.95%; }
            .ie7.xlarge .column { width: 19.95%; }

            .ie7 .column.col-60 { width: 59.85%; }
            .ie7 .column.col-40 { width: 39.85%; }

            .ie7 .bgcolor,
            .ie8 .bgcolor {
                background: #FFF;
                position: absolute;
                bottom: 0;
                right: 5px;
                left: 5px;
                top: 0;
                -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
                filter: alpha(opacity=50);
                }

        </style>
        <script><?php echo $modules->get('MarkupAdaptive'); ?></script>

    </head>
<body>

    <div id='top'>
        <p>hosted on <a href='lightning.pw/'>lightning.pw</a> Instant ProcessWire Hosting from <a href='https://www.conclurer.com/'>conclurer.com</a></p>
    </div>

    <!-- comments are used to remove white-space -->

    <div class='max-width lead'>
        <h1>MarkupAdaptive<span>.module</span></h1>
        <div class='row'><!--
        --><div class='col-60 column'>
                <div class='gutter'>
                    <h2>What is MarkupAdaptive?</h2>
                    <p>This module aims to be a helper for developing an adaptive site. MarkupAdaptive is a module that injects classnames representing 'media queries'. Fire events after the browser is resized and fires an event when a media query is changed. Optionally it can write a cookie with the ‘media query’ classname of the current viewport size. The main purpose of this module is all about syncing media queries with javascript. Say I want to have a slider on the iPad but don't want that slider on the phone I could now destroy the slider exactly on the right time.</p>
                    <p>
                        <a href='https://github.com/Da-Fecto/MarkupAdaptive/' class='button'>view on GitHub</a>
                        <a href='https://github.com/Da-Fecto/MarkupAdaptive/archive/master.zip' class='button'>Download</a>
                    </p>
                </div>
            </div><!--
         --><div class='col-40 column'>
                <div class='gutter'>
                    <h2>How it works?</h2>
                    <p>The module script works with injected media queries and a HTML element tested against those. This javascript process starts real early in the load process and is extremely fast. It starts even before the body tag is parsed. In Explorer 7 and 8 clientWidth is used to pinpoint the “classname of the viewport size”.</p>
                </div>
            </div><!--
     --></div>
    </div>

    <div class='max-width'>
        <div class='row'><!--
        --><div class='column'>
                <div class='bgcolor'></div>
                <div class='gutter'>
                    <h2>Inject Classnames</h2>
                    <p>MarkupAdaptive is a markup generation module that injects class names in the class attribute of the HTML element. These classnames correspond with the size settings in the module configuration.</p>
                    <p>You'll get upto- from- and the size name classes. Then there's the class “modern” for mediaquery supported browsers and for IE7 & IE8 it'll tel you “oldie” next to ie7 or ie8 corresponding to the vesion.</p>
                </div>
            </div><!--
         --><div class='column'>
                <div class='bgcolor'></div>
                <div class='gutter'>
                    <h2>Fires Events</h2>
                    <p>After a viewport resize the event with the name “resized” is fired. When the mediaquery classname has changed the event “mediaquerychange” is fired. The “mediaquerychange” will always fire before the resized event.</p>
                    <p>See the script tag under the one that loads jQuery for more information.</p>
                    <p>Internet Explorer 7 & 8 don't support custom Events. More information is provided in the document ready function of this page.</p>

                </div>
            </div><!--
         --><div class='column'>
                <div class='bgcolor'></div>
                <div class='gutter'>
                    <h2>Classname Cookie</h2>
                    <p>Optionally you can choose if the script should write a cookie with the current size classname.</p>
                    <p>Using cookie data and respond to it in PHP has it's drawbacks. The cookie is always one step to late & responding with different markup can have some caching issues.</p>
                    <p>Good luck!</p>
                </div>
            </div><!--
         --><div class='column'>
                <div class='bgcolor'></div>
                <div class='gutter'>
                    <h2>IE7 & 8 Compatible</h2>
                    <p>The customer insists making the site adaptive on old Explorers, we've got you covered.</p>
                    <p>All markupAdaptive functions work in Explorer 7 and 8. (IE6 and below is untested)</p>
                    <p>Open the dev tools for this page and you'll see more information in the document ready function of this page.</p>

                </div>
            </div><!--
         --><div class='column'>
                <div class='bgcolor'></div>
                <div class='gutter'>
                    <h2>Get Information</h2>
                    <p>Get information from the javascript MarkupAdaptive function. Type MarkupAdaptive. followed by the function name.<p>
                    <ul>
                        <li>.getClass()</li>
                        <li>.getOldClass()</li>
                        <li>.getJson()</li>
                        <li>.getArray()</li>
                        <li>.isIE()</li>
                        <li>.isIE(8)</li>
                        <li>.isIE(9, 'lte')</li>
                    </ul>
                    <p>Other javascript functions are not accessible, settings can be done with the Module configuration settings.</p>
                </div>
            </div><!--
        --></div>
    </div>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script>
        $(function () {

            /**
             * The getters can get information out of MarkupAdaptive. There's no way
             * to set information via Javascript. All available setters are available
             * via the Module config settings.
             *
             * All available getters: .getClass(), .getOldClass(), .getJson(),
             * .getArray() and isIE() with optional properties.
             *
             */

            // Get the current class
            console.log(MarkupAdaptive.getClass());

            // Get the old class, the class before
            console.log(MarkupAdaptive.getOldClass());

            // Mediaquery JSON object which originates from your Modules config'
            console.log(MarkupAdaptive.getJson());

            // Mediaquery JSON object which originates from your Modules config'
            console.log(MarkupAdaptive.getArray());

            // Is the current browser IE8
            console.log("MarkupAdaptive.isIE() - " + MarkupAdaptive.isIE());

            // Is the current browser IE8
            console.log("MarkupAdaptive.isIE(8) - " + MarkupAdaptive.isIE(8));

            // Is the current browser less then or equal to IE9 (lt, lte, gt, gte)
            console.log("MarkupAdaptive.isIE(9, 'lte') - " + MarkupAdaptive.isIE(9, 'lte'));

            /**
             * resized & mediaquerychange events
             *
             * When the viewport is resized, the resized event is fired. The resized
             * event has a delay, by default this is 150ms. You can set the delay
             * in the module config settings.
             *
             */

            $('html').on('resized', function(e) {
                console.log('Browser window is resized');
            });

            /**
             * mediaquerychange fires only when the injected classnames is not the
             * same as the previously set classname. The mediaquerychange event
             * fires before the resized event.
             *
             */

            $('html').on('mediaquerychange', function(e) {

                // Get the old class name before the “mediaquery” occured
                var oldClass = MarkupAdaptive.getOldClass();
                // Get the new class belonging to the current “mediaquery”
                var newClass = MarkupAdaptive.getClass();

                console.log('mediaquerychange, from: “' + oldClass + '” to: “' + newClass + '”');
            });

            /**
             * Internet Explorer 7 & 8 don't support custom Events. IE7 & IE8 use
             * the attachEvent method. A way other people get around this is by
             * using onpropertychange. Which is undoubtedly not the same as a real
             * event.
             *
             * A way we can solve this issue is to add two extra elements in the DOM.
             * Then on the end of the resize¹ we trigger a click on the element with
             * the id of resized and for the mediaquery change we trigger a click
             * on an element with the id mediaquerychange. Then we listen to that
             * click and trigger a resized or a mediaquerychange custom event.
             *
             * MarkupAdaptive will trigger that click regardless if the elements are
             * present in the DOM. If you want to repond on Mediaquery change for
             * old IE you have to add those two elements. Listen to the click and
             * route it to the custom events. (Example code below)
             *
             * ¹ See 'Execution delay after resize' from the module configuation.
             */

            if ($('html.oldie').length) {

                $("body").append("<a id='mediaquerychange'></a>");
                $("#mediaquerychange").on('click', function () {
                    $('html').trigger('mediaquerychange');
                });

                $("body").append("<a id='resized'></a>");
                $("#resized").on('click', function () {
                    $('html').trigger('resized');
                });
            }
        });

        // get the cookie with a name
        function getCookie(name) {
            var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
            return match ? match[1] : null;
        }

        console.log('Classname cookie value: ' + getCookie('MarkupAdaptive'));

    </script>
</body>
</html>
