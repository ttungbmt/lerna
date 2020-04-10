import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import marker from 'leaflet/dist/images/marker-icon.png';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import React, { memo } from 'react';
import { map, isEqual } from 'lodash-es';
import { LayersControl, Map, TileLayer, withLeaflet, GridLayer } from 'react-leaflet';
export { Popup, useLeaflet } from 'react-leaflet';
import { tileWMSLayer } from '@ttungbmt/leaflet.wms';
import PropTypes from 'prop-types';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker,
  shadowUrl: markerShadow
});

var layers = {
  google: {
    "control": "basemap",
    "title": "Google",
    "active": true,
    "type": "tile",
    "options": {
      "url": "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      "subdomains": ["mt0", "mt1", "mt2", "mt3"],
      "attribution": "Map data &copy; <a href='https://www.google.com/maps'>Google Maps</a>"
    }
  },
  openstreet: {
    "control": "basemap",
    "title": "OpenStreetMap",
    "type": "tile",
    "options": {
      "url": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      "attribution": "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
    }
  },
  terrain: {
    "control": "basemap",
    "title": "Địa hình",
    "type": "tile",
    "options": {
      "url": "http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
      "subdomains": ["mt0", "mt1", "mt2", "mt3"],
      "attribution": "Map data &copy; <a href='https://www.google.com/maps'>Google Maps</a>"
    }
  },
  hybrid: {
    "control": "basemap",
    "title": "Tổng hợp",
    "type": "tile",
    "options": {
      "url": "http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
      "subdomains": ["mt0", "mt1", "mt2", "mt3"],
      "attribution": "Map data &copy; <a href='https://www.google.com/maps'>Google Maps</a>"
    }
  }
};

var BaseLayer = LayersControl.BaseLayer,
    Overlay = LayersControl.Overlay;

function MapContainer(_ref) {
  var children = _ref.children,
      loaded = _ref.loaded;
  var position = [16.3109371, 103.8910913];
  if (!loaded) return null;
  return /*#__PURE__*/React.createElement(Map, {
    center: position,
    zoom: 6,
    style: {
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(LayersControl, {
    position: "topright"
  }, map(layers, function (_ref2, k) {
    var title = _ref2.title,
        _ref2$active = _ref2.active,
        active = _ref2$active === void 0 ? false : _ref2$active,
        options = _ref2.options;
    return /*#__PURE__*/React.createElement(BaseLayer, {
      key: k,
      checked: active,
      name: title
    }, /*#__PURE__*/React.createElement(TileLayer, options));
  })), children);
}

MapContainer.defaultProps = {
  loaded: true
};
var MapContainer$1 = memo(MapContainer);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
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

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

var EVENTS_RE = /^on(.+)$/i;

var WMSTileLayer = /*#__PURE__*/function (_GridLayer) {
  _inherits(WMSTileLayer, _GridLayer);

  var _super = _createSuper(WMSTileLayer);

  function WMSTileLayer() {
    _classCallCheck(this, WMSTileLayer);

    return _super.apply(this, arguments);
  }

  _createClass(WMSTileLayer, [{
    key: "createLeafletElement",
    value: function createLeafletElement(props) {
      var url = props.url,
          boundary = props.boundary,
          params = _objectWithoutProperties(props, ["url", "boundary"]);

      var _this$getOptions = this.getOptions(params),
          _l = _this$getOptions.leaflet,
          options = _objectWithoutProperties(_this$getOptions, ["leaflet"]);

      return tileWMSLayer(url, options);
    }
  }, {
    key: "updateLeafletElement",
    value: function updateLeafletElement(fromProps, toProps) {
      _get(_getPrototypeOf(WMSTileLayer.prototype), "updateLeafletElement", this).call(this, fromProps, toProps);

      var preUuid = fromProps.uuid,
          prevUrl = fromProps.url,
          _po = fromProps.opacity,
          _pz = fromProps.zIndex,
          prevProps = _objectWithoutProperties(fromProps, ["uuid", "url", "opacity", "zIndex"]);

      var _this$getOptions2 = this.getOptions(prevProps),
          _pl = _this$getOptions2.leaflet,
          prevParams = _objectWithoutProperties(_this$getOptions2, ["leaflet"]);

      var uuid = toProps.uuid,
          url = toProps.url,
          _o = toProps.opacity,
          _z = toProps.zIndex,
          props = _objectWithoutProperties(toProps, ["uuid", "url", "opacity", "zIndex"]);

      var _this$getOptions3 = this.getOptions(props),
          _l = _this$getOptions3.leaflet,
          params = _objectWithoutProperties(_this$getOptions3, ["leaflet"]);

      if (uuid !== preUuid) {
        this.leafletElement.uuid = uuid;
      }

      if (url !== prevUrl) {
        this.leafletElement.setUrl(url);
      }

      if (!isEqual(params, prevParams)) {
        this.leafletElement.setParams(params);
      }
    }
  }, {
    key: "getOptions",
    value: function getOptions(params) {
      var superOptions = _get(_getPrototypeOf(WMSTileLayer.prototype), "getOptions", this).call(this, params);

      return Object.keys(superOptions).reduce(function (options, key) {
        if (!EVENTS_RE.test(key)) {
          options[key] = superOptions[key];
        }

        return options;
      }, {});
    }
  }]);

  return WMSTileLayer;
}(GridLayer);

WMSTileLayer.propTypes = {
  layers: PropTypes.string.isRequired
};
var WMSTileLayer$1 = withLeaflet(WMSTileLayer);

export { MapContainer$1 as MapContainer, WMSTileLayer$1 as WMSTileLayer, layers as baselayers };
//# sourceMappingURL=redux-leaflet.es.js.map
