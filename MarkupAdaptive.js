/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
window.matchMedia || (window.matchMedia = function () {
    "use strict";

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style = document.createElement('style'),
            script = document.getElementsByTagName('script')[0],
            info = null;

        style.type = 'text/css';
        style.id = 'matchmediajs-test';

        script.parentNode.insertBefore(style, script);

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function (media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function (media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());



var MarkupAdaptive = (function () {

    'use strict';

    var json = '**json**',
        array = '**array**',
        delay = '**delay**',
        prefix = '**prefix**',
        until = '**until**',
        upward = '**upward**',
        oldie_enabled = '**oldie**',
        write_cookie = '**cookie**',
        browser,
        timer,
        resized,
        str,
        mqclass,
        oldclass,
        mqclasses = '',
        isExpl,
        version = '',
        dom = document.documentElement,
        classes = dom.className;

    // credits: scottjehl :https://gist.github.com/scottjehl/357727
    function isIE(version, comparison) {
        var e = 'IE',
            i = document.createElement('I');
        if (version) {
            e += ' ' + version;
            if (comparison) {
                e = comparison + ' ' + e;
            }
        }
        i.innerHTML = '<!--[if ' + e + ']><i id=\'ie-test\'></i><![endif]-->';
        dom.appendChild(i);
        isExpl = !!document.getElementById('ie-test');
        dom.removeChild(i);
        return isExpl;
    }

    function setCookie() {
        if (!write_cookie) {
            return false;
        }
        document.cookie = 'MarkupAdaptive=' + mqclass + '; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/';
    }

    /**
     * Fire events for modern browsers
     * Fires a resized event always, and mediaquerychange only when theres a
     * change in breakpoints
     *
     */
    function eventModern() {
        if (!resized) {
            setCookie();
            return;
        }
        if (oldclass !== mqclass) {
            var e = document.createEvent('Event');
            e.initEvent('mediaquerychange', true, true);
            dom.dispatchEvent(e);
            oldclass = mqclass;
            setCookie();
        }
        var r = document.createEvent('Event');
        r.initEvent('resized', true, true);
        dom.dispatchEvent(r);
    }

    /**
     * Set click to emulate the events for IE7 & IE 8.
     *
     */
    function eventOldie() {
        if (!resized) {
            setCookie();
            return;
        }
        try {
            if (oldclass !== mqclass) {
                document.getElementById('mediaquerychange').click();
                oldclass = mqclass;
                setCookie();
            }
            document.getElementById('resized').click();
        } catch (e) {}
    }

    /**
     * Upward and until classes
     *
     */
    function upAndDown() {
        mqclasses = '';
        for (var i = 0; i < array.length; i++) {
            mqclasses += prefix ? upward + array[i] : array[i] + upward;
            mqclasses += ' ';
            if (array[i] === mqclass) {
                break;
            }
        }
        array.reverse();
        for (var i = 0; i < array.length; i++) {
            mqclasses += prefix ? until + array[i] : array[i] + until;
            mqclasses += ' ';
            if (array[i] === mqclass) {
                break;
            }
        }
        array.reverse();
    }

    /**
     * Insert a stylesheet with media queries & collect old redundant classnames
     * in the variable classes
     *
     */
    function insertClasses() {
        if (typeof oldclass == 'undefined') {
            oldclass = mqclass;
        }
        upAndDown();
        dom.className = classes + ' ' + mqclasses + browser + ' ' + version + mqclass;
    }

    /**
     * Modern browsers insert a stylesheet with media queries build from the
     * ProcessWire module config settings.
     *
     */
    function modern() {
        var cls;
        for (cls in json) {
            if (json.hasOwnProperty(cls)) {
                var min = json[cls].min,
                    max = json[cls].max;
                if (!min && max) {
                    str = ' ' + browser + ' ' + cls + '|';
                    if (matchMedia('(max-width:' + max + ')').matches) {
                        mqclass = cls;
                    }
                } else if (min && max) {
                    str += ' ' + browser + ' ' + cls + '|';
                    if (matchMedia('(min-width:' + min + ') and (max-width: ' + max + ')').matches) {
                        mqclass = cls;
                    }
                } else {
                    str += ' ' + browser + ' ' + cls;
                    if (matchMedia('(min-width:' + min + ')').matches) {
                        mqclass = cls;
                    }
                }
            }
        }
        classes = classes.replace(new RegExp('(' + str + ')', 'g'), '');
        insertClasses();
        eventModern();
    }

    /**
     * For IE7 and IE8, return classes based on the results from the clientWidth
     *
     */
    function oldie() {
        var viewport = dom.clientWidth,
            k;
        for (k in json) {
            if (json.hasOwnProperty(k)) {
                var min = parseInt(json[k].min, 10),
                    max = parseInt(json[k].max, 10);
                if (!min && max && viewport <= max) {
                    mqclass = k;
                    str = ' ' + browser + ' ' + k + '|';
                } else if (min && max && viewport >= min && viewport <= max) {
                    mqclass = k;
                    str += ' ' + browser + ' ' + k + '|';
                } else if (viewport >= min) {
                    mqclass = k;
                    str += ' ' + browser + ' ' + k;
                }
            }
        }
        classes = classes.replace(new RegExp('(' + str + ')', 'g'), '');
        insertClasses();
        eventOldie();
    }

    /**
     * Figure out what browser we deal with, set the variable 'browser' and fire
     * the right function.
     *
     */
    function fire() {
        if (matchMedia('(min-width:1px)').matches) {
            browser = 'modern';
            modern();
        } else if (isIE(8)) {
            browser = 'oldie';
            version = 'ie8 ';
            oldie();
        } else if (isIE(7)) {
            browser = 'oldie';
            version = 'ie7 ';
            oldie();
        } else if (isIE(6, 'lte')) {
            return false;
        } else {
            alert('Please report an issue on the PW forum / github about this message.');
        }
    }

    /**
     * Immediately start the 'process'
     *
     */
    return {

        /**
         * Immediately invoked function, fires the private function fire and
         * make the onresize event available.
         *
         */
        init: (function () {

            if (oldie_enabled == 0 && isIE()) {
                return false;
            }

            fire();

            window.onresize = function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    resized = true;
                    if (browser === 'modern') {
                        modern();
                    } else {
                        oldie();
                    }
                }, delay);
            };
        }()),

        /**
         * Available getters for the base function MarkupAdaptive
         *
         */
        getClass: function () {
            return mqclass;
        },
        getOldClass: function () {
            return oldclass;
        },
        getJson: function () {
            return json;
        },
        getArray: function () {
            return array;
        },
        isIE: function (version, comparison) {
            return isIE(version, comparison);
        }
    };

}());
