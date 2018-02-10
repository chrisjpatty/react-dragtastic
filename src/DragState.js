import * as React from 'react'
import store from './store'
import PropTypes from 'prop-types'

class DragState extends React.Component {
  state = store.getState()

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
  children: PropTypes.func.isRequired
}

export default DragState
