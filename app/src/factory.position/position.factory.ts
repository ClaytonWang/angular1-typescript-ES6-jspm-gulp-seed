'use strict';

/* tslint:disable */
class PositionFactory {

  public $document: any;
  public $window: any;

  /**
   * Used by scrollbarWidth() function to cache scrollbar's width.
   * Do not access _self letiable directly, use scrollbarWidth() instead.
   */
  public SCROLLBAR_WIDTH;
  public OVERFLOW_REGEX = {
    hidden: /(auto|scroll|hidden)/,
    normal: /(auto|scroll)/
  };

  public PLACEMENT_REGEX = {
    auto: /\s?auto?\s?/i,
    primary: /^(top|bottom|left|right)$/,
    secondary: /^(top|bottom|left|right|center)$/,
    vertical: /^(top|bottom)$/
  };

  constructor($document, $window) {
    this.$document = $document;
    this.$window = $window;
  }

  /**
   * Provides a raw DOM element from a jQuery/jQLite element.
   *
   * @param {element} elem - The element to convert.
   *
   * @returns {element} A HTML element.
   */
  getRawNode(elem) {
    return elem[0] || elem;
  }

  /**
   * Provides a parsed number for a style property.  Strips
   * units and casts invalid numbers to 0.
   *
   * @param {string} value - The style value to parse.
   *
   * @returns {number} A valid number.
   */
  parseStyle(value) {
    value = parseFloat(value);
    return isFinite(value) ? value : 0;
  }

  /**
   * Provides the closest positioned ancestor.
   *
   * @param {element} element - The element to get the offest parent for.
   *
   * @returns {element} The closest positioned ancestor.
   */
  offsetParent(elem) {
    let _self = this;
    elem = _self.getRawNode(elem);

    let offsetParent = elem.offsetParent || _self.$document[0].documentElement;

    function isStaticPositioned(el) {
      return (_self.$window.getComputedStyle(el).position || 'static') === 'static';
    }

    while (offsetParent && offsetParent !== _self.$document[0].documentElement && isStaticPositioned(offsetParent)) {
      offsetParent = offsetParent.offsetParent;
    }

    return offsetParent || _self.$document[0].documentElement;
  }

  /**
   * Provides the scrollbar width, concept from TWBS measureScrollbar()
   * function in https://github.com/twbs/bootstrap/blob/master/js/modal.js
   *
   * @returns {number} The width of the browser scollbar.
   */
  scrollbarWidth() {
    let _self = this;

    if (angular.isUndefined(_self.SCROLLBAR_WIDTH)) {
      let scrollElem = angular.element('<div style="position: absolute; top: -9999px; width: 50px; height: 50px; overflow: scroll;"></div>');
      _self.$document.find('body').append(scrollElem);
      _self.SCROLLBAR_WIDTH = scrollElem[0].offsetWidth - scrollElem[0].clientWidth;
      _self.SCROLLBAR_WIDTH = isFinite(_self.SCROLLBAR_WIDTH) ? _self.SCROLLBAR_WIDTH : 0;
      scrollElem.remove();
    }

    return _self.SCROLLBAR_WIDTH;
  }

  /**
   * Provides the closest scrollable ancestor.
   * A port of the jQuery UI scrollParent method:
   * https://github.com/jquery/jquery-ui/blob/master/ui/scroll-parent.js
   *
   * @param {element} elem - The element to find the scroll parent of.
   * @param {boolean=} [includeHidden=false] - Should scroll style of 'hidden' be considered,
   *   default is false.
   *
   * @returns {element} A HTML element.
   */
  scrollParent(elem, includeHidden?) {
    let _self = this;

    elem = _self.getRawNode(elem);

    let overflowRegex = includeHidden ? _self.OVERFLOW_REGEX.hidden : _self.OVERFLOW_REGEX.normal;
    let documentEl = _self.$document[0].documentElement;
    let elemStyle = _self.$window.getComputedStyle(elem);
    let excludeStatic = elemStyle.position === 'absolute';
    let scrollParent = elem.parentElement || documentEl;

    if (scrollParent === documentEl || elemStyle.position === 'fixed') {
      return documentEl;
    }

    while (scrollParent.parentElement && scrollParent !== documentEl) {
      let spStyle = _self.$window.getComputedStyle(scrollParent);
      if (excludeStatic && spStyle.position !== 'static') {
        excludeStatic = false;
      }

      if (!excludeStatic && overflowRegex.test(spStyle.overflow + spStyle.overflowY + spStyle.overflowX)) {
        break;
      }
      scrollParent = scrollParent.parentElement;
    }

    return scrollParent;
  }

  /**
   * Provides read-only equivalent of jQuery's position function:
   * http://api.jquery.com/position/ - distance to closest positioned
   * ancestor.  Does not account for margins by default like jQuery position.
   *
   * @param {element} elem - The element to caclulate the position on.
   * @param {boolean=} [includeMargins=false] - Should margins be accounted
   * for, default is false.
   *
   * @returns {object} An object with the following properties:
   *   <ul>
   *     <li>**width**: the width of the element</li>
   *     <li>**height**: the height of the element</li>
   *     <li>**top**: distance to top edge of offset parent</li>
   *     <li>**left**: distance to left edge of offset parent</li>
   *   </ul>
   */
  position(elem, includeMagins?) {
    let _self = this;

    elem = _self.getRawNode(elem);

    let elemOffset = _self.offset(elem);
    if (includeMagins) {
      let elemStyle = _self.$window.getComputedStyle(elem);
      elemOffset.top -= _self.parseStyle(elemStyle.marginTop);
      elemOffset.left -= _self.parseStyle(elemStyle.marginLeft);
    }
    let parent = _self.offsetParent(elem);
    let parentOffset = {top: 0, left: 0};

    if (parent !== _self.$document[0].documentElement) {
      parentOffset = _self.offset(parent);
      parentOffset.top += parent.clientTop - parent.scrollTop;
      parentOffset.left += parent.clientLeft - parent.scrollLeft;
    }

    return {
      width: Math.round(angular.isNumber(elemOffset.width) ? elemOffset.width : elem.offsetWidth),
      height: Math.round(angular.isNumber(elemOffset.height) ? elemOffset.height : elem.offsetHeight),
      top: Math.round(elemOffset.top - parentOffset.top),
      left: Math.round(elemOffset.left - parentOffset.left)
    };
  }

  /**
   * Provides read-only equivalent of jQuery's offset function:
   * http://api.jquery.com/offset/ - distance to viewport.  Does
   * not account for borders, margins, or padding on the body
   * element.
   *
   * @param {element} elem - The element to calculate the offset on.
   *
   * @returns {object} An object with the following properties:
   *   <ul>
   *     <li>**width**: the width of the element</li>
   *     <li>**height**: the height of the element</li>
   *     <li>**top**: distance to top edge of viewport</li>
   *     <li>**right**: distance to bottom edge of viewport</li>
   *   </ul>
   */
  offset(elem) {
    let _self = this;
    elem = this.getRawNode(elem);

    let elemBCR = elem.getBoundingClientRect();
    return {
      width: Math.round(angular.isNumber(elemBCR.width) ? elemBCR.width : elem.offsetWidth),
      height: Math.round(angular.isNumber(elemBCR.height) ? elemBCR.height : elem.offsetHeight),
      top: Math.round(elemBCR.top + (_self.$window.pageYOffset || _self.$document[0].documentElement.scrollTop)),
      left: Math.round(elemBCR.left + (_self.$window.pageXOffset || _self.$document[0].documentElement.scrollLeft))
    };
  }

  /**
   * Provides offset distance to the closest scrollable ancestor
   * or viewport.  Accounts for border and scrollbar width.
   *
   * Right and bottom dimensions represent the distance to the
   * respective edge of the viewport element.  If the element
   * edge extends beyond the viewport, a negative value will be
   * reported.
   *
   * @param {element} elem - The element to get the viewport offset for.
   * @param {boolean=} [useDocument=false] - Should the viewport be the document element instead
   * of the first scrollable element, default is false.
   * @param {boolean=} [includePadding=true] - Should the padding on the offset parent element
   * be accounted for, default is true.
   *
   * @returns {object} An object with the following properties:
   *   <ul>
   *     <li>**top**: distance to the top content edge of viewport element</li>
   *     <li>**bottom**: distance to the bottom content edge of viewport element</li>
   *     <li>**left**: distance to the left content edge of viewport element</li>
   *     <li>**right**: distance to the right content edge of viewport element</li>
   *   </ul>
   */
  viewportOffset(elem, useDocument?, includePadding?) {
    let _self = this;
    elem = _self.getRawNode(elem);
    includePadding = includePadding !== false ? true : false;

    let elemBCR = elem.getBoundingClientRect();
    let offsetBCR = {top: 0, left: 0, bottom: 0, right: 0};

    let offsetParent = useDocument ? _self.$document[0].documentElement : _self.scrollParent(elem);
    let offsetParentBCR = offsetParent.getBoundingClientRect();

    offsetBCR.top = offsetParentBCR.top + offsetParent.clientTop;
    offsetBCR.left = offsetParentBCR.left + offsetParent.clientLeft;
    if (offsetParent === _self.$document[0].documentElement) {
      offsetBCR.top += _self.$window.pageYOffset;
      offsetBCR.left += _self.$window.pageXOffset;
    }
    offsetBCR.bottom = offsetBCR.top + offsetParent.clientHeight;
    offsetBCR.right = offsetBCR.left + offsetParent.clientWidth;

    if (includePadding) {
      let offsetParentStyle = _self.$window.getComputedStyle(offsetParent);
      offsetBCR.top += _self.parseStyle(offsetParentStyle.paddingTop);
      offsetBCR.bottom -= _self.parseStyle(offsetParentStyle.paddingBottom);
      offsetBCR.left += _self.parseStyle(offsetParentStyle.paddingLeft);
      offsetBCR.right -= _self.parseStyle(offsetParentStyle.paddingRight);
    }

    return {
      top: Math.round(elemBCR.top - offsetBCR.top),
      bottom: Math.round(offsetBCR.bottom - elemBCR.bottom),
      left: Math.round(elemBCR.left - offsetBCR.left),
      right: Math.round(offsetBCR.right - elemBCR.right)
    };
  }

  /**
   * Provides an array of placement values parsed from a placement string.
   * Along with the 'auto' indicator, supported placement strings are:
   *   <ul>
   *     <li>top: element on top, horizontally centered on host element.</li>
   *     <li>top-left: element on top, left edge aligned with host element left edge.</li>
   *     <li>top-right: element on top, lerightft edge aligned with host element right edge.</li>
   *     <li>bottom: element on bottom, horizontally centered on host element.</li>
   *     <li>bottom-left: element on bottom, left edge aligned with host element left edge.</li>
   *     <li>bottom-right: element on bottom, right edge aligned with host element right edge.</li>
   *     <li>left: element on left, vertically centered on host element.</li>
   *     <li>left-top: element on left, top edge aligned with host element top edge.</li>
   *     <li>left-bottom: element on left, bottom edge aligned with host element bottom edge.</li>
   *     <li>right: element on right, vertically centered on host element.</li>
   *     <li>right-top: element on right, top edge aligned with host element top edge.</li>
   *     <li>right-bottom: element on right, bottom edge aligned with host element bottom edge.</li>
   *   </ul>
   * A placement string with an 'auto' indicator is expected to be
   * space separated from the placement, i.e: 'auto bottom-left'  If
   * the primary and secondary placement values do not match 'top,
   * bottom, left, right' then 'top' will be the primary placement and
   * 'center' will be the secondary placement.  If 'auto' is passed, true
   * will be returned as the 3rd value of the array.
   *
   * @param {string} placement - The placement string to parse.
   *
   * @returns {array} An array with the following values
   * <ul>
   *   <li>**[0]**: The primary placement.</li>
   *   <li>**[1]**: The secondary placement.</li>
   *   <li>**[2]**: If auto is passed: true, else undefined.</li>
   * </ul>
   */
  parsePlacement(placement) {
    let _self = this;
    let autoPlace = _self.PLACEMENT_REGEX.auto.test(placement);
    if (autoPlace) {
      placement = placement.replace(_self.PLACEMENT_REGEX.auto, '');
    }

    placement = placement.split('-');

    placement[0] = placement[0] || 'top';
    if (!_self.PLACEMENT_REGEX.primary.test(placement[0])) {
      placement[0] = 'top';
    }

    placement[1] = placement[1] || 'center';
    if (!_self.PLACEMENT_REGEX.secondary.test(placement[1])) {
      placement[1] = 'center';
    }

    if (autoPlace) {
      placement[2] = true;
    } else {
      placement[2] = false;
    }

    return placement;
  }

  /**
   * Provides coordinates for an element to be positioned relative to
   * another element.  Passing 'auto' as part of the placement parameter
   * will enable smart placement - where the element fits. i.e:
   * 'auto left-top' will check to see if there is enough space to the left
   * of the hostElem to fit the targetElem, if not place right (same for secondary
   * top placement).  Available space is calculated using the viewportOffset
   * function.
   *
   * @param {element} hostElem - The element to position against.
   * @param {element} targetElem - The element to position.
   * @param {string=} [placement=top] - The placement for the targetElem,
   *   default is 'top'. 'center' is assumed as secondary placement for
   *   'top', 'left', 'right', and 'bottom' placements.  Available placements are:
   *   <ul>
   *     <li>top</li>
   *     <li>top-right</li>
   *     <li>top-left</li>
   *     <li>bottom</li>
   *     <li>bottom-left</li>
   *     <li>bottom-right</li>
   *     <li>left</li>
   *     <li>left-top</li>
   *     <li>left-bottom</li>
   *     <li>right</li>
   *     <li>right-top</li>
   *     <li>right-bottom</li>
   *   </ul>
   * @param {boolean=} [appendToBody=false] - Should the top and left values returned
   *   be calculated from the body element, default is false.
   *
   * @returns {object} An object with the following properties:
   *   <ul>
   *     <li>**top**: Value for targetElem top.</li>
   *     <li>**left**: Value for targetElem left.</li>
   *     <li>**placement**: The resolved placement.</li>
   *   </ul>
   */
  positionElements(hostElem, targetElem, placement, appendToBody) {
    let _self = this;
    hostElem = _self.getRawNode(hostElem);
    targetElem = _self.getRawNode(targetElem);

    // need to read from prop to support tests.
    let targetWidth = angular.isDefined(targetElem.offsetWidth) ? targetElem.offsetWidth : targetElem.prop('offsetWidth');
    let targetHeight = angular.isDefined(targetElem.offsetHeight) ? targetElem.offsetHeight : targetElem.prop('offsetHeight');

    placement = _self.parsePlacement(placement);

    let hostElemPos = appendToBody ? _self.offset(hostElem) : _self.position(hostElem);
    let targetElemPos = {top: 0, left: 0, placement: ''};

    if (placement[2]) {
      let viewportOffset = _self.viewportOffset(hostElem);

      let targetElemStyle = _self.$window.getComputedStyle(targetElem);
      let adjustedSize = {
        width: targetWidth + Math.round(Math.abs(_self.parseStyle(targetElemStyle.marginLeft) + _self.parseStyle(targetElemStyle.marginRight))),
        height: targetHeight + Math.round(Math.abs(_self.parseStyle(targetElemStyle.marginTop) + _self.parseStyle(targetElemStyle.marginBottom)))
      };

      placement[0] = placement[0] === 'top' && adjustedSize.height > viewportOffset.top && adjustedSize.height <= viewportOffset.bottom ? 'bottom' :
        placement[0] === 'bottom' && adjustedSize.height > viewportOffset.bottom && adjustedSize.height <= viewportOffset.top ? 'top' :
          placement[0] === 'left' && adjustedSize.width > viewportOffset.left && adjustedSize.width <= viewportOffset.right ? 'right' :
            placement[0] === 'right' && adjustedSize.width > viewportOffset.right && adjustedSize.width <= viewportOffset.left ? 'left' :
              placement[0];

      placement[1] = placement[1] === 'top' && adjustedSize.height - hostElemPos.height > viewportOffset.bottom && adjustedSize.height - hostElemPos.height <= viewportOffset.top ? 'bottom' :
        placement[1] === 'bottom' && adjustedSize.height - hostElemPos.height > viewportOffset.top && adjustedSize.height - hostElemPos.height <= viewportOffset.bottom ? 'top' :
          placement[1] === 'left' && adjustedSize.width - hostElemPos.width > viewportOffset.right && adjustedSize.width - hostElemPos.width <= viewportOffset.left ? 'right' :
            placement[1] === 'right' && adjustedSize.width - hostElemPos.width > viewportOffset.left && adjustedSize.width - hostElemPos.width <= viewportOffset.right ? 'left' :
              placement[1];

      if (placement[1] === 'center') {
        if (_self.PLACEMENT_REGEX.vertical.test(placement[0])) {
          let xOverflow = hostElemPos.width / 2 - targetWidth / 2;
          if (viewportOffset.left + xOverflow < 0 && adjustedSize.width - hostElemPos.width <= viewportOffset.right) {
            placement[1] = 'left';
          } else if (viewportOffset.right + xOverflow < 0 && adjustedSize.width - hostElemPos.width <= viewportOffset.left) {
            placement[1] = 'right';
          }
        } else {
          let yOverflow = hostElemPos.height / 2 - adjustedSize.height / 2;
          if (viewportOffset.top + yOverflow < 0 && adjustedSize.height - hostElemPos.height <= viewportOffset.bottom) {
            placement[1] = 'top';
          } else if (viewportOffset.bottom + yOverflow < 0 && adjustedSize.height - hostElemPos.height <= viewportOffset.top) {
            placement[1] = 'bottom';
          }
        }
      }
    }

    switch (placement[0]) {
      case 'top':
        targetElemPos.top = hostElemPos.top - targetHeight;
        break;
      case 'bottom':
        targetElemPos.top = hostElemPos.top + hostElemPos.height;
        break;
      case 'left':
        targetElemPos.left = hostElemPos.left - targetWidth;
        break;
      case 'right':
        targetElemPos.left = hostElemPos.left + hostElemPos.width;
        break;
    }

    switch (placement[1]) {
      case 'top':
        targetElemPos.top = hostElemPos.top;
        break;
      case 'bottom':
        targetElemPos.top = hostElemPos.top + hostElemPos.height - targetHeight;
        break;
      case 'left':
        targetElemPos.left = hostElemPos.left;
        break;
      case 'right':
        targetElemPos.left = hostElemPos.left + hostElemPos.width - targetWidth;
        break;
      case 'center':
        if (_self.PLACEMENT_REGEX.vertical.test(placement[0])) {
          targetElemPos.left = hostElemPos.left + hostElemPos.width / 2 - targetWidth / 2;
        } else {
          targetElemPos.top = hostElemPos.top + hostElemPos.height / 2 - targetHeight / 2;
        }
        break;
    }

    targetElemPos.top = Math.round(targetElemPos.top);
    targetElemPos.left = Math.round(targetElemPos.left);
    targetElemPos.placement = placement[1] === 'center' ? placement[0] : placement[0] + '-' + placement[1];

    return targetElemPos;
  }

  /**
   * Provides a way for positioning tooltip & dropdown
   * arrows when using placement options beyond the standard
   * left, right, top, or bottom.
   *
   * @param {element} elem - The tooltip/dropdown element.
   * @param {string} placement - The placement for the elem.
   */
  positionArrow(elem, placement) {
    let _self = this;
    elem = _self.getRawNode(elem);

    let innerElem = elem.querySelector('.tooltip-inner, .popover-inner');
    if (!innerElem) {
      return;
    }

    let isTooltip = angular.element(innerElem).hasClass('tooltip-inner');

    let arrowElem = isTooltip ? elem.querySelector('.tooltip-arrow') : elem.querySelector('.arrow');
    if (!arrowElem) {
      return;
    }

    placement = _self.parsePlacement(placement);
    if (placement[1] === 'center') {
      // no adjustment necessary - just reset styles
      angular.element(arrowElem).css({top: '', bottom: '', right: '', left: '', margin: ''});
      return;
    }

    let borderProp = 'border-' + placement[0] + '-width';
    let borderWidth = _self.$window.getComputedStyle(arrowElem)[borderProp];

    let borderRadiusProp = 'border-';
    if (_self.PLACEMENT_REGEX.vertical.test(placement[0])) {
      borderRadiusProp += placement[0] + '-' + placement[1];
    } else {
      borderRadiusProp += placement[1] + '-' + placement[0];
    }
    borderRadiusProp += '-radius';
    let borderRadius = _self.$window.getComputedStyle(isTooltip ? innerElem : elem)[borderRadiusProp];

    let arrowCss = {
      top: 'auto',
      bottom: 'auto',
      left: 'auto',
      right: 'auto',
      margin: 0
    };

    switch (placement[0]) {
      case 'top':
        arrowCss.bottom = isTooltip ? '0' : '-' + borderWidth;
        break;
      case 'bottom':
        arrowCss.top = isTooltip ? '0' : '-' + borderWidth;
        break;
      case 'left':
        arrowCss.right = isTooltip ? '0' : '-' + borderWidth;
        break;
      case 'right':
        arrowCss.left = isTooltip ? '0' : '-' + borderWidth;
        break;
    }

    arrowCss[placement[1]] = borderRadius;

    angular.element(arrowElem).css(arrowCss);
  }


  static factory($document, $window) {
    return new PositionFactory($document, $window);
  }

}
/* tslint:enable */

export {PositionFactory};
