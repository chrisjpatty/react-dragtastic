import React from 'react'
import { Draggable, DragComponent, Droppable } from 'react-dragtastic'
import { Title } from '../components/Shell/Shell'
import { sortable } from './Advanced.code.js'
import CodeBox from '../components/CodeBox/CodeBox'
import { colorTween } from '../utilities'

export default class Advanced extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
        <Title color="blue">Sortable List</Title>
        <SortableList />
        <CodeBox code={sortable} />
      </div>
    )
  }
}

class SortableList extends React.Component {
  state = {
    rows: [
      'Walter',
      'Skyler',
      'Jesse',
      'Hank',
      'Marie',
      'Gustavo',
      'Saul',
      'Mike',
      'Jane',
      'Tuco'
    ],
    fromIndex: null
  }
  reorder = toIndex => {
    const target = this.state.rows[this.state.fromIndex]
    let rows = [
      ...this.state.rows.slice(0, this.state.fromIndex),
      ...this.state.rows.slice(this.state.fromIndex + 1)
    ]
    rows = [
      ...rows.slice(0, toIndex - (toIndex > this.state.fromIndex ? 1 : 0)),
      target,
      ...rows.slice(toIndex - (toIndex > this.state.fromIndex ? 1 : 0))
    ]
    this.setState({ rows })
  }
  setFromIndex = i => {
    this.setState({ fromIndex: i })
  }
  render() {
    return (
      <div className="block-wrapper">
        <div
          className="rows"
          style={{
            height: this.state.rows.length * 50
          }}
        >
          {this.state.rows.map((row, i) => (
            <Row
              value={row}
              index={i}
              setFromIndex={this.setFromIndex}
              reorder={this.reorder}
              color={colorTween(
                { r: 247, g: 152, b: 36 },
                { r: 252, g: 236, b: 86 },
                i,
                this.state.rows.length - 1
              )}
              key={row}
            />
          ))}
          <Droppable
            onDrop={() => {
              this.reorder(this.state.rows.length)
            }}
            accepts="row"
          >
            {({ events }) => (
              <div
                className="row-placeholder"
                style={{
                  height: 50
                }}
                {...events}
              />
            )}
          </Droppable>
        </div>
      </div>
    )
  }
}

class Row extends React.Component {
  constructor(props) {
    super()
    this.state = { color: props.color }
  }
  reorder = () => {
    this.props.reorder(this.props.index)
  }
  setFromIndex = () => {
    this.props.setFromIndex(this.props.index)
  }
  render() {
    const { value } = this.props
    return (
      <Draggable
        type="row"
        id={value}
        delay={0}
        onDragStart={this.setFromIndex}
      >
        {({ events, isActive }) => (
          <DragComponent for={value} alwaysRender>
            {({ x, y, isDragging }) => (
              <Droppable accepts="row" onDrop={this.reorder}>
                {({ events: dropEvents, isOver }) => (
                  <div
                    {...dropEvents}
                    style={{
                      pointerEvents: isDragging && isActive ? 'none' : ''
                    }}
                  >
                    {isDragging && (
                      <div
                        className="row-placeholder"
                        style={{
                          height: isOver ? 40 : 0
                        }}
                      />
                    )}
                    <div
                      style={{
                        position: isDragging && isActive ? 'fixed' : '',
                        left: isDragging && isActive ? x - 100 : '',
                        top: isDragging && isActive ? y - 20 : '',
                        background: this.state.color
                      }}
                      {...events}
                      className={`row ${
                        isDragging && isActive ? 'dragging' : ''
                      }`}
                    >
                      {/* {value} */}
                    </div>
                  </div>
                )}
              </Droppable>
            )}
          </DragComponent>
        )}
      </Draggable>
    )
  }
}
