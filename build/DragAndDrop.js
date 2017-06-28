'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Droppable = exports.Draggable = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPortal = require('react-portal');

var _reactPortal2 = _interopRequireDefault(_reactPortal);

require('./DragAndDrop.css');

var _dndReducer = require('./dnd-reducer');

var _dndReducer2 = _interopRequireDefault(_dndReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var setDrag = function setDrag(_ref) {
  var dragging = _ref.dragging,
      dragData = _ref.dragData;
  return {
    type: "SET_DRAG",
    dragging: dragging,
    dragData: dragData
  };
};

var Draggable = exports.Draggable = function (_Component) {
  _inherits(Draggable, _Component);

  function Draggable() {
    _classCallCheck(this, Draggable);

    var _this = _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this));

    _this.componentDidMount = function () {
      _this.unsubscribe = _dndReducer2.default.subscribe(function () {
        _this.forceUpdate();
      });
    };

    _this.componentWillUnmount = function () {
      _this.unsubscribe();
    };

    _this.startDragDelay = function (e) {
      var x = void 0;var y = void 0;
      if ('ontouchstart' in window && e.touches) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        e.preventDefault();
        x = e.clientX;
        y = e.clientY;
      }
      _this.setState({ startCoordinate: { x: x, y: y } });
      document.addEventListener("mouseup", _this.endDragDelay);
      document.addEventListener("mousemove", _this.checkDragDelay);
      document.addEventListener("touchend", _this.endDragDelay);
      document.addEventListener("touchmove", _this.checkDragDelay);
    };

    _this.checkDragDelay = function (e) {
      var x = void 0;var y = void 0;
      if ('ontouchstart' in window && e.touches) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        e.preventDefault();
        x = e.clientX;
        y = e.clientY;
      }
      var a = Math.abs(_this.state.startCoordinate.x - x);
      var b = Math.abs(_this.state.startCoordinate.y - y);
      var distance = Math.round(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
      var dragDistance = _this.props.dragDistance ? _this.props.dragDistance : 8;
      //console.log("distance", a, b, distance)
      if (distance >= dragDistance) {
        _this.onDragStart();
      }
    };

    _this.endDragDelay = function () {
      document.removeEventListener("mouseup", _this.endDragDelay);
      document.removeEventListener("mousemove", _this.checkDragDelay);
      document.removeEventListener("touchend", _this.endDragDelay);
      document.removeEventListener("touchmove", _this.checkDragDelay);
      _this.setState({ startCoordinate: null });
    };

    _this.onDragStart = function () {
      document.removeEventListener("mousemove", _this.checkDragDelay);
      document.removeEventListener("mouseup", _this.endDragDelay);
      document.removeEventListener("touchend", _this.endDragDelay);
      document.removeEventListener("touchmove", _this.checkDragDelay);
      var draggable = _this.refs.draggable;
      var offset = draggable.getBoundingClientRect();
      var x = _this.state.startCoordinate.x;
      var y = _this.state.startCoordinate.y;
      var initialDimensions = { width: offset.width, height: offset.height };
      _this.setState({
        startCoordinate: null,
        initialDimensions: initialDimensions,
        draggablePosition: { x: x - (x - offset.left), y: y - (y - offset.top) },
        positionInDraggable: { x: x - offset.left, y: y - offset.top }
      });
      _dndReducer2.default.dispatch(setDrag({ dragging: _this.props.dragId, dragData: _this.props.draggableData }));
      document.addEventListener("mouseup", _this.endDrag);
      document.addEventListener("mousemove", _this.drag);
      document.addEventListener("touchend", _this.endDrag);
      document.addEventListener("touchmove", _this.drag);
      if (_this.props.onDragStart) {
        _this.props.onDragStart();
      }
    };

    _this.endDrag = function (e) {
      e.preventDefault();
      var data = _dndReducer2.default.getState().dragData;
      _dndReducer2.default.dispatch(setDrag({ dragging: null, dragData: null }));
      document.removeEventListener("mouseup", _this.endDrag);
      document.removeEventListener("mousemove", _this.drag);
      document.removeEventListener("touchend", _this.endDrag);
      document.removeEventListener("touchmove", _this.drag);
      if (_this.props.onDragEnd) {
        _this.props.onDragEnd(data);
      }
    };

    _this.drag = function (e) {
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
      _this.setState({
        draggablePosition: {
          x: x - _this.state.positionInDraggable.x,
          y: y - _this.state.positionInDraggable.y
        }
      });
      if (_this.props.onDrag) {
        _this.props.onDrag({
          element: { x: x - _this.state.positionInDraggable.x, y: y - _this.state.positionInDraggable.y },
          mouse: { x: x, y: y }
        });
      }
    };

    _this.state = {
      initialDimensions: { width: "", height: "" },
      draggablePosition: { x: "", y: "" },
      positionInDraggable: { x: "", y: "" },
      startCoordinate: null
    };
    return _this;
  }

  _createClass(Draggable, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _store$getState = _dndReducer2.default.getState(),
          dragging = _store$getState.dragging;

      var isDragging = dragging === this.props.dragId;
      var _props = this.props,
          _props$className = _props.className,
          className = _props$className === undefined ? "" : _props$className,
          _props$draggingClass = _props.draggingClass,
          draggingClass = _props$draggingClass === undefined ? "" : _props$draggingClass,
          _props$dragPlaceholde = _props.dragPlaceholder,
          dragPlaceholder = _props$dragPlaceholde === undefined ? false : _props$dragPlaceholde,
          _props$hideWhileDragg = _props.hideWhileDragging,
          hideWhileDragging = _props$hideWhileDragg === undefined ? true : _props$hideWhileDragg,
          _props$wrapperClassNa = _props.wrapperClassName,
          wrapperClassName = _props$wrapperClassNa === undefined ? "" : _props$wrapperClassNa;

      return _react2.default.createElement(
        'div',
        { className: className, onMouseDown: this.startDragDelay, onTouchStart: this.startDragDelay, ref: 'draggable' },
        hideWhileDragging ? !isDragging ? this.props.children : dragPlaceholder ? _react2.default.createElement('div', { className: "drag-placeholder " + this.props.placeholderClass, style: {
            width: this.state.initialDimensions.width,
            height: this.state.initialDimensions.height
          } }) : null : this.props.children,
        _react2.default.createElement(
          _reactPortal2.default,
          { isOpened: isDragging },
          _react2.default.createElement(
            'div',
            { className: wrapperClassName },
            _react2.default.Children.map(this.props.children, function (child) {
              return _react2.default.cloneElement(child, {
                style: _extends({
                  width: _this2.state.initialDimensions.width,
                  height: _this2.state.initialDimensions.height,
                  left: _this2.state.draggablePosition.x,
                  top: _this2.state.draggablePosition.y,
                  position: "fixed",
                  pointerEvents: "none"
                }, child.props.style),
                className: (child.props.className ? child.props.className : "") + " " + draggingClass
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
    var _ref2;

    var _temp, _this3, _ret;

    _classCallCheck(this, Droppable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref2 = Droppable.__proto__ || Object.getPrototypeOf(Droppable)).call.apply(_ref2, [this].concat(args))), _this3), _this3.componentDidMount = function () {
      _this3.unsubscribe = _dndReducer2.default.subscribe(function () {
        _this3.forceUpdate();
      });
    }, _this3.componentWillUnmount = function () {
      _this3.unsubscribe();
    }, _this3.onDragIn = function (e) {
      e.stopPropagation();

      var _store$getState2 = _dndReducer2.default.getState(),
          dragging = _store$getState2.dragging;

      if (_this3.props.onDragIn && dragging) {
        _this3.props.onDragIn(e);
      }
    }, _this3.onDragOut = function (e) {
      var _store$getState3 = _dndReducer2.default.getState(),
          dragging = _store$getState3.dragging;

      if (_this3.props.onDragOut && dragging) {
        _this3.props.onDragOut(e);
      }
    }, _this3.onDrop = function (e) {
      var _store$getState4 = _dndReducer2.default.getState(),
          dragging = _store$getState4.dragging,
          dragData = _store$getState4.dragData;

      if (_this3.props.onDrop && dragging && _this3.props.accepts === dragData.type) {
        _this3.props.onDrop(dragData, e);
      }
    }, _temp), _possibleConstructorReturn(_this3, _ret);
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
          className: this.props.draggableClassName
        },
        this.props.children
      );
    }
  }]);

  return Droppable;
}(_react.Component);