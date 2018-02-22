const initialState = {
  x: 0,
  y: 0,
  isDragging: false,
  startingX: 0,
  startingY: 0,
  currentlyDraggingId: null,
  currentlyHoveredDroppableId: null,
  currentlyHoveredDroppableAccepts: null,
  data: null,
  type: null
}

class Store {
  _state = initialState

  _callbacks = []

  update(payload) {
    this._state = { ...this._state, ...payload }
    this._callbacks.forEach(callback => callback())
  }

  reset() {
    this.update(initialState)
  }

  subscribe(callback) {
    this._callbacks = [...this._callbacks, callback]
    return () => {
      this._callbacks = this._callbacks.filter(f => f !== callback)
    }
  }

  getState() {
    return this._state
  }
}

const dndStore = new Store()

export default dndStore

export const getId = () => {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

export const noop = () => {}
