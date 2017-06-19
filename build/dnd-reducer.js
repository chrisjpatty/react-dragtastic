"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = require("redux");

var initialState = {
  dragData: null,
  dragging: null
};

var dndReducer = function dndReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case "SET_DRAG":
      return _extends({}, state, { dragging: action.dragging, dragData: action.dragData });
    default:
      return state;
  }
};

exports.default = (0, _redux.createStore)(dndReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());