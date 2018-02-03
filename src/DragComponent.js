import React from 'react'
import store from './store'
import shortid from 'shortid'
import PropTypes from 'prop-types'

class DragComponent extends React.Component {
  dragId = shortid.generate()
  static defaultProps = {
    for: ''
  }
  componentDidMount = () => {
    this.unsubscribe = store.subscribe(this.dragId, () => {
      this.forceUpdate()
    })
  }
  componentWillUnmount = () => {
    this.unsubscribe()
  }
  render() {
    const state = store.getState()
    return (
      state.isDragging &&
      state.currentlyDraggingId === this.props.for &&
      this.props.children({
        ...state,
        isOverAccepted: Array.isArray(this.currentlyHoveredDroppableAccepts)
          ? this.currentlyHoveredDroppableAccepts.find(state.type)
          : state.type === this.currentlyHoveredDroppableAccepts
      })
    )
  }
}
DragComponent.propTypes = {
  children: PropTypes.func.isRequired,
  for: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}
export default DragComponent
