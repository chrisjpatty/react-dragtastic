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

const rows = [
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
]

class SortableList extends React.Component {
  state = {
    rows,
    colors: rows.reduce(
      (acc, row, i) => ({
        ...acc,
        [row]: colorTween(
          { r: 247, g: 152, b: 36 },
          { r: 252, g: 236, b: 86 },
          i,
          rows.length - 1
        )
      }),
      {}
    ),
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
              color={this.state.colors[row]}
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
  reorder = () => {
    this.props.reorder(this.props.index)
  }

  setFromIndex = () => {
    this.props.setFromIndex(this.props.index)
  }

  render() {
    const { value } = this.props
    return (
      <React.Fragment>
        <Draggable id={value} delay={0} onDragStart={this.setFromIndex}>
          {({ events, isDragging, isActive }) => (
            <Droppable onDrop={this.reorder}>
              {({ events: dropEvents, isOver }) => (
                <div {...dropEvents}>
                  <div
                    className="row-placeholder"
                    style={{ display: isOver ? '' : 'none' }}
                  />
                  <div
                    {...events}
                    style={{
                      display: isActive ? 'none' : '',
                      background: this.props.color
                    }}
                    className="row"
                  >
                    {/* {value} */}
                  </div>
                </div>
              )}
            </Droppable>
          )}
        </Draggable>
        <DragComponent for={value}>
          {({ x, y }) => (
            <div
              style={{
                pointerEvents: 'none',
                position: 'fixed',
                left: x - 100,
                top: y - 20,
                background: this.props.color
              }}
              className="row dragging"
            >
              {/* {value} */}
            </div>
          )}
        </DragComponent>
      </React.Fragment>
    )
  }
}
