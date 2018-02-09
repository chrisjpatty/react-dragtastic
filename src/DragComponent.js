import * as React from 'react'
import PropTypes from 'prop-types'
import store from './store'

class DragComponent extends React.Component {
  static defaultProps = {
    for: '',
    alwaysRender: false
  }

  dragId = store.getId()

  state = store.getState()

  componentDidMount() {
    this.unsubscribe = store.subscribe(this.dragId, () => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const state = this.state
    const accepts = state.currentlyHoveredDroppableAccepts
    const isOverDroppable =
      typeof state.currentlyHoveredDroppableId === 'string'

    return (
      (this.props.alwaysRender ||
        (state.isDragging && state.currentlyDraggingId === this.props.for)) &&
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
  for: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  alwaysRender: PropTypes.bool
}

export default DragComponent
