'use strict';

/**
 * API Keys used in app.
 */
class APIKeys {

  public googleAnalytics: string;

  constructor() {

    this.googleAnalytics = 'UA-XXXXXXXX-X';

  }

  public validate(key): boolean {
    return (key.length > 0);
  }

  /**
   * Google Analytics.
   * @returns {any}
   */
  public ga() {
    if (this.validate(this.googleAnalytics) && this.googleAnalytics !== 'UA-XXXXXXXX-X') {
      return this.googleAnalytics;
    } else {
      return false;
    }
  }

  static factory() {
    return new APIKeys();
  }
}

export {APIKeys};
