import React from 'react'
import store from './store'
import shortid from 'shortid'

export default class DragComponent extends React.Component{
  dragId = shortid.generate()
  static defaultProps = {
    for: ''
  }
  componentDidMount = () => {
    this.unsubscribe = store.subscribe(this.dragId, ()=>{
      this.forceUpdate()
    })
  }
  componentWillUnmount = () => {
    this.unsubscribe()
  }
  render(){
    const state = store.getState()
    console.log(state.currentlyDraggingId, this.props.for)
    return(
      state.isDragging && state.currentlyDraggingId === this.props.for &&
      this.props.children({
        ...state
      })
    )
  }
}
