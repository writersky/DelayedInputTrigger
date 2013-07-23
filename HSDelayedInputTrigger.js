/*************************************************************************
 * Heartstring.js
 * https://github.com/writersky/DelayedInputTrigger
 * Copyright 2013 Writersky.
 *
 * Licensed under the The GNU Lesser General Public License,
 * version 2.1 (LGPL-2.1).
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://opensource.org/licenses/lgpl-2.1.php
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **************************************************************************/
 /************************************************************************/
/* HSDelayedInputTrigger will only fire events after a given time.      */
/* Ideal to use for input text that pervents too many calls to the API. */
/*                                                                      */
/* @author  Harris Wong                                                 */
/* @date    July 22nd, 2013                                             */
/************************************************************************/
// $Id: HSDelayedInputTrigger.js 471 2013-05-12 22:24:53Z harris $
Heartstring.HSDelayedInputTrigger = Heartstring.HSDelayedInputTrigger || {};

/**
* component code
*/
Heartstring.HSDelayedInputTrigger = function (container, config) {
    var that = Heartstring.init(Heartstring.HSDelayedInputTrigger, config);
    that.container = container;
    
    /**
     * Bind toggler
     */
    that.bindKeyup = function (that) {
        var stopwatch;
        var timeoutTracker;
        Heartstring.select(that.container).bind('keyup', function(e) {
            if (Heartstring.select(that.container).val() === "") {
                //If input is empty, treat it as reset.
                that.config.callback(that);
                return;
            }
            var currentTime = new Date().getTime();
            if (!stopwatch) {
                //first keystroke
                stopwatch = new Date().getTime();
                return;
            }
            if (currentTime - stopwatch > that.config.TIMEDELAY) {
                //trigger event
                that.config.callback(that);
            } 
            
            //The last letter will never trigger anything
            clearTimeout(timeoutTracker);
            timeoutTracker = setTimeout(function() {
                that.config.callback(that);
            }, that.config.TIMEDELAY);
            
            stopwatch = new Date().getTime();
            console.log(stopwatch);
        });
    };
    return that;
}

/**
* Content init
*/
Heartstring.HSDelayedInputTrigger.init = function(container, config) {
    // create this component
    var that = Heartstring.HSDelayedInputTrigger(container, config);
    
    // Bind events
    Heartstring.HSDelayedInputTrigger.bind(that);
};

Heartstring.HSDelayedInputTrigger.bind = function(that) {
    that.bindKeyup(that);
}


//default settings for this component
Heartstring.HSDelayedInputTrigger.defaults = {
    container: "",
    config: {
        TIMEDELAY: 1000,
        selectors: {
        },
        callback: function(that) {
            console.log(Heartstring.select(that.container).val());
        }
    }
};