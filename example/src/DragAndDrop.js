import React, { Component } from 'react';
import shortid from 'shortid';
import Portal from 'react-portal';

class storeClass {
  constructor(){
    this.state = {
      data: null,
      dragging: null,
      type: null
    }
    this.onUpdate = {};
  }
  update(payload){
    this.state = {...this.state, ...payload}
    console.log(this.state)
    Object.keys(this.onUpdate).map((funcId)=>{
      this.onUpdate[funcId]()
    })
  }
  subscribe(id, func){
    this.onUpdate = { ...this.onUpdate, [id]: func}
    return ()=>{this.unsubscribe(id)}
  }
  unsubscribe(id){
    let {[id]: deleted, ...remainder} = this.onUpdate
    this.onUpdate = remainder;
  }
  getState(){
    return {...this.state};
  }
}

const store = new storeClass();

export class Draggable extends Component{
  constructor(){
    super();
    this.state = {
      initialDimensions: {width: "", height: ""},
      draggablePosition: {x: "", y: ""},
      positionInDraggable: {x: "", y: ""},
      startCoordinate: null
    }
    this.dragId = shortid.generate()
  }
  componentDidMount = () => {
    console.log(this.dragId)
    this.unsubscribe = store.subscribe(this.dragId, ()=>{
      this.forceUpdate()
    })
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
    store.update({
      dragging: this.dragId,
      data: this.props.data,
      type: this.props.type
    })
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
    const { data } = store.getState()
    store.update({
      dragging: null,
      data: null,
      type: null
    })
    document.removeEventListener("mouseup", this.endDrag)
    document.removeEventListener("mousemove", this.drag)
    document.removeEventListener("touchend", this.endDrag)
    document.removeEventListener("touchmove", this.drag)
    if(this.props.onDragEnd){
      this.props.onDragEnd(data)
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
      this.props.onDrag({
        element: {x: x - this.state.positionInDraggable.x, y: y - this.state.positionInDraggable.y},
        mouse: {x, y}
      });
    }
  }
  render(){
    const { dragging } = store.getState();
    const isDragging = dragging === this.dragId;
    const {
      children,
      className="",
      draggingClassName="",
      placeholder=true,
      dragStyle="move",
      customPlaceholder
    } = this.props;
    return(
      <div
        className={className}
        onMouseDown={this.startDragDelay}
        onTouchStart={this.startDragDelay}
        ref="draggable"
      >
        {
          dragStyle === "move" ?
            !isDragging ?
              this.props.children
              :
              placeholder && !customPlaceholder ?
                <div className={this.props.placeholderClass} style={{
                  width: this.state.initialDimensions.width,
                  height: this.state.initialDimensions.height,
                  display: 'inline-block',
                  verticalAlign: 'top'
                }}>
                </div>
                :
                customPlaceholder
          :
          this.props.children
        }
        <Portal isOpened={isDragging}>
          <div>
            {
              React.Children.map(children, (child) => (
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
                  className: (child.props.className ? child.props.className : "") + " " + draggingClassName
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
  constructor(){
    super()
    this.dropId = shortid.generate()
  }
  componentDidMount = () => {
    this.unsubscribe = store.subscribe(this.dropId, ()=>{this.forceUpdate()})
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
    const { dragging } = store.getState();
    if(this.props.onDragOut && dragging){
      this.props.onDragOut(e);
    }
  }
  onDrop = (e) => {
    const { dragging, type, data } = store.getState();
    if(this.props.onDrop && dragging && this.props.accepts === type){
      this.props.onDrop(data, e);
    }
  }
  render(){
    return(
      <div
        onMouseEnter={this.onDragIn}
        onMouseLeave={this.onDragOut}
        onMouseUp={this.onDrop}
        className={this.props.className}
      >
        {this.props.children}
      </div>
    )
  }
}
