var MarkupAdaptive = (function() {

    'use strict';

    var json = ##JSON##,
        start,
        finished,
        array = ##ARRAY##,
        browser,
        timer,
        delay = ##DELAY##,
        prefix = ##PREFIX##,
        until = ##UNTIL##,
        upward = ##UPWARD##,
        oldie_enabled = ##OLDIE##,
        write_cookie = ##COOKIE##,
        resized,
        str,
        mqclass,
        oldclass,
        mqclasses = '',
        isExpl,
        versionExpl = '',
        dom = document.documentElement,
        head = document.getElementsByTagName('head')[0],
        script = document.getElementsByTagName('script')[0],
        style = document.createElement('style'),
        media = document.createElement('b'),
        classes = dom.className;

    // credits: scottjehl :https://gist.github.com/scottjehl/357727
    function isIE(version, comparison) {
        var e = 'IE', i = document.createElement('I');

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
        if (!write_cookie) { return false; }
        document.cookie = 'MarkupAdaptive=' + mqclass + '; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/';
    }

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

    function eventOldie() {
        if (!resized) {
            setCookie();
            return;
        }
        try {

            var body = dom.getElementsByTagName('body')[0],
                mqc = document.getElementById('mediaquerychange'),
                rsz = document.getElementById('resized');
            if (oldclass !== mqclass) {
                mqc.click();
                oldclass = mqclass;
                setCookie()
            }

            rsz.click();
        } catch(e) { }
    }

    function upAndDown(mqclass) {

        /**
         * Small to big
         *
         */

        for (var k in json) {
            if (json.hasOwnProperty(k)) {
                mqclasses += prefix ? upward + k : k + upward;
                mqclasses += ' ';
                if (k === mqclass) {
                    break;
                }
            }
        }
        array.reverse();
        for (var i = 0; i < array.length; i++) {
            mqclasses += prefix ? until + array[i] : array[i] + until;
            mqclasses += ' ';
            if (array[i] === mqclass) { break; }
        }
        array.reverse();
    }

    /**
     * Insert a stylesheet with media queries & collect old redundant classnames
     * in the variable classes
     *
     */
    function insertClasses() {
        if (browser === 'modern') {
            dom.appendChild(media);
            mqclass = window.getComputedStyle(media, ':after').getPropertyValue('content').replace(/"/g, '');
        }

        if (typeof oldclass == 'undefined') { oldclass = mqclass; }
        mqclasses = '';
        upAndDown(mqclass);
        dom.className = classes + ' ' + mqclasses + browser + ' ' + versionExpl + mqclass;
        if (browser === 'modern') {
            eventModern();
            dom.removeChild(media);
            head.removeChild(style);
        } else {
            eventOldie();
        }
    }

    /**
     * Modern browsers insert a stylesheet with media queries build from the
     * ProcessWire module config settings.
     *
     */
    function modern() {
        style.type = 'text/css';
        style.id = 'mqstyles';
        media.id = 'mq';

        var c;
        for (c in json) {
            if (json.hasOwnProperty(c)) {
                var min = json[c].min,
                    max = json[c].max,
                    after = '#mq:after{content:\'' + c + '\'; display: none;}';
                if (!min && max) {
                    str = ' ' + browser + ' ' + c + '|';
                    style.innerHTML = '@media all and (max-width:' + max + '){' + after + '}';
                } else if (min && max) {
                    str += ' ' + browser + ' ' + c + '|';
                    style.innerHTML += '@media all and (min-width:' + min + ') and (max-width: ' + max + '){' + after + '}';
                } else {
                    str += ' ' + browser + ' ' + c;
                    style.innerHTML += '@media all and (min-width:' + min + '){' + after + '}';
                }
            }
        }
        head.insertBefore(style, script);
        classes = classes.replace(new RegExp('(' + str + ')', 'g'), '');
        insertClasses();
    }

    /**
     * For IE7 and IE8, return classes based on the results from the clientWidth
     *
     */
    function oldie() {
        var viewport = dom.clientWidth, k;
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
    }

    /**
     * Figure out what browser we deal with, set the variable 'browser' and fire
     * the right function.
     *
     */
    function fire() {
        if (typeof window.matchMedia !== 'undefined' || typeof window.msMatchMedia !== 'undefined') {
            browser = 'modern';
            modern();
        } else if (isIE(9)) {
            browser = 'modern';
            modern();
        } else if (isIE(8)) {
            browser = 'oldie';
            versionExpl = 'ie8 ';
            oldie();
        } else if (isIE(7)) {
            browser = 'oldie';
            versionExpl = 'ie7 ';
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
        init: (function() {

            if (oldie_enabled == 0 && isIE()) { return false; }

            fire();
            window.onresize = function() {
                clearTimeout(timer);
                timer = setTimeout(function() {
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
        getClass: function() {
            return mqclass;
        },
        getOldClass: function() {
            return oldclass;
        },
        getJson: function() {
            return json;
        },
        getArray: function() {
            return array;
        },
        isIE: function(version, comparison) {
            return isIE(version, comparison);
        }
    };

}());
