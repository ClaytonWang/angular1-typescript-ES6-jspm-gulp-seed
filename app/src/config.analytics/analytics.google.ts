'use strict';

import {APIKeys} from 'APIKeys';

/**
 * Google Analyitics code will only initialize if an
 * analytics key is on:
 *
 *   <pre>this.googleAnalytics = 'UA-XXXXXXXX-X';</pre>
 *
 *   in app/src/APIKeys.ts.
 */
class GoogleAnaltyics {

  public key: string;

  constructor(keys) {

    if (keys.ga()) {
      this.key = keys.ga();
      this.init();
    }

  }

  init() {
    /* tslint:disable */
    // jscs:disable
    /* jshint ignore:start */
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    //Update UA-XXXXXXXX-X with Google Analytics Tracking ID.
    ga('create', this.key, 'auto');
    /* jshint ignore:end */
    // jscs:enable
    /* tslint:enable */
  }

  static factory() {
    return new GoogleAnaltyics(APIKeys.factory());
  }

}

export {GoogleAnaltyics};
