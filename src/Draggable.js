import React from 'react'
import store from './store'
import shortid from 'shortid'

export default class Draggable extends React.Component{
  dragId = shortid.generate()
  static defaultProps = {
    onDragEnd: () => {},
    onDragStart: () => {},
    data: null,
    type: null
  }
  componentDidMount = () => {
    this.unsubscribe = store.subscribe(this.dragId, ()=>{
      this.forceUpdate()
    })
  }
  componentWillUnmount = () => {
    this.unsubscribe()
  }
  startDrag = e => {
    this.props.onDragStart(store.getState().data)
    store.update({
      isDragging: true,
      startingX: e.clientX,
      startingY: e.clientY,
      x: e.clientX,
      y: e.clientY,
      currentlyDraggingId: this.props.id || this.dragId,
      data: this.props.data,
      type: this.props.type
    })
    window.addEventListener('mouseup', this.stopDrag)
    window.addEventListener('mousemove', this.updateCoordinates)
  }
  startMobileDrag = e => {
    this.props.onDragStart(store.getState().data)
    const touch = e.touches[0]
    store.update({
      isDragging: true,
      startingX: touch.clientX,
      startingY: touch.clientY,
      x: touch.clientX,
      y: touch.clientY,
      currentlyDraggingId: this.props.id || this.dragId,
      data: this.props.data,
      type: this.props.type
    })
    window.addEventListener('touchend', this.stopDrag)
    window.addEventListener('touchmove', this.updateMobileCoordinates)
  }
  stopDrag = e => {
    this.props.onDragEnd(store.getState().data)
    store.reset()
    window.removeEventListener('mouseup', this.stopDrag)
    window.removeEventListener('mousemove', this.updateCoordinates)
    window.removeEventListener('touchend', this.stopDrag)
    window.removeEventListener('touchmove', this.updateMobileCoordinates)
  }
  updateCoordinates = e => {
    store.update({
      x: e.clientX,
      y: e.clientY
    })
  }
  updateMobileCoordinates = e => {
    const touch = e.touches[0]
    store.update({
      x: touch.clientX,
      y: touch.clientY
    })
  }
  render(){
    const state = store.getState()
    return(
      this.props.children({
        ...state,
        events: {
          onMouseDown: this.startDrag,
          onTouchStart: this.startMobileDrag
        }
      })
    )
  }
}
