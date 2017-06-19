import { createStore } from 'redux';

const initialState = {
  dragData: null,
  dragging: null
}

const dndReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DRAG":
      return {...state, dragging: action.dragging, dragData: action.dragData}
    default:
      return state;
  }
}

export default createStore(dndReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
