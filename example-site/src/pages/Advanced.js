import React from 'react'
import { Draggable, DragComponent, Droppable } from 'react-dragtastic'
import { Title } from '../components/Shell/Shell'

export default class Advanced extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
        <Title color="blue">Sortable List</Title>
        <SortableList />
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
        <div className="rows">
          {this.state.rows.map((row, i) => (
            <Row
              value={row}
              index={i}
              setFromIndex={this.setFromIndex}
              reorder={this.reorder}
              key={row}
            />
          ))}
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
      <Draggable type="row" id={value} onDragStart={this.setFromIndex}>
        {({ events }) => (
          <DragComponent for={value} alwaysRender>
            {({ x, y, isDragging, currentlyDraggingId }) => (
              <Droppable accepts="row" onDrop={this.reorder}>
                {({ events: dropEvents, isOver }) => (
                  <div
                    {...dropEvents}
                    style={{
                      pointerEvents:
                        isDragging && currentlyDraggingId === value
                          ? 'none'
                          : ''
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
                        position:
                          isDragging && currentlyDraggingId === value
                            ? 'fixed'
                            : '',
                        left:
                          isDragging && currentlyDraggingId === value
                            ? x - 100
                            : '',
                        top:
                          isDragging && currentlyDraggingId === value
                            ? y - 20
                            : ''
                      }}
                      {...events}
                      className={`row ${
                        isDragging && currentlyDraggingId === value
                          ? 'dragging'
                          : ''
                      }`}
                    >
                      {value}
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
