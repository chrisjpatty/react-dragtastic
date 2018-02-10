export const sortable = `<Draggable type="row" id={rowId}>
  {({ events, isActive }) => (
    <DragComponent for={rowId} alwaysRender>
      {({ x, y, isDragging }) => (
        <Droppable accepts="row" onDrop={this.reorderRow}>
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
                  top: isDragging && isActive ? y - 20 : ''
                }}
                {...events}
                className={\`row \${
                  isDragging && isActive ? 'dragging' : ''
                }\`}
              >
              </div>
            </div>
          )}
        </Droppable>
      )}
    </DragComponent>
  )}
</Draggable>
`
