import React, { Component } from 'react';
import Portal from 'react-portal';
import './DragAndDrop.css';
import store from './dnd-reducer';

const setDrag = ({dragging, dragData}) => ({
  type: "SET_DRAG",
  dragging,
  dragData
})

export class Draggable extends Component{
  constructor(){
    super();
    this.state = {
      initialDimensions: {width: "", height: ""},
      draggablePosition: {x: "", y: ""},
      positionInDraggable: {x: "", y: ""},
      startCoordinate: null
    }
  }
  componentDidMount = () => {
    this.unsubscribe = store.subscribe(()=>{this.forceUpdate()})
  }
  componentWillUnmount = () => {
    this.unsubscribe()
  }
  startDragDelay = (e) => {
    let x; let y;
    if ('ontouchstart' in window && e.touches) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    }else{
      e.preventDefault();
      x = e.clientX;
      y = e.clientY;
    }
    this.setState({startCoordinate: {x, y}})
    document.addEventListener("mouseup", this.endDragDelay)
    document.addEventListener("mousemove", this.checkDragDelay)
    document.addEventListener("touchend", this.endDragDelay)
    document.addEventListener("touchmove", this.checkDragDelay)
  }
  checkDragDelay = (e) => {
    let x; let y;
    if ('ontouchstart' in window && e.touches) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    }else{
      e.preventDefault();
      x = e.clientX;
      y = e.clientY;
    }
    let a = Math.abs(this.state.startCoordinate.x - x)
    let b = Math.abs(this.state.startCoordinate.y - y)
    let distance = Math.round(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)))
    let dragDistance = this.props.dragDistance ? this.props.dragDistance : 8;
    //console.log("distance", a, b, distance)
    if(distance >= dragDistance){
      this.onDragStart()
    }
  }
  endDragDelay = () => {
    document.removeEventListener("mouseup", this.endDragDelay)
    document.removeEventListener("mousemove", this.checkDragDelay)
    document.removeEventListener("touchend", this.endDragDelay)
    document.removeEventListener("touchmove", this.checkDragDelay)
    this.setState({startCoordinate: null})
  }
  onDragStart = () => {
    document.removeEventListener("mousemove", this.checkDragDelay)
    document.removeEventListener("mouseup", this.endDragDelay)
    document.removeEventListener("touchend", this.endDragDelay)
    document.removeEventListener("touchmove", this.checkDragDelay)
    let draggable = this.refs.draggable;
    let offset = draggable.getBoundingClientRect();
    let x = this.state.startCoordinate.x;
    let y = this.state.startCoordinate.y;
    let initialDimensions = {width: offset.width, height: offset.height};
    this.setState({
      startCoordinate: null,
      initialDimensions,
      draggablePosition: {x: x - (x - offset.left) , y: y - (y - offset.top)},
      positionInDraggable: {x: x - offset.left, y: y - offset.top}
    })
    store.dispatch(setDrag({dragging: this.props.dragId, dragData: this.props.draggableData}));
    document.addEventListener("mouseup", this.endDrag);
    document.addEventListener("mousemove", this.drag);
    document.addEventListener("touchend", this.endDrag)
    document.addEventListener("touchmove", this.drag)
    if(this.props.onDragStart){
      this.props.onDragStart();
    }
  }
  endDrag = (e) => {
    e.preventDefault();
    let data = store.getState().dragData;
    store.dispatch(setDrag({dragging: null, dragData: null}));
    document.removeEventListener("mouseup", this.endDrag);
    document.removeEventListener("mousemove", this.drag);
    document.removeEventListener("touchend", this.endDrag);
    document.removeEventListener("touchmove", this.drag);
    if(this.props.onDragEnd){
      this.props.onDragEnd(data);
    }
  }
  drag = (e) => {
    let x; let y;
    if ('ontouchstart' in window && e.touches) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    }else{
      e.preventDefault();
      x = e.clientX;
      y = e.clientY;
    }
    //console.log("drag", x, y)
    this.setState({
      draggablePosition: {
        x: x - this.state.positionInDraggable.x,
        y: y - this.state.positionInDraggable.y
      }
    })
    if(this.props.onDrag){
      this.props.onDrag();
    }
  }
  render(){
    const { dragging } = store.getState();
    let isDragging = dragging === this.props.dragId;
    const { className="", draggingClass="", dragPlaceholder=false } = this.props;
    return(
      <div className={className} onMouseDown={this.startDragDelay} onTouchStart={this.startDragDelay} ref="draggable">
        {
          this.props.hideWhileDragging ?
            !isDragging ?
              this.props.children
              :
              dragPlaceholder ?
                <div className={"drag-placeholder " + this.props.placeholderClass} style={{
                  width: this.state.initialDimensions.width,
                  height: this.state.initialDimensions.height
                }}>
                </div>
                : null
          :
          this.props.children
        }
        <Portal isOpened={isDragging}>
          <div>
          {
            React.Children.map(this.props.children, (child) => (
              React.cloneElement(child, {
                style: {
                  width: this.state.initialDimensions.width,
                  height: this.state.initialDimensions.height,
                  left: this.state.draggablePosition.x,
                  top: this.state.draggablePosition.y,
                  position: "fixed",
                  pointerEvents: "none",
                  ...child.props.style
                },
                className: child.props.className + " " + draggingClass
              })
            ))
          }
          </div>
        </Portal>
      </div>
    )
  }
}

export class Droppable extends Component{
  componentDidMount = () => {
    this.unsubscribe = store.subscribe(()=>{this.forceUpdate()})
  }
  componentWillUnmount = () => {
    this.unsubscribe()
  }
  onDragIn = (e) => {
    e.stopPropagation();
    const { dragging } = store.getState();
    if(this.props.onDragIn && dragging){
      this.props.onDragIn(e);
    }
  }
  onDragOut = (e) => {
    if(this.props.onDragOut){
      this.props.onDragOut(e);
    }
  }
  onDrop = (e) => {
    const { dragging, dragData } = store.getState();
    if(this.props.onDrop && dragging && this.props.accepts === dragData.type){
      this.props.onDrop(dragData, e);
    }
  }
  render(){
    return(
      <div
        onMouseEnter={this.onDragIn}
        onMouseLeave={this.onDragOut}
        onMouseUp={this.onDrop}
        className={this.props.draggableClassName}
      >
        {this.props.children}
      </div>
    )
  }
}
