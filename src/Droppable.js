import React from 'react'
import store from './store'
import shortid from 'shortid'

export default class Droppable extends React.Component {
	dragId = shortid.generate()
  static defaultProps = {
    onDrop: () => {}
  }
	componentDidMount = () => {
		this.unsubscribe = store.subscribe(this.dragId, () => {
			this.forceUpdate()
		})
	}
	componentWillUnmount = () => {
		this.unsubscribe()
	}
	setOver = () => {
		if (store.getState().isDragging) {
			store.update({
				currentlyHoveredDroppableId: this.dragId
			})
		}
	}
	setOut = () => {
		if (store.getState().isDragging) {
			store.update({
				currentlyHoveredDroppableId: null
			})
		}
	}
  onDrop = () => {
    const{ data, type, isDragging } = store.getState()
    if(isDragging && type === this.props.accepts){
      this.props.onDrop(data)
    }
  }
	render() {
		const state = store.getState()
		return this.props.children({
			...state,
			isOver: state.currentlyHoveredDroppableId === this.dragId,
			events: {
				onMouseEnter: this.setOver,
				onMouseLeave: this.setOut,
        onMouseUp: this.onDrop
			}
		})
	}
}
