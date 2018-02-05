import React, { Fragment } from 'react'
import { Draggable, DragComponent, Droppable } from 'react-dragtastic'
import { Portal } from 'react-portal'
import Arrow from '../components/Arrow/Arrow'
import Orbit from '../components/Animations/Orbit'
import CodeBox from '../components/CodeBox/CodeBox'
import { Title } from '../components/Shell/Shell'
import { simple } from './Basic.code.js'
import './Basic.css'

export default class Basic extends React.Component {
  state = { hovered: null }
  setHovered = id => {
    this.setState({ hovered: id })
  }
  render() {
    return (
      <div className="content-wrapper">
        <Title color="blue">Basic Example</Title>
        <div className="basic-wrapper">
          <Draggable id="basic-blue" type="circle">
            {({ isDragging, events }) => (
              <div
                {...events}
                onMouseEnter={() => {
                  this.setHovered('basic')
                }}
                onMouseLeave={() => {
                  this.setHovered(null)
                }}
                className="circle blue draggable"
              >
                {this.state.hovered === 'basic' &&
                  !isDragging && <Orbit color="light-blue" />}
              </div>
            )}
          </Draggable>
          <Arrow color="yellow" />
          <Portal>
            <DragComponent for="basic-blue">
              {({ x, y, currentlyHoveredDroppableId }) => (
                <div
                  className="circle blue small shadow flex-center"
                  style={{
                    position: 'fixed',
                    pointerEvents: 'none',
                    left: x - 30,
                    top: y - 30
                  }}
                >
                  {!currentlyHoveredDroppableId && <Orbit color="light-blue" />}
                </div>
              )}
            </DragComponent>
          </Portal>
          <Droppable accepts="circle">
            {({ events, isOver }) => (
              <div
                {...events}
                className={`droppable circle blue shadow-inner ${
                  isOver ? 'depth-2' : ''
                }`}
              >
                {isOver && <Orbit color="light-blue" />}
              </div>
            )}
          </Droppable>
        </div>
        <CodeBox code={simple} />
      </div>
    )
  }
}
