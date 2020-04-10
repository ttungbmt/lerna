'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactBootstrap = require('react-bootstrap');
var reactHookForm = require('react-hook-form');
var lodashEs = require('lodash-es');
var $ = _interopDefault(require('jquery'));
require('dependent-dropdown');

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

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var transOpts = function transOpts(opts) {
  if (!opts) return [];
  if (lodashEs.isArray(opts)) return opts;
  return lodashEs.map(opts, function (v, k) {
    return {
      value: k,
      label: v
    };
  });
};

var useUrl = function useUrl(_ref, _ref2) {
  var setData = _ref2.setData;

  var url = _ref.url,
      depends = _ref.depends,
      ajaxSettings = _ref.ajaxSettings,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? 'Chọn...' : _ref$placeholder,
      name = _ref.name,
      path = _ref.path,
      props = _objectWithoutProperties(_ref, ["url", "depends", "ajaxSettings", "placeholder", "name", "path"]);

  var _useFormContext = reactHookForm.useFormContext(),
      control = _useFormContext.control;

  React.useEffect(function () {
    if (url) {
      if (depends) {
        var el = lodashEs.get(control, "fieldsRef.current.".concat(name, ".ref"));
        $(el).depdrop({
          depends: depends,
          url: url,
          loadingText: 'Đang tải ...',
          placeholder: placeholder,
          emptyMsg: 'Không có dữ liệu',
          ajaxSettings: ajaxSettings
        });
      } else {
        $.get(url, function (opts) {
          setData(transOpts(path ? lodashEs.get(opts, path) : opts));
        });
      }
    }
  }, []);
};

function Select(_ref3) {
  var register = _ref3.register,
      children = _ref3.children,
      options = _ref3.options,
      props = _objectWithoutProperties(_ref3, ["register", "children", "options"]);

  var _useState = React.useState(transOpts(options)),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var dropProps = lodashEs.omit(props, ['ajaxSettings']);
  useUrl(props, {
    setData: setData
  });
  React.useEffect(function () {
    setData(transOpts(options));
  }, [JSON.stringify(options)]);
  return /*#__PURE__*/React__default.createElement(reactBootstrap.Form.Control, _extends({
    as: "select",
    ref: register
  }, dropProps, {
    defaultValue: props.selected
  }), data.length > 0 && /*#__PURE__*/React__default.createElement("option", {
    value: ""
  }, props.placeholder), children, lodashEs.map(data, function (_ref4, k) {
    var value = _ref4.value,
        label = _ref4.label;
    return /*#__PURE__*/React__default.createElement("option", {
      key: k,
      value: value
    }, label);
  }));
}

var Select$1 = React.memo(Select);

// import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.vi.min.js'
// import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css'
// function useDatepicker({as, name}, ref) {
//     const {control, setValue} = useFormContext()
//
//     useEffect(() => {
//         if (as === 'datepicker') {
//             ref.current = get(control, `fields.${name}.ref`)
//             let options = {
//                     format: "dd/mm/yyyy",
//                     todayBtn: "linked",
//                     clearBtn: true,
//                     language: "vi",
//                     autoclose: true,
//                     todayHighlight: true
//                 }
//
//             $(ref.current).datepicker(options).on('changeDate', e => setValue(e.target.value))
//         }
//
//         return () => {
//             if (as === 'datepicker') $(ref.current).datepicker('destroy')
//         }
//     }, [])
//
// }

function Input(_ref) {
  var register = _ref.register,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ["register", "children"]);

  var ref = React.useRef(props); // useDatepicker(props, ref)

  return /*#__PURE__*/React__default.createElement(reactBootstrap.Form.Control, _extends({
    ref: register
  }, lodashEs.omit(props, ['as'])));
}

var Input$1 = React.memo(Input);

function Field(_ref) {
  var children = _ref.children,
      label = _ref.label,
      as = _ref.as,
      props = _objectWithoutProperties(_ref, ["children", "label", "as"]);

  var _useFormContext = reactHookForm.useFormContext(),
      register = _useFormContext.register;

  var Control = function Control() {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null);
  };

  switch (as) {
    case 'select':
      Control = Select$1;
      break;

    case 'datepicker':
    case 'input':
      Control = Input$1;
      break;

    default:
      Control = Input$1;
      break;
  }

  return /*#__PURE__*/React__default.createElement(reactBootstrap.Form.Group, null, /*#__PURE__*/React__default.createElement(reactBootstrap.Form.Label, null, label), /*#__PURE__*/React__default.createElement(Control, _extends({
    register: register
  }, props, {
    as: as
  }), children));
}

var Field$1 = React.memo(Field);

Object.defineProperty(exports, 'Form', {
  enumerable: true,
  get: function () {
    return reactBootstrap.Form;
  }
});
Object.defineProperty(exports, 'FormContext', {
  enumerable: true,
  get: function () {
    return reactHookForm.FormContext;
  }
});
Object.defineProperty(exports, 'useForm', {
  enumerable: true,
  get: function () {
    return reactHookForm.useForm;
  }
});
exports.Field = Field$1;
//# sourceMappingURL=react.form.cjs.js.map
