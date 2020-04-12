export { default as uniqid } from 'uniqid';
import { get, isUndefined, set } from 'lodash-es';

function parseJSON(json) {
  var reviver = function reviver(key, value) {
    if (value && typeof value === "string") {
      var regrex1 = /^\s*function\s*[\d\w]*\s*\([\d\w,\s]*[^,]\)\s*{[\s\S]*}\s*;?\s*/,
          // function(){};
      regrex2 = /^\s*\([a-zA-Z0-1,\s]*[^,]\)\s*(=>)\s*{[\s\S]*}\s*;?\s*$/,
          // () => {};
      regrex3 = /^\s*```js([\s\S]*)```\s*$/; // ```js new Object() ```

      if (regrex1.test(value) || regrex2.test(value)) {
        // let startBody = value.indexOf('{') + 1;
        // let endBody = value.lastIndexOf('}');
        // let startArgs = value.indexOf('(') + 1;
        // let endArgs = value.indexOf(')');
        // return new Function(value.substring(startArgs, endArgs), value.substring(startBody, endBody));
        try {
          return new Function("return ".concat(value))();
        } catch (err) {
          console.error("Error string function in JSON: ".concat(value));
        }
      } else if (regrex3.test(value)) {
        try {
          var jsStr = regrex3.exec(value),
              js = eval(get(jsStr, 1));
          return isUndefined(js) ? null : js;
        } catch (err) {
          console.error("Error JS in JSON: ".concat(value, " \n"), err);
        }
      }
    }

    return value;
  };

  return JSON.parse(json, reviver);
}

function setIf(data, condition, path, value) {
  if (condition) set(data, path, value);
}

function setIfElse(data, condition, v1, v2) {
  if (condition) {
    set(data, path, v1);
  } else {
    set(data, path, v2);
  }
}

export { parseJSON, setIf, setIfElse };
//# sourceMappingURL=utils.es.js.map
