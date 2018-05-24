import * as React from "react"
import PropTypes from "prop-types"
import store from "./store"

class DragComponent extends React.Component {
  static defaultProps = {
    for: "",
    alwaysRender: false,
    subscribeTo: null
  }

  state = store.getState()

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
      typeof state.currentlyHoveredDroppableId === "string"

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
  alwaysRender: PropTypes.bool,
  subscribeTo: PropTypes.array
}

export default DragComponent
