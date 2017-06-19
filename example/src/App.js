import React, { Component } from 'react';
import { Draggable, Droppable } from './DragAndDrop';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {dropClass: ""}
  }
  onDrop = (dropData) => {
    console.log(dropData)
    this.setState({dropClass: ""})
  }
  onDragIn = () => {
    this.setState({dropClass: "over"})
  }
  onDragOut = () => {
    this.setState({dropClass: ""})
  }
  render() {
    return (
      <div className="App">
        <Droppable
          onDrop={this.onDrop}
          onDragIn={this.onDragIn}
          onDragOut={this.onDragOut}
          >
          <div className={"dropzone " + this.state.dropClass}>
            Drop here
          </div>
        </Droppable>
        <Draggable
          dragId={1}
          hideWhileDragging={true}
          placeholderClass="dragging"
          draggableData={"The drag data"}
          className="dragging"
          >
          <div className="drag-square"></div>
        </Draggable>
      </div>
    );
  }
}

export default App;
