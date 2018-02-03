import React from 'react'
import store from './store'
import shortid from 'shortid'

export default class DragState extends React.Component {
  dragId = shortid.generate()
  componentDidMount = () => {
    this.unsubscribe = store.subscribe(this.dragId, () => {
      this.forceUpdate()
    })
  }
  componentWillUnmount = () => {
    this.unsubscribe()
  }
  render() {
    const { children } = this.props
    return children({
      ...store.getState()
    })
  }
}
