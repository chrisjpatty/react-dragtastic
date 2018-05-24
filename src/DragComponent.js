import * as React from 'react'
import PropTypes from 'prop-types'
import store from './store'

class DragComponent extends React.Component {
  static defaultProps = {
    for: '',
    alwaysRender: false,
    subscribeTo: null
  }

  state = store.getState()

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
    const accepts = state.currentlyHoveredDroppableAccepts
    const isOverDroppable =
      typeof state.currentlyHoveredDroppableId === 'string'

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
