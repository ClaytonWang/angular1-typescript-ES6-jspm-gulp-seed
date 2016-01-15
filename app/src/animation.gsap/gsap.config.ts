'use strict';

class GsapProvider {

  public transition: number = 0.25;
  public ease: string = 'Power2';

  public ngView: any = {
    enter: {
      time: {
        delay: this.transition + 0.1,
        transition: this.transition
      }
    },
    leave: {
      time: {
        transition: this.transition
      }
    },
    setup: {
      opacity: 0
    }
  };

  public ngShowHide: any = {
    beforeAddClass: {
      time: {
        transition: this.transition
      }
    },
    removeClass: {
      setup: {},
      time: {
        transition: this.transition
      }
    }
  };
}

export {GsapProvider};
