'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Droppable = exports.Draggable = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _reactPortal = require('react-portal');

var _reactPortal2 = _interopRequireDefault(_reactPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var storeClass = function () {
  function storeClass() {
    _classCallCheck(this, storeClass);

    this.state = {
      data: null,
      dragging: null,
      type: null
    };
    this.onUpdate = {};
  }

  _createClass(storeClass, [{
    key: 'update',
    value: function update(payload) {
      var _this = this;

      this.state = _extends({}, this.state, payload);
      console.log(this.state);
      Object.keys(this.onUpdate).map(function (funcId) {
        _this.onUpdate[funcId]();
      });
    }
  }, {
    key: 'subscribe',
    value: function subscribe(id, func) {
      var _this2 = this;

      this.onUpdate = _extends({}, this.onUpdate, _defineProperty({}, id, func));
      return function () {
        _this2.unsubscribe(id);
      };
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(id) {
      var _onUpdate = this.onUpdate,
          deleted = _onUpdate[id],
          remainder = _objectWithoutProperties(_onUpdate, [id]);

      this.onUpdate = remainder;
    }
  }, {
    key: 'getState',
    value: function getState() {
      return _extends({}, this.state);
    }
  }]);

  return storeClass;
}();

var store = new storeClass();

var Draggable = exports.Draggable = function (_Component) {
  _inherits(Draggable, _Component);

  function Draggable() {
    _classCallCheck(this, Draggable);

    var _this3 = _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this));

    _this3.componentDidMount = function () {
      console.log(_this3.dragId);
      _this3.unsubscribe = store.subscribe(_this3.dragId, function () {
        _this3.forceUpdate();
      });
    };

    _this3.componentWillUnmount = function () {
      _this3.unsubscribe();
    };

    _this3.startDragDelay = function (e) {
      var x = void 0;var y = void 0;
      if ('ontouchstart' in window && e.touches) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        e.preventDefault();
        x = e.clientX;
        y = e.clientY;
      }
      _this3.setState({ startCoordinate: { x: x, y: y } });
      document.addEventListener("mouseup", _this3.endDragDelay);
      document.addEventListener("mousemove", _this3.checkDragDelay);
      document.addEventListener("touchend", _this3.endDragDelay);
      document.addEventListener("touchmove", _this3.checkDragDelay);
    };

    _this3.checkDragDelay = function (e) {
      var x = void 0;var y = void 0;
      if ('ontouchstart' in window && e.touches) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        e.preventDefault();
        x = e.clientX;
        y = e.clientY;
      }
      var a = Math.abs(_this3.state.startCoordinate.x - x);
      var b = Math.abs(_this3.state.startCoordinate.y - y);
      var distance = Math.round(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
      var dragDistance = _this3.props.dragDistance ? _this3.props.dragDistance : 8;
      if (distance >= dragDistance) {
        _this3.onDragStart();
      }
    };

    _this3.endDragDelay = function () {
      document.removeEventListener("mouseup", _this3.endDragDelay);
      document.removeEventListener("mousemove", _this3.checkDragDelay);
      document.removeEventListener("touchend", _this3.endDragDelay);
      document.removeEventListener("touchmove", _this3.checkDragDelay);
      _this3.setState({ startCoordinate: null });
    };

    _this3.onDragStart = function () {
      document.removeEventListener("mousemove", _this3.checkDragDelay);
      document.removeEventListener("mouseup", _this3.endDragDelay);
      document.removeEventListener("touchend", _this3.endDragDelay);
      document.removeEventListener("touchmove", _this3.checkDragDelay);
      var draggable = _this3.refs.draggable;
      var offset = draggable.getBoundingClientRect();
      var x = _this3.state.startCoordinate.x;
      var y = _this3.state.startCoordinate.y;
      var initialDimensions = { width: offset.width, height: offset.height };
      _this3.setState({
        startCoordinate: null,
        initialDimensions: initialDimensions,
        draggablePosition: { x: x - (x - offset.left), y: y - (y - offset.top) },
        positionInDraggable: { x: x - offset.left, y: y - offset.top }
      });
      store.update({
        dragging: _this3.dragId,
        data: _this3.props.data,
        type: _this3.props.type
      });
      document.addEventListener("mouseup", _this3.endDrag);
      document.addEventListener("mousemove", _this3.drag);
      document.addEventListener("touchend", _this3.endDrag);
      document.addEventListener("touchmove", _this3.drag);
      if (_this3.props.onDragStart) {
        _this3.props.onDragStart();
      }
    };

    _this3.endDrag = function (e) {
      e.preventDefault();

      var _store$getState = store.getState(),
          data = _store$getState.data;

      store.update({
        dragging: null,
        data: null,
        type: null
      });
      document.removeEventListener("mouseup", _this3.endDrag);
      document.removeEventListener("mousemove", _this3.drag);
      document.removeEventListener("touchend", _this3.endDrag);
      document.removeEventListener("touchmove", _this3.drag);
      if (_this3.props.onDragEnd) {
        _this3.props.onDragEnd(data);
      }
    };

    _this3.drag = function (e) {
      var x = void 0;var y = void 0;
      if ('ontouchstart' in window && e.touches) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        e.preventDefault();
        x = e.clientX;
        y = e.clientY;
      }
      //console.log("drag", x, y)
      _this3.setState({
        draggablePosition: {
          x: x - _this3.state.positionInDraggable.x,
          y: y - _this3.state.positionInDraggable.y
        }
      });
      if (_this3.props.onDrag) {
        _this3.props.onDrag({
          element: { x: x - _this3.state.positionInDraggable.x, y: y - _this3.state.positionInDraggable.y },
          mouse: { x: x, y: y }
        });
      }
    };

    _this3.state = {
      initialDimensions: { width: "", height: "" },
      draggablePosition: { x: "", y: "" },
      positionInDraggable: { x: "", y: "" },
      startCoordinate: null
    };
    _this3.dragId = _shortid2.default.generate();
    return _this3;
  }

  _createClass(Draggable, [{
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _store$getState2 = store.getState(),
          dragging = _store$getState2.dragging;

      var isDragging = dragging === this.dragId;
      var _props = this.props,
          children = _props.children,
          _props$className = _props.className,
          className = _props$className === undefined ? "" : _props$className,
          _props$draggingClassN = _props.draggingClassName,
          draggingClassName = _props$draggingClassN === undefined ? "" : _props$draggingClassN,
          _props$placeholder = _props.placeholder,
          placeholder = _props$placeholder === undefined ? true : _props$placeholder,
          _props$dragStyle = _props.dragStyle,
          dragStyle = _props$dragStyle === undefined ? "move" : _props$dragStyle,
          customPlaceholder = _props.customPlaceholder;

      return _react2.default.createElement(
        'div',
        {
          className: className,
          onMouseDown: this.startDragDelay,
          onTouchStart: this.startDragDelay,
          ref: 'draggable'
        },
        dragStyle === "move" ? !isDragging ? this.props.children : placeholder && !customPlaceholder ? _react2.default.createElement('div', { className: this.props.placeholderClass, style: {
            width: this.state.initialDimensions.width,
            height: this.state.initialDimensions.height,
            display: 'inline-block',
            verticalAlign: 'top'
          } }) : customPlaceholder : this.props.children,
        _react2.default.createElement(
          _reactPortal2.default,
          { isOpened: isDragging },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.Children.map(children, function (child) {
              return _react2.default.cloneElement(child, {
                style: _extends({
                  width: _this4.state.initialDimensions.width,
                  height: _this4.state.initialDimensions.height,
                  left: _this4.state.draggablePosition.x,
                  top: _this4.state.draggablePosition.y,
                  position: "fixed",
                  pointerEvents: "none"
                }, child.props.style),
                className: (child.props.className ? child.props.className : "") + " " + draggingClassName
              });
            })
          )
        )
      );
    }
  }]);

  return Draggable;
}(_react.Component);

var Droppable = exports.Droppable = function (_Component2) {
  _inherits(Droppable, _Component2);

  function Droppable() {
    _classCallCheck(this, Droppable);

    var _this5 = _possibleConstructorReturn(this, (Droppable.__proto__ || Object.getPrototypeOf(Droppable)).call(this));

    _this5.componentDidMount = function () {
      _this5.unsubscribe = store.subscribe(_this5.dropId, function () {
        _this5.forceUpdate();
      });
    };

    _this5.componentWillUnmount = function () {
      _this5.unsubscribe();
    };

    _this5.onDragIn = function (e) {
      e.stopPropagation();

      var _store$getState3 = store.getState(),
          dragging = _store$getState3.dragging;

      if (_this5.props.onDragIn && dragging) {
        _this5.props.onDragIn(e);
      }
    };

    _this5.onDragOut = function (e) {
      var _store$getState4 = store.getState(),
          dragging = _store$getState4.dragging;

      if (_this5.props.onDragOut && dragging) {
        _this5.props.onDragOut(e);
      }
    };

    _this5.onDrop = function (e) {
      var _store$getState5 = store.getState(),
          dragging = _store$getState5.dragging,
          type = _store$getState5.type,
          data = _store$getState5.data;

      if (_this5.props.onDrop && dragging && _this5.props.accepts === type) {
        _this5.props.onDrop(data, e);
      }
    };

    _this5.dropId = _shortid2.default.generate();
    return _this5;
  }

  _createClass(Droppable, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          onMouseEnter: this.onDragIn,
          onMouseLeave: this.onDragOut,
          onMouseUp: this.onDrop,
          className: this.props.className
        },
        this.props.children
      );
    }
  }]);

  return Droppable;
}(_react.Component);