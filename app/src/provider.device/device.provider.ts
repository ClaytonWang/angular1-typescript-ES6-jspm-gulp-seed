'use strict';

/**
 * Test if app is hosted in the cloud or on a device. Angular Provider that can be injected in a
 * config block.
 *
 * <pre>
 * angular.module('someApp', []).config(function(deviceProvider) {
 *     let device = deviceProvider.isApp();
 *     //Do something with device.
 *     //Demo
 * }
 * </pre>
 *
 * Implements IDevice
 */
class DeviceProvider {

  /**
   * Determines if app is on a mobile device
   * or on a web server.
   *
   * Checks if location.href is 'file://' or 'http://'
   * @returns {boolean}
   */
  isApp() { return location.href.indexOf('file://') === 0; }

  isMobile() { return (/Mobile/i.test(navigator.userAgent)); }

  getHost() { return (this.isApp() ? '' : '/'); }

  $get() { return this; }
}

export {DeviceProvider};
