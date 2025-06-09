import _ from "lodash";

// get element by selector
export const getElems = (selector) => {
    return document.querySelectorAll(selector);
  };

// set attribute value
export const setAttr = function (elems, object) {
    let _newElem = elems;
    if (_.isString(_newElem)) {
      _newElem = getElems(elems);
    }
    _.forEach(_newElem, function (elem) {
      elem.setAttribute(object.prop, object.value);
    });
  };

  export const updateHtmlAttr = (value) => {
    // set direction
    setAttr("html", value);
  };

//   storage
export const updateStorage = (storage, key, value) => {
if (typeof value !== typeof undefined && typeof key !== typeof undefined) {
    sessionStorage.setItem(key, JSON.stringify(value));
}
};

export const updateDomValueBySetting = (setting) => {
    updateHtmlAttr({ prop: "dir", value: setting.theme_scheme_direction.value });
};

export const getStorage = (key) => {
  if (
    localStorage.getItem(key) === "none" ||
    sessionStorage.getItem(key) === "none"
  )
    return "none";
  if (
    (localStorage.getItem(key) !== null && localStorage.getItem(key) !== "") ||
    (sessionStorage.getItem(key) !== null && sessionStorage.getItem(key) !== "")
  ) {
    let value = localStorage.getItem(key);
    if (value === null) value = sessionStorage.getItem(key);
    if (value !== null) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
  }
  return null;
};