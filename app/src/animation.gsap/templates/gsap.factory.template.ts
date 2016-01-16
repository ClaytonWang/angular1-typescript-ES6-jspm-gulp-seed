'use strict';
/* tslint:disable */
/**
 * Run gulp inject.gsap to copy greensock files to this temaplate.
 *
 * @returns {{TweenMax: any, TimelineMax: any, CSSPlugin: any, CSSRulePlugin: any, Power0: any, Power1: any, Power2: any, Power3: any, Power4: any, Linear: any, Quad: any, Cubic: any, Quart: any, Quint: any, Strong: any}}
 */
function gsapFactory {

  /* begin-gsap-inject:js */
  /* end-gsap-inject:js */

  return {
    TweenMax: _gsScope.TweenMax,
    TimelineMax: _gsScope.TimelineMax,

    //Plugings
    CSSPlugin: _gsScope.CSSPlugin,
    CSSRulePlugin: _gsScope.CSSRulePlugin,

    //Easing
    //create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong,
    Power0: _gsScope.Power0,
    Power1: _gsScope.Power1,
    Power2: _gsScope.Power2,
    Power3: _gsScope.Power3,
    Power4: _gsScope.Power4,
    Linear: _gsScope.Linear,
    Quad: _gsScope.Quad,
    Cubic: _gsScope.Cubic,
    Quart: _gsScope.Quart,
    Quint: _gsScope.Quint,
    Strong: _gsScope.Strong
  };

}

export {gsapFactory};
/* tslint:enable */
