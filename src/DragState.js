import * as React from "react"
import store from "./store"
import PropTypes from "prop-types"

class DragState extends React.Component {
  static defaultProps = {
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
    const { children } = this.props
    return children({
      ...this.state
    })
  }
}

DragState.propTypes = {
  children: PropTypes.func.isRequired,
  subscribeTo: PropTypes.array
}

export default DragState
