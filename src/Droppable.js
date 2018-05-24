import * as React from 'react'
import PropTypes from 'prop-types'
import store, { getId, noop } from './store'

class Droppable extends React.Component {
  static defaultProps = {
    id: getId(),
    accepts: null,
    onDragEnter: noop,
    onDragLeave: noop,
    onDrop: noop,
		subscribeTo: null
  }

  state = store.getState()

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

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
			if(this.props.watch){
				const state = store.getState()
				let shouldUpdate = false;
				let i = 0;
				while(i < this.props.watch.length - 1){
					if(this.state[this.props.watch[i]] !== state[this.props.watch[i]]){
						shouldUpdate === true;
						i = this.props.length;
					}else{
						i++
					}
				}
				if(shouldUpdate){
					this.setState(state)
				}
			}else{
				this.setState(store.getState())
			}
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const state = this.state
    const isOver = state.currentlyHoveredDroppableId === this.props.id
    return this.props.children({
      ...state,
      isOver,
      willAccept: Array.isArray(this.props.accepts)
        ? this.props.accepts.includes(state.type)
        : this.props.accepts === state.type,
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
	watch: PropTypes.array
}

export default Droppable
