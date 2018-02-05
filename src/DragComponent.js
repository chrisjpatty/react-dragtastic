import React from 'react'
import store from './store'
import PropTypes from 'prop-types'

class DragComponent extends React.Component {
  dragId = store.getId()
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
    const accepts = state.currentlyHoveredDroppableAccepts
    return (
      state.isDragging &&
      state.currentlyDraggingId === this.props.for &&
      this.props.children({
        ...state,
        isOverAccepted: Array.isArray(accepts)
          ? accepts.includes(state.type)
          : state.type === accepts
      })
    )
  }
}
DragComponent.propTypes = {
  children: PropTypes.func.isRequired,
  for: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}
export default DragComponent
