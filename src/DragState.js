import * as React from 'react'
import store from './store'
import PropTypes from 'prop-types'

class DragState extends React.Component {
  static defaultProps = {
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
