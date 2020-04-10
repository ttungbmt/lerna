'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var Space = require('react-spaces');
var reactSlot = require('react-slot');
var lodashEs = require('lodash-es');
var Box = _interopDefault(require('@ttungbmt/react.ui.box'));

var PUBLIC_URL = process.env.PUBLIC_URL;
var config = {
  title: 'Layout Map',
  self: {
    appName: 'Name',
    logo: ''
  },
  header: {
    self: {
      background: PUBLIC_URL + '/assets/images/bg_header.png'
    },
    menu: {}
  },
  aside: {},
  footer: {
    self: {}
  }
};

var defaultProps = {
  config: config
};
var LayoutMap = React.memo(function (_ref) {
  var children = _ref.children,
      config = _ref.config;
  var bg_url = lodashEs.get(config, 'header.self.background');
  return /*#__PURE__*/React__default.createElement(Space.ViewPort, {
    className: "layout-map"
  }, /*#__PURE__*/React__default.createElement(Space.Top, {
    as: "header",
    size: 55,
    style: {
      background: "url(".concat(bg_url, ")")
    }
  }, /*#__PURE__*/React__default.createElement(reactSlot.Slot, {
    name: "header",
    as: "header",
    content: children
  })), /*#__PURE__*/React__default.createElement(Space.Fill, {
    as: "main"
  }, /*#__PURE__*/React__default.createElement(reactSlot.Slot, {
    content: children
  }, /*#__PURE__*/React__default.createElement(Space.LeftResizable, {
    as: "aside",
    size: 380
  }, /*#__PURE__*/React__default.createElement(reactSlot.Slot, {
    name: "left-sidebar",
    content: children
  })), /*#__PURE__*/React__default.createElement(Space.Fill, null, /*#__PURE__*/React__default.createElement(Space.Top, {
    size: 0
  }, /*#__PURE__*/React__default.createElement(reactSlot.Slot, {
    name: "map-toolbar",
    content: children
  })), /*#__PURE__*/React__default.createElement(Space.Fill, null, /*#__PURE__*/React__default.createElement(reactSlot.Slot, {
    name: "map-content",
    content: children
  }))), /*#__PURE__*/React__default.createElement(Space.RightResizable, {
    as: "aside",
    size: 0
  }, /*#__PURE__*/React__default.createElement(reactSlot.Slot, {
    name: "right-sidebar",
    content: children
  })))), /*#__PURE__*/React__default.createElement(Space.BottomResizable, {
    as: "footer",
    size: 0
  }, /*#__PURE__*/React__default.createElement(reactSlot.Slot, {
    name: "footer",
    content: children
  })));
});

function Brand(_ref2) {
  var logo = _ref2.logo,
      title = _ref2.title;
  return /*#__PURE__*/React__default.createElement(Box, {
    flex: true,
    height: 1,
    itemsCenter: true
  }, logo && /*#__PURE__*/React__default.createElement(Box, {
    mh: 1
  }, /*#__PURE__*/React__default.createElement("img", {
    src: logo,
    alt: "",
    style: {
      height: 30
    }
  })), /*#__PURE__*/React__default.createElement(Box, {
    uppercase: true,
    color: "#0093dd",
    fontSize: 21,
    fontWeight: 700
  }, title));
}

LayoutMap.defaultProps = defaultProps;
LayoutMap.Brand = React.memo(Brand);

function LayoutDefault(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React__default.createElement(Space.ViewPort, {
    className: "layout-default"
  }, /*#__PURE__*/React__default.createElement(Space.Top, {
    as: "header",
    size: 55
  }, /*#__PURE__*/React__default.createElement(reactSlot.Slot, {
    name: "header",
    as: "header",
    content: children
  })), /*#__PURE__*/React__default.createElement(Space.Fill, {
    as: "main"
  }, /*#__PURE__*/React__default.createElement(reactSlot.Slot, {
    content: children
  })), /*#__PURE__*/React__default.createElement(Space.BottomResizable, {
    as: "footer",
    size: 100
  }, /*#__PURE__*/React__default.createElement(reactSlot.Slot, {
    name: "footer",
    content: children
  })));
}

LayoutDefault.config = {
  hello: '123'
};
var index = React.memo(LayoutDefault);

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Default: index,
    Map: LayoutMap
});

exports.Layout = index$1;
//# sourceMappingURL=redux.layout.cjs.js.map
