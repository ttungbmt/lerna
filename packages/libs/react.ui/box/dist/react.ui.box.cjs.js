'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var BaseBox = _interopDefault(require('@material-ui/core/Box'));
var lodashEs = require('lodash-es');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

/**
 * @render react
 * @name Box
 * Palette: color, bgcolor
 * Media: xs, sm, md
 * Border: border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderRadius
 * Display: component, display, overflow, textOverflow, visibility, whiteSpace
 * Flexbox: flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf
 * Position: position, zIndex, top, right, bottom, left
 * Size: width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing,
 * Spacing: m, mt, mr, mb, ml, mx, my, p, pt, pr, pb, pl, px, py,
 * Typography: fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign,
 * @example
 * <Box>Accept</Tippy>
 */

function Box(props) {
  var flex = props.flex,
      row = props.row,
      column = props.column,
      inline = props.inline,
      block = props.block,
      floatRight = props.floatRight,
      floatLeft = props.floatLeft,
      wrap = props.wrap,
      grow = props.grow,
      shrink = props.shrink,
      bold = props.bold,
      regular = props.regular,
      uppercase = props.uppercase,
      relative = props.relative,
      absolute = props.absolute,
      itemsCenter = props.itemsCenter,
      contentCenter = props.contentCenter,
      contentBetween = props.contentBetween,
      selfCenter = props.selfCenter,
      justifyCenter = props.justifyCenter,
      pv = props.pv,
      ph = props.ph,
      mv = props.mv,
      mh = props.mh,
      textXs = props.textXs,
      textSm = props.textSm,
      textBase = props.textBase,
      textLg = props.textLg,
      textXl = props.textXl,
      text2Xl = props.text2Xl,
      text3Xl = props.text3Xl,
      text4Xl = props.text4Xl,
      text5Xl = props.text5Xl,
      text6Xl = props.text6Xl,
      cursor = props.cursor,
      outline = props.outline,
      style = props.style,
      children = props.children,
      outter = _objectWithoutProperties(props, ["flex", "row", "column", "inline", "block", "floatRight", "floatLeft", "wrap", "grow", "shrink", "bold", "regular", "uppercase", "relative", "absolute", "itemsCenter", "contentCenter", "contentBetween", "selfCenter", "justifyCenter", "pv", "ph", "mv", "mh", "textXs", "textSm", "textBase", "textLg", "textXl", "text2Xl", "text3Xl", "text4Xl", "text5Xl", "text6Xl", "cursor", "outline", "style", "children"]);

  var inner = {
    style: lodashEs.clone(style)
  };
  setIf(inner, textXs, 'fontSize', '.75rem');
  setIf(inner, textSm, 'fontSize', '.875rem');
  setIf(inner, textBase, 'fontSize', '1rem');
  setIf(inner, textLg, 'fontSize', '1.125rem');
  setIf(inner, textXl, 'fontSize', '1.25rem');
  setIf(inner, text2Xl, 'fontSize', '1.5rem');
  setIf(inner, text3Xl, 'fontSize', '1.875rem');
  setIf(inner, text4Xl, 'fontSize', '2.25rem');
  setIf(inner, text5Xl, 'fontSize', '3rem');
  setIf(inner, text6Xl, 'fontSize', '4rem');
  setIf(inner, flex, 'display', 'flex');
  setIf(inner, itemsCenter, 'alignItems', 'center');
  setIf(inner, contentCenter, 'justifyContent', 'center');
  setIf(inner, contentBetween, 'justifyContent', 'space-between');
  setIf(inner, selfCenter, 'alignSelf', 'center');
  setIf(inner, justifyCenter, 'justifyContent', 'center');
  setIf(inner, inline, 'display', 'display');
  setIf(inner, block, 'display', 'block');
  setIf(inner, row, 'flexDirection', 'row');
  setIf(inner, column, 'flexDirection', 'column');
  setIf(inner, wrap, 'flexWrap', 'wrap');
  setIf(inner, shrink, 'flexShrink', lodashEs.isBoolean(shrink) ? 1 : shrink);
  setIf(inner, grow, 'flexGrow', lodashEs.isBoolean(grow) ? 1 : grow);
  setIf(inner, bold, 'fontWeight', 500);
  setIf(inner, uppercase, 'style.textTransform', 'uppercase');
  setIf(inner, regular, 'fontWeight', 'fontWeightRegular');
  setIf(inner, relative, 'position', 'relative');
  setIf(inner, absolute, 'position', 'absolute');
  setIf(inner, floatRight, 'style.float', 'right');
  setIf(inner, floatLeft, 'style.float', 'left');
  setIf(inner, cursor, 'style.cursor', 'pointer');
  setIf(inner, outline, 'style.outline', outline);
  setIf(inner, outline, 'style.outline', outline);
  assignIf(inner, pv, {
    pt: pv,
    pb: pv
  });
  assignIf(inner, mv, {
    mt: mv,
    mb: mv
  });
  assignIf(inner, ph, {
    pl: ph,
    pr: ph
  });
  assignIf(inner, mh, {
    ml: mh,
    mr: mh
  });
  return /*#__PURE__*/React__default.createElement(BaseBox, _extends({}, inner, outter), children);
}

var setIf = function setIf(data, condition, path, value, defaultV) {
  if (condition) {
    lodashEs.set(data, path, value);
  } // else {
  //     !isUndefined(defaultV) && set(data, path, defaultV)
  // }

};

var assignIf = function assignIf(data, condition, value) {
  if (condition) data = lodashEs.assign(data, value);
};

Box.defaultProps = {
  style: {},
  height: undefined,
  width: undefined
};
var index = React.memo(Box);

module.exports = index;
//# sourceMappingURL=react.ui.box.cjs.js.map
