import React from 'react'
import store from './store'

class DragState extends React.Component {
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
    const { children } = this.props
    return children({
      ...store.getState()
    })
  }
}

DragState.propTypes = {
  children: PropTypes.func.isRequired
}

export default DragState
