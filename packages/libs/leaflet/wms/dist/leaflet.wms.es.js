import L, { TileLayer } from 'leaflet';
import 'leaflet.nontiledlayer';
import { getFeatureInfoUrl } from '@ttungbmt/geo';
import uniqid from 'uniqid';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
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

var getOptions = function getOptions(_ref) {
  var uuid = _ref.uuid,
      options = _objectWithoutProperties(_ref, ["uuid"]);

  return _objectSpread2({
    format: 'image/png',
    transparent: true
  }, options);
};

var TileWMSLayer = TileLayer.WMS.extend({
  initialize: function initialize(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    TileLayer.WMS.prototype.initialize.call(this, url, this.getOptions(options));
    this.uuid = options.uuid ? options.uuid : uniqid();
  },
  getOptions: getOptions,
  getFeatureInfoUrl: function getFeatureInfoUrl$1(latlng, params) {
    return getFeatureInfoUrl(this, latlng, params);
  }
});
var SingleTileWMSLayer = L.NonTiledLayer.WMS.extend({
  initialize: function initialize(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    L.NonTiledLayer.WMS.prototype.initialize.call(this, url, this.getOptions(options));
    this.uuid = options.uuid ? options.uuid : uniqid();
  },
  getOptions: getOptions,
  getFeatureInfoUrl: function getFeatureInfoUrl$1(latlng, params) {
    return getFeatureInfoUrl(this, latlng, params);
  }
});
L.tileWMSLayer = tileWMSLayer;
function tileWMSLayer(url, _ref2) {
  var tiled = _ref2.tiled,
      options = _objectWithoutProperties(_ref2, ["tiled"]);

  return tiled ? new SingleTileWMSLayer(url, options) : new TileWMSLayer(url, options);
}

export { tileWMSLayer };
//# sourceMappingURL=leaflet.wms.es.js.map
