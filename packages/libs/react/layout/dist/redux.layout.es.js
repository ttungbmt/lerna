import React, { memo } from 'react';
import { ViewPort, Top, Fill, LeftResizable, RightResizable, BottomResizable } from 'react-spaces';
import { Slot } from 'react-slot';
import { get } from 'lodash-es';
import Box from '@ttungbmt/react.ui.box';

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
var LayoutMap = memo(function (_ref) {
  var children = _ref.children,
      config = _ref.config;
  var bg_url = get(config, 'header.self.background');
  return /*#__PURE__*/React.createElement(ViewPort, {
    className: "layout-map"
  }, /*#__PURE__*/React.createElement(Top, {
    as: "header",
    size: 55,
    style: {
      background: "url(".concat(bg_url, ")")
    }
  }, /*#__PURE__*/React.createElement(Slot, {
    name: "header",
    as: "header",
    content: children
  })), /*#__PURE__*/React.createElement(Fill, {
    as: "main"
  }, /*#__PURE__*/React.createElement(Slot, {
    content: children
  }, /*#__PURE__*/React.createElement(LeftResizable, {
    as: "aside",
    size: 380
  }, /*#__PURE__*/React.createElement(Slot, {
    name: "left-sidebar",
    content: children
  })), /*#__PURE__*/React.createElement(Fill, null, /*#__PURE__*/React.createElement(Top, {
    size: 0
  }, /*#__PURE__*/React.createElement(Slot, {
    name: "map-toolbar",
    content: children
  })), /*#__PURE__*/React.createElement(Fill, null, /*#__PURE__*/React.createElement(Slot, {
    name: "map-content",
    content: children
  }))), /*#__PURE__*/React.createElement(RightResizable, {
    as: "aside",
    size: 0
  }, /*#__PURE__*/React.createElement(Slot, {
    name: "right-sidebar",
    content: children
  })))), /*#__PURE__*/React.createElement(BottomResizable, {
    as: "footer",
    size: 0
  }, /*#__PURE__*/React.createElement(Slot, {
    name: "footer",
    content: children
  })));
});

function Brand(_ref2) {
  var logo = _ref2.logo,
      title = _ref2.title;
  return /*#__PURE__*/React.createElement(Box, {
    flex: true,
    height: 1,
    itemsCenter: true
  }, logo && /*#__PURE__*/React.createElement(Box, {
    mh: 1
  }, /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "",
    style: {
      height: 30
    }
  })), /*#__PURE__*/React.createElement(Box, {
    ml: 2,
    uppercase: true,
    color: "#0093dd",
    fontSize: 21,
    fontWeight: 700
  }, title));
}

LayoutMap.defaultProps = defaultProps;
LayoutMap.Brand = memo(Brand);

function LayoutDefault(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement(ViewPort, {
    className: "layout-default"
  }, /*#__PURE__*/React.createElement(Top, {
    as: "header",
    size: 55
  }, /*#__PURE__*/React.createElement(Slot, {
    name: "header",
    as: "header",
    content: children
  })), /*#__PURE__*/React.createElement(Fill, {
    as: "main"
  }, /*#__PURE__*/React.createElement(Slot, {
    content: children
  })), /*#__PURE__*/React.createElement(BottomResizable, {
    as: "footer",
    size: 100
  }, /*#__PURE__*/React.createElement(Slot, {
    name: "footer",
    content: children
  })));
}

LayoutDefault.config = {
  hello: '123'
};
var index = memo(LayoutDefault);

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Default: index,
    Map: LayoutMap
});

export { index$1 as Layout };
//# sourceMappingURL=redux.layout.es.js.map
