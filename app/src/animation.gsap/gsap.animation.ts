'use strict';

import 'greensock';
import {GsapProvider} from './gsap.config';

function ngViewGsap (uixPosition, gsap) {
  'use strict';

  let settings = new GsapProvider();
  let enterSettings = settings.ngView.enter;
  let leaveSettings = settings.ngView.leave;
  let setup = settings.ngView.setup;

  return {
    enter: function(element, parentElement, afterElement, done) {
      gsap.TweenMax.set
      (
        element, {
          display: 'none',
          opacity: setup.opacity
        });

      gsap.TweenMax.to(
        element,
        enterSettings.time.transition,
        {
          delay: enterSettings.time.delay,
          display: 'block',
          onComplete: done,
          opacity: 1
        });
    },

    leave: function(element, done) {

      function onComplete() {
        gsap.TweenMax.to(
          element,
          0,
          {
            display: 'none',
            onComplete: done
          });
      }

      gsap.TweenMax.to(
        element,
        leaveSettings.time.transition,
        {
          onComplete: onComplete,
          opacity: 0
        });
    }
  };
}

export {ngViewGsap}
