import * as React from 'react'
import PropTypes from 'prop-types'
import store from './store'

class DragComponent extends React.Component {
  static defaultProps = {
    for: ''
  }

  dragId = store.getId()

  componentDidMount() {
    this.unsubscribe = store.subscribe(this.dragId, () => {
      this.forceUpdate()
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const state = store.getState()
    const accepts = state.currentlyHoveredDroppableAccepts
    const isOverDroppable =
      typeof state.currentlyHoveredDroppableId === 'string'
    return (
      state.isDragging &&
      state.currentlyDraggingId === this.props.for &&
      this.props.children({
        ...state,
        isOverAccepted: isOverDroppable
          ? accepts !== null
            ? Array.isArray(accepts)
              ? accepts.includes(state.type)
              : state.type === accepts
            : true
          : false
      })
    )
  }
}

DragComponent.propTypes = {
  children: PropTypes.func.isRequired,
  for: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

export default DragComponent
