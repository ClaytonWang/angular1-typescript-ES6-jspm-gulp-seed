'use strict';
import 'greensock';
import {GsapConfig} from './gsap.config';

function ngViewGsap (uixPosition) {
  'use strict';

  let settings = new GsapConfig();
  let enterSettings = settings.ngView.enter;
  let leaveSettings = settings.ngView.leave;
  let setup = settings.ngView.setup;

  return {
    enter: function(element, parentElement, afterElement, done) {
      TweenMax.set
      (
        element, {
          display: 'none',
          opacity: setup.opacity
        });

      TweenMax.to(
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
        TweenMax.to(
          element,
          0,
          {
            display: 'none',
            onComplete: done
          });
      }

      TweenMax.to(
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
