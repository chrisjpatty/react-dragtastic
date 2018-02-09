import React from 'react'
import { Draggable, DragComponent, Droppable } from 'react-dragtastic'

export default class Advanced extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
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
    ]
  }
  render() {
    return (
      <div className="block-wrapper">
        <div className="rows">
          {this.state.rows.map(row => <Row key={row}>{row}</Row>)}
        </div>
      </div>
    )
  }
}

class Row extends React.Component {
  render() {
    const { children } = this.props
    return (
      <Draggable>
        {({ events }) => (
          <div {...events} className="row">
            {children}
          </div>
        )}
      </Draggable>
    )
  }
}
