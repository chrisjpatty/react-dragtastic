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

class store {
  constructor(){
    this.state = initialState
    this.onUpdate = {};
  }
  update(payload){
    this.state = {...this.state, ...payload}
    Object.keys(this.onUpdate).forEach(funcId=>{
      if(this.onUpdate[funcId]){
        this.onUpdate[funcId]()
      }
    })
  }
  subscribe(id, func){
    this.onUpdate = { ...this.onUpdate, [id]: func}
    return ()=>{this.unsubscribe(id)}
  }
  unsubscribe(id){
    let {[id]: deleted, ...remainder} = this.onUpdate
    this.onUpdate = remainder;
  }
  getState(){
    return {...this.state};
  }
  reset(){
    this.update(initialState)
  }
}

const dndStore = new store();

export default dndStore
