import React, { Fragment } from 'react'
import { Draggable, DragComponent, Droppable } from 'react-dragtastic'
import { Portal } from 'react-portal'
import Arrow from '../components/Arrow/Arrow'
import Orbit from '../components/Animations/Orbit'
import CodeBox from '../components/CodeBox/CodeBox'
import { Title } from '../components/Shell/Shell'
import { simple, moving, multi } from './Basic.code.js'
import './Basic.css'

export default class Basic extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
        <BasicDND />
        <BasicMoveDrag />
        <Multiple />
      </div>
    )
  }
}

class BasicDND extends React.Component {
  state = { hovered: null, dropped: false }
  setHovered = id => {
    this.setState({ hovered: id })
  }
  onDrop = () => {
    this.setState({ dropped: true })
  }
  onAnimationEnd = () => {
    this.setState({ dropped: false })
  }
  render() {
    return (
      <div className="example-wrapper">
        <Title color="blue">Basic</Title>
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
                className={`circle blue draggable`}
              />
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
                />
              )}
            </DragComponent>
          </Portal>
          <Droppable accepts="circle" onDrop={this.onDrop}>
            {({ events, isOver }) => (
              <div
                {...events}
                className={`droppable circle blue shadow-inner ${
                  isOver ? 'depth-2 accept' : ''
                } ${this.state.dropped ? 'implode' : ''}`}
                onAnimationEnd={this.onAnimationEnd}
              >
                {/* <Explode /> */}
              </div>
            )}
          </Droppable>
        </div>
        <CodeBox code={simple} />
      </div>
    )
  }
}

class BasicMoveDrag extends React.Component {
  state = { hovered: null, dropped: false }
  setHovered = id => {
    this.setState({ hovered: id })
  }
  onDrop = () => {
    this.setState({ dropped: true })
  }
  onAnimationEnd = () => {
    this.setState({ dropped: false })
  }
  render() {
    return (
      <div className="example-wrapper">
        <Title color="blue">Moving</Title>
        <div className="basic-wrapper">
          <Draggable id="move-blue" type="circle">
            {({ isDragging, currentlyDraggingId, events }) => (
              <div
                {...events}
                onMouseEnter={() => {
                  this.setHovered('basic')
                }}
                onMouseLeave={() => {
                  this.setHovered(null)
                }}
                className={`circle blue small`}
                style={{
                  opacity:
                    isDragging && currentlyDraggingId === 'move-blue' ? 0 : 1
                }}
              />
            )}
          </Draggable>
          <Arrow color="yellow" />
          <Portal>
            <DragComponent for="move-blue">
              {({ x, y, currentlyHoveredDroppableId }) => (
                <div
                  className="circle blue small shadow flex-center"
                  style={{
                    position: 'fixed',
                    pointerEvents: 'none',
                    left: x - 30,
                    top: y - 30
                  }}
                />
              )}
            </DragComponent>
          </Portal>
          <Droppable accepts="circle" onDrop={this.onDrop}>
            {({ events, isOver }) => (
              <div
                {...events}
                className={`droppable circle blue shadow-inner ${
                  isOver ? 'depth-2 accept' : ''
                } ${this.state.dropped ? 'implode' : ''}`}
                onAnimationEnd={this.onAnimationEnd}
              >
                {/* <Explode /> */}
              </div>
            )}
          </Droppable>
        </div>
        <CodeBox code={moving} />
      </div>
    )
  }
}

class Multiple extends React.Component {
  state = { hovered: null, droppedBlue: false, droppedOrange: false }
  setHovered = id => {
    this.setState({ hovered: id })
  }
  onDrop = color => {
    this.setState({ [`dropped${color}`]: true })
  }
  onAnimationEnd = color => {
    this.setState({ [`dropped${color}`]: false })
  }
  render() {
    return (
      <div className="example-wrapper">
        <Title color="blue">Multiple Draggables & Droppables</Title>
        <div className="basic-wrapper">
          <Draggable id="multi-blue" type="blue">
            {({ isDragging, events, currentlyDraggingId }) => (
              <div
                {...events}
                onMouseEnter={() => {
                  this.setHovered('basic')
                }}
                onMouseLeave={() => {
                  this.setHovered(null)
                }}
                className={`circle blue small`}
                style={{
                  opacity:
                    isDragging && currentlyDraggingId === 'multi-blue' ? 0 : 1
                }}
              />
            )}
          </Draggable>
          <Arrow color="yellow" />
          <Portal>
            <DragComponent for="multi-blue">
              {({ x, y, currentlyHoveredDroppableId }) => (
                <div
                  className="circle blue small shadow flex-center"
                  style={{
                    position: 'fixed',
                    pointerEvents: 'none',
                    left: x - 30,
                    top: y - 30
                  }}
                />
              )}
            </DragComponent>
          </Portal>
          <Droppable
            accepts="circle"
            id="multi-blue-drop"
            onDrop={() => {
              this.onDrop('Blue')
            }}
            accepts="blue"
          >
            {({ events, isOver, currentlyHoveredDroppableAccepts, type }) => (
              <div
                {...events}
                className={`droppable circle blue shadow-inner ${
                  currentlyHoveredDroppableAccepts === 'blue'
                    ? 'depth-2 accept'
                    : ''
                } ${
                  currentlyHoveredDroppableAccepts !== type && isOver
                    ? 'reject'
                    : ''
                } ${this.state.droppedBlue ? 'implode' : ''}`}
                onAnimationEnd={() => {
                  this.onAnimationEnd('Blue')
                }}
              >
                {/* <Explode /> */}
              </div>
            )}
          </Droppable>
        </div>
        <div className="basic-wrapper">
          <Draggable id="multi-orange" type="orange">
            {({ isDragging, events, currentlyDraggingId }) => (
              <div
                {...events}
                onMouseEnter={() => {
                  this.setHovered('basic')
                }}
                onMouseLeave={() => {
                  this.setHovered(null)
                }}
                className={`circle orange small`}
                style={{
                  opacity:
                    isDragging && currentlyDraggingId === 'multi-orange' ? 0 : 1
                }}
              />
            )}
          </Draggable>
          <Arrow color="yellow" />
          <Portal>
            <DragComponent for="multi-orange">
              {({ x, y, currentlyHoveredDroppableId }) => (
                <div
                  className="circle orange small shadow flex-center"
                  style={{
                    position: 'fixed',
                    pointerEvents: 'none',
                    left: x - 30,
                    top: y - 30
                  }}
                />
              )}
            </DragComponent>
          </Portal>
          <Droppable
            accepts="circle"
            onDrop={() => {
              this.onDrop('Orange')
            }}
            accepts="orange"
          >
            {({ events, isOver, currentlyHoveredDroppableAccepts, type }) => (
              <div
                {...events}
                className={`droppable circle orange shadow-inner ${
                  currentlyHoveredDroppableAccepts === 'orange'
                    ? 'depth-2 accept'
                    : ''
                } ${
                  currentlyHoveredDroppableAccepts !== type && isOver
                    ? 'reject'
                    : ''
                } ${this.state.droppedOrange ? 'implode' : ''}`}
                onAnimationEnd={() => {
                  this.onAnimationEnd('Orange')
                }}
              >
                {/* <Explode /> */}
              </div>
            )}
          </Droppable>
        </div>
        <CodeBox code={multi} />
      </div>
    )
  }
}
