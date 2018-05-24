import * as React from "react"
import PropTypes from "prop-types"
import store, { getId, noop } from "./store"

class Droppable extends React.Component {
  static defaultProps = {
    id: getId(),
    accepts: null,
    onDragEnter: noop,
    onDragLeave: noop,
    onDrop: noop,
    subscribeTo: null
  }

  state = { ...store.getState(), isOver: false }

  setOver = () => {
    if (store.getState().isDragging) {
      store.update({
        currentlyHoveredDroppableId: this.props.id,
        currentlyHoveredDroppableAccepts: this.props.accepts
      })
      this.props.onDragEnter()
    }
  }

  setOut = () => {
    if (store.getState().isDragging) {
      store.update({
        currentlyHoveredDroppableId: null,
        currentlyHoveredDroppableAccepts: null
      })
      this.props.onDragLeave()
    }
  }

  onDrop = () => {
    const { data, type, isDragging } = store.getState()
    if (isDragging) {
      if (Array.isArray(this.props.accepts)) {
        if (this.props.accepts.includes(type)) {
          this.props.onDrop(data)
        }
      } else {
        if (type === this.props.accepts) {
          this.props.onDrop(data)
        }
      }
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps !== this.props) {
      return true
    } else {
      if (nextProps.subscribeTo) {
        let shouldUpdate = false
        let i = 0
        while (i < nextProps.subscribeTo.length - 1) {
          if (
            this.state[nextProps.subscribeTo[i]] !==
            nextState[nextProps.subscribeTo[i]]
          ) {
            shouldUpdate = true
            i = nextProps.length
          } else {
            i++
          }
        }
        return shouldUpdate
      } else {
        if (nextState !== this.state) {
          return true
        } else {
          return false
        }
      }
    }
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      const state = store.getState()
      this.setState({
        ...state,
        isOver: state.currentlyHoveredDroppableId === this.props.id,
        willAccept: Array.isArray(this.props.accepts)
          ? this.props.accepts.includes(state.type)
          : this.props.accepts === state.type
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const state = this.state
    return this.props.children({
      ...state,
      events: {
        onMouseEnter: this.setOver,
        onMouseLeave: this.setOut,
        onMouseUp: this.onDrop
      }
    })
  }
}

Droppable.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  children: PropTypes.func.isRequired,
  accepts: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onDrop: PropTypes.func,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  subscribeTo: PropTypes.array
}

export default Droppable
