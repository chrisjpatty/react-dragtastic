import React, { Component } from 'react'
import {
  Draggable,
  Droppable,
  DragComponent,
  DragState
} from 'react-dragtastic'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <DragState>
          {dragState => (
            <div
              style={{
                background: 'yellow',
                padding: 10
              }}
            >
              {Object.keys(dragState).map(key => (
                <span
                  style={{
                    display: 'block'
                  }}
                  key={key}
                >
                  {key}: {dragState[key]}
                </span>
              ))}
            </div>
          )}
        </DragState>
        <Draggable id="red" data="Some Data" type="red">
          {dragState => (
            <div
              {...dragState.events}
              style={{
                width: 300,
                height: 300,
                background: 'red'
              }}
            />
          )}
        </Draggable>
        <DragComponent for="red" alwaysRender>
          {dragState => (
            <div
              style={{
                position: 'fixed',
                left: dragState.x - 25,
                top: dragState.y - 25,
                width: 50,
                height: 50,
                background: 'lime',
                pointerEvents: 'none'
              }}
            />
          )}
        </DragComponent>
        <Droppable accepts={['red', 'blue']}>
          {dragState => (
            <div
              {...dragState.events}
              style={{
                background:
                  dragState.type === 'red' && dragState.isOver ? 'red' : 'blue',
                width: 300,
                height: 300
              }}
            >
              isOver: {dragState.isOver ? 'true' : 'false'}
              <br />
              accepts:{' '}
              {dragState.type === 'red' && dragState.isOver ? 'true' : 'false'}
            </div>
          )}
        </Droppable>
      </div>
    )
  }
}

export default App
