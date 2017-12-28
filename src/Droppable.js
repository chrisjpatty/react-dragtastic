import React from 'react'
import store from './store'
import shortid from 'shortid'

export default class Droppable extends React.Component {
	dragId = shortid.generate()
  static defaultProps = {
    onDrop: () => {},
		accepts: null
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
				currentlyHoveredDroppableId: this.dragId,
				currentlyHoveredDroppableAccepts: this.accepts
			})
		}
	}
	setOut = () => {
		if (store.getState().isDragging) {
			store.update({
				currentlyHoveredDroppableId: null,
				currentlyHoveredDroppableAccepts: null
			})
		}
	}
  onDrop = () => {
    const{ data, type, isDragging } = store.getState()
		if(isDragging){
			if(Array.isArray(this.props.accepts)){
				if(this.props.accepts.includes(type)){
					this.props.onDrop(data)
				}
			}else{
				if(type === this.props.accepts){
		      this.props.onDrop(data)
		    }
			}
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
