module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomFromSeed = __webpack_require__(13);

var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
var alphabet;
var previousSeed;

var shuffled;

function reset() {
    shuffled = false;
}

function setCharacters(_alphabet_) {
    if (!_alphabet_) {
        if (alphabet !== ORIGINAL) {
            alphabet = ORIGINAL;
            reset();
        }
        return;
    }

    if (_alphabet_ === alphabet) {
        return;
    }

    if (_alphabet_.length !== ORIGINAL.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
    }

    var unique = _alphabet_.split('').filter(function(item, ind, arr){
       return ind !== arr.lastIndexOf(item);
    });

    if (unique.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
    }

    alphabet = _alphabet_;
    reset();
}

function characters(_alphabet_) {
    setCharacters(_alphabet_);
    return alphabet;
}

function setSeed(seed) {
    randomFromSeed.seed(seed);
    if (previousSeed !== seed) {
        reset();
        previousSeed = seed;
    }
}

function shuffle() {
    if (!alphabet) {
        setCharacters(ORIGINAL);
    }

    var sourceArray = alphabet.split('');
    var targetArray = [];
    var r = randomFromSeed.nextValue();
    var characterIndex;

    while (sourceArray.length > 0) {
        r = randomFromSeed.nextValue();
        characterIndex = Math.floor(r * sourceArray.length);
        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
    }
    return targetArray.join('');
}

function getShuffled() {
    if (shuffled) {
        return shuffled;
    }
    shuffled = shuffle();
    return shuffled;
}

/**
 * lookup shuffled letter
 * @param index
 * @returns {string}
 */
function lookup(index) {
    var alphabetShuffled = getShuffled();
    return alphabetShuffled[index];
}

module.exports = {
    characters: characters,
    seed: setSeed,
    lookup: lookup,
    shuffled: getShuffled
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var initialState = {
  x: 0,
  y: 0,
  isDragging: false,
  startingX: 0,
  startingy: 0,
  currentlyDraggingId: null,
  currentlyHoveredDroppableId: null,
  data: null,
  type: null
};

var store = function () {
  function store() {
    _classCallCheck(this, store);

    this.state = initialState;
    this.onUpdate = {};
  }

  _createClass(store, [{
    key: "update",
    value: function update(payload) {
      var _this = this;

      this.state = _extends({}, this.state, payload);
      Object.keys(this.onUpdate).forEach(function (funcId) {
        if (_this.onUpdate[funcId]) {
          _this.onUpdate[funcId]();
        }
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe(id, func) {
      var _this2 = this;

      this.onUpdate = _extends({}, this.onUpdate, _defineProperty({}, id, func));
      return function () {
        _this2.unsubscribe(id);
      };
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(id) {
      var _onUpdate = this.onUpdate,
          deleted = _onUpdate[id],
          remainder = _objectWithoutProperties(_onUpdate, [id]);

      this.onUpdate = remainder;
    }
  }, {
    key: "getState",
    value: function getState() {
      return _extends({}, this.state);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.update(initialState);
    }
  }]);

  return store;
}();

var dndStore = new store();

exports.default = dndStore;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(10);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var randomByte = __webpack_require__(12);

function encode(lookup, number) {
    var loopCounter = 0;
    var done;

    var str = '';

    while (!done) {
        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
        done = number < (Math.pow(16, loopCounter + 1 ) );
        loopCounter++;
    }
    return str;
}

module.exports = encode;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _store = __webpack_require__(1);

var _store2 = _interopRequireDefault(_store);

var _shortid = __webpack_require__(2);

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DragComponent = function (_React$Component) {
	_inherits(DragComponent, _React$Component);

	function DragComponent() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, DragComponent);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DragComponent.__proto__ || Object.getPrototypeOf(DragComponent)).call.apply(_ref, [this].concat(args))), _this), _this.dragId = _shortid2.default.generate(), _this.componentDidMount = function () {
			_this.unsubscribe = _store2.default.subscribe(_this.dragId, function () {
				_this.forceUpdate();
			});
		}, _this.componentWillUnmount = function () {
			_this.unsubscribe();
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(DragComponent, [{
		key: 'render',
		value: function render() {
			var state = _store2.default.getState();
			return state.isDragging && state.currentlyDraggingId === this.props.for && this.props.children(_extends({}, state, {
				isOverAccepted: Array.isArray(this.currentlyHoveredDroppableAccepts) ? this.currentlyHoveredDroppableAccepts.find(state.type) : state.type === this.currentlyHoveredDroppableAccepts
			}));
		}
	}]);

	return DragComponent;
}(_react2.default.Component);

DragComponent.defaultProps = {
	for: ''
};
exports.default = DragComponent;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _store = __webpack_require__(1);

var _store2 = _interopRequireDefault(_store);

var _shortid = __webpack_require__(2);

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Draggable = function (_React$Component) {
  _inherits(Draggable, _React$Component);

  function Draggable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Draggable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call.apply(_ref, [this].concat(args))), _this), _this.dragId = _shortid2.default.generate(), _this.componentDidMount = function () {
      _this.unsubscribe = _store2.default.subscribe(_this.dragId, function () {
        _this.forceUpdate();
      });
    }, _this.componentWillUnmount = function () {
      _this.unsubscribe();
    }, _this.startDrag = function (e) {
      _this.props.onDragStart(_store2.default.getState().data);
      _store2.default.update({
        isDragging: true,
        startingX: e.clientX,
        startingY: e.clientY,
        x: e.clientX,
        y: e.clientY,
        currentlyDraggingId: _this.props.id || _this.dragId,
        data: _this.props.data,
        type: _this.props.type
      });
      window.addEventListener('mouseup', _this.stopDrag);
      window.addEventListener('mousemove', _this.updateCoordinates);
    }, _this.startMobileDrag = function (e) {
      _this.props.onDragStart(_store2.default.getState().data);
      var touch = e.touches[0];
      _store2.default.update({
        isDragging: true,
        startingX: touch.clientX,
        startingY: touch.clientY,
        x: touch.clientX,
        y: touch.clientY,
        currentlyDraggingId: _this.props.id || _this.dragId,
        data: _this.props.data,
        type: _this.props.type
      });
      window.addEventListener('touchend', _this.stopDrag);
      window.addEventListener('touchmove', _this.updateMobileCoordinates);
    }, _this.stopDrag = function (e) {
      _this.props.onDragEnd(_store2.default.getState().data);
      _store2.default.reset();
      window.removeEventListener('mouseup', _this.stopDrag);
      window.removeEventListener('mousemove', _this.updateCoordinates);
      window.removeEventListener('touchend', _this.stopDrag);
      window.removeEventListener('touchmove', _this.updateMobileCoordinates);
    }, _this.updateCoordinates = function (e) {
      _store2.default.update({
        x: e.clientX,
        y: e.clientY
      });
    }, _this.updateMobileCoordinates = function (e) {
      var touch = e.touches[0];
      _store2.default.update({
        x: touch.clientX,
        y: touch.clientY
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Draggable, [{
    key: 'render',
    value: function render() {
      var state = _store2.default.getState();
      return this.props.children(_extends({}, state, {
        events: {
          onMouseDown: this.startDrag,
          onTouchStart: this.startMobileDrag
        }
      }));
    }
  }]);

  return Draggable;
}(_react2.default.Component);

Draggable.defaultProps = {
  onDragEnd: function onDragEnd() {},
  onDragStart: function onDragStart() {},
  data: null,
  type: null
};
exports.default = Draggable;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _store = __webpack_require__(1);

var _store2 = _interopRequireDefault(_store);

var _shortid = __webpack_require__(2);

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Droppable = function (_React$Component) {
	_inherits(Droppable, _React$Component);

	function Droppable() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Droppable);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Droppable.__proto__ || Object.getPrototypeOf(Droppable)).call.apply(_ref, [this].concat(args))), _this), _this.dragId = _shortid2.default.generate(), _this.componentDidMount = function () {
			_this.unsubscribe = _store2.default.subscribe(_this.dragId, function () {
				_this.forceUpdate();
			});
		}, _this.componentWillUnmount = function () {
			_this.unsubscribe();
		}, _this.setOver = function () {
			if (_store2.default.getState().isDragging) {
				_store2.default.update({
					currentlyHoveredDroppableId: _this.dragId,
					currentlyHoveredDroppableAccepts: _this.accepts
				});
			}
		}, _this.setOut = function () {
			if (_store2.default.getState().isDragging) {
				_store2.default.update({
					currentlyHoveredDroppableId: null,
					currentlyHoveredDroppableAccepts: null
				});
			}
		}, _this.onDrop = function () {
			var _store$getState = _store2.default.getState(),
			    data = _store$getState.data,
			    type = _store$getState.type,
			    isDragging = _store$getState.isDragging;

			if (isDragging) {
				if (Array.isArray(_this.props.accepts)) {
					if (_this.props.accepts.includes(type)) {
						_this.props.onDrop(data);
					}
				} else {
					if (type === _this.props.accepts) {
						_this.props.onDrop(data);
					}
				}
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Droppable, [{
		key: 'render',
		value: function render() {
			var state = _store2.default.getState();
			return this.props.children(_extends({}, state, {
				isOver: state.currentlyHoveredDroppableId === this.dragId,
				events: {
					onMouseEnter: this.setOver,
					onMouseLeave: this.setOut,
					onMouseUp: this.onDrop
				}
			}));
		}
	}]);

	return Droppable;
}(_react2.default.Component);

Droppable.defaultProps = {
	onDrop: function onDrop() {},
	accepts: null
};
exports.default = Droppable;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var encode = __webpack_require__(4);
var alphabet = __webpack_require__(0);

// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
// This number should be updated every year or so to keep the generated id short.
// To regenerate `new Date() - 0` and bump the version. Always bump the version!
var REDUCE_TIME = 1459707606518;

// don't change unless we change the algos or REDUCE_TIME
// must be an integer and less than 16
var version = 6;

// Counter is used when shortid is called multiple times in one second.
var counter;

// Remember the last time shortid was called in case counter is needed.
var previousSeconds;

/**
 * Generate unique id
 * Returns string id
 */
function build(clusterWorkerId) {

    var str = '';

    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

    if (seconds === previousSeconds) {
        counter++;
    } else {
        counter = 0;
        previousSeconds = seconds;
    }

    str = str + encode(alphabet.lookup, version);
    str = str + encode(alphabet.lookup, clusterWorkerId);
    if (counter > 0) {
        str = str + encode(alphabet.lookup, counter);
    }
    str = str + encode(alphabet.lookup, seconds);

    return str;
}

module.exports = build;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(0);

/**
 * Decode the id to get the version and worker
 * Mainly for debugging and testing.
 * @param id - the shortid-generated id.
 */
function decode(id) {
    var characters = alphabet.shuffled();
    return {
        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
    };
}

module.exports = decode;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = __webpack_require__(0);
var encode = __webpack_require__(4);
var decode = __webpack_require__(9);
var build = __webpack_require__(8);
var isValid = __webpack_require__(11);

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = __webpack_require__(14) || 0;

/**
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/**
 * Set the cluster worker or machine id
 * exposed as shortid.worker(int)
 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
 * returns shortid module so it can be chained.
 */
function worker(workerId) {
    clusterWorkerId = workerId;
    return module.exports;
}

/**
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}

/**
 * Generate unique id
 * Returns string id
 */
function generate() {
  return build(clusterWorkerId);
}

// Export all other functions as properties of the generate function
module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.decode = decode;
module.exports.isValid = isValid;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(0);

function isShortId(id) {
    if (!id || typeof id !== 'string' || id.length < 6 ) {
        return false;
    }

    var characters = alphabet.characters();
    var len = id.length;
    for(var i = 0; i < len;i++) {
        if (characters.indexOf(id[i]) === -1) {
            return false;
        }
    }
    return true;
}

module.exports = isShortId;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

function randomByte() {
    if (!crypto || !crypto.getRandomValues) {
        return Math.floor(Math.random() * 256) & 0x30;
    }
    var dest = new Uint8Array(1);
    crypto.getRandomValues(dest);
    return dest[0] & 0x30;
}

module.exports = randomByte;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Found this seed-based random generator somewhere
// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

var seed = 1;

/**
 * return a random number based on a seed
 * @param seed
 * @returns {number}
 */
function getNextValue() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed/(233280.0);
}

function setSeed(_seed_) {
    seed = _seed_;
}

module.exports = {
    nextValue: getNextValue,
    seed: setSeed
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 0;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Droppable = exports.Draggable = exports.DragComponent = undefined;

var _DragComponent = __webpack_require__(5);

var _DragComponent2 = _interopRequireDefault(_DragComponent);

var _Draggable = __webpack_require__(6);

var _Draggable2 = _interopRequireDefault(_Draggable);

var _Droppable = __webpack_require__(7);

var _Droppable2 = _interopRequireDefault(_Droppable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DragComponent = exports.DragComponent = _DragComponent2.default;
var Draggable = exports.Draggable = _Draggable2.default;
var Droppable = exports.Droppable = _Droppable2.default;

/***/ })
/******/ ]);