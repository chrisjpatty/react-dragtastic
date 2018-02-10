import * as React from 'react'
import PropTypes from 'prop-types'
import store, { getId } from './store'

class Draggable extends React.Component {
  static defaultProps = {
    data: null,
    type: null,
    delay: 8,
    onDragStart: () => {},
    onDrag: () => {},
    onDragEnd: () => {}
  }

  dragId = getId()

  state = { startCoordinate: null, storeState: store.getState() }

  resolveId = () => this.props.id || this.dragId

  startDragDelay = e => {
    let x
    let y
    if ('ontouchstart' in window && e.touches) {
      x = e.touches[0].clientX
      y = e.touches[0].clientY
    } else {
      e.preventDefault()
      x = e.clientX
      y = e.clientY
    }
    store.update({
      startingX: x,
      startingY: y
    })
    this.setState({ startCoordinate: { x, y } })
    document.addEventListener('mouseup', this.endDragDelay)
    document.addEventListener('mousemove', this.checkDragDelay)
    document.addEventListener('touchend', this.endDragDelay)
    document.addEventListener('touchmove', this.checkDragDelay)
  }

  checkDragDelay = e => {
    let x
    let y
    if ('ontouchstart' in window && e.touches) {
      x = e.touches[0].clientX
      y = e.touches[0].clientY
    } else {
      e.preventDefault()
      x = e.clientX
      y = e.clientY
    }
    let a = Math.abs(this.state.startCoordinate.x - x)
    let b = Math.abs(this.state.startCoordinate.y - y)
    let distance = Math.round(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)))
    let dragDistance = this.props.delay
    if (distance >= dragDistance) {
      this.endDragDelay()
      if ('ontouchstart' in window && e.touches) {
        this.startMobileDrag(e)
      } else {
        this.startDrag(e)
      }
    }
  }

  endDragDelay = () => {
    document.removeEventListener('mouseup', this.endDragDelay)
    document.removeEventListener('mousemove', this.checkDragDelay)
    document.removeEventListener('touchend', this.endDragDelay)
    document.removeEventListener('touchmove', this.checkDragDelay)
    this.setState({ startCoordinate: null })
  }

  startDrag = e => {
    store.update({
      isDragging: true,
      startingX: e.clientX,
      startingY: e.clientY,
      x: e.clientX,
      y: e.clientY,
      currentlyDraggingId: this.resolveId(),
      data: this.props.data,
      type: this.props.type
    })
    this.props.onDragStart(store.getState().data)
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
      currentlyDraggingId: this.resolveId(),
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
    this.props.onDrag()
  }

  updateMobileCoordinates = e => {
    const touch = e.touches[0]
    store.update({
      x: touch.clientX,
      y: touch.clientY
    })
    this.props.onDrag()
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        storeState: store.getState()
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const state = this.state.storeState
    return this.props.children({
      ...state,
      isActive: state.currentlyDraggingId === this.resolveId(),
      events: {
        onMouseDown: this.startDragDelay,
        onTouchStart: this.startDragDelay
      }
    })
  }
}

Draggable.propTypes = {
  children: PropTypes.func.isRequired,
  delay: PropTypes.number,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  type: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onDragStart: PropTypes.func,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func
}

export default Draggable
