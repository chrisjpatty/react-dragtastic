import * as React from 'react'
import store from './store'

class DragState extends React.Component {
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
