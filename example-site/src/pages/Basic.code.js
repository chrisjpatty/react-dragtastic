export const simple = `<Draggable id="blue" type="circle">
  {({ isDragging, events }) => (
    <div {...events} className="circle blue draggable" />
  )}
</Draggable>

<DragComponent for="blue">
  {({ x, y, currentlyHoveredDroppableId }) => (
    <div
      className="circle blue small shadow"
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        left: x - 30,
        top: y - 30
      }}
    />
  )}
</DragComponent>

<Droppable accepts="circle" onDrop={this.animateDrop}>
  {({ events, isOver }) => (
    <div
      {...events}
      className={\`droppable circle blue shadow-inner \${ isOver ? 'accept' : '' }\`}
    />
  )}
</Droppable>
`

export const moving = `<Draggable id="blue" type="circle">
  {({ isDragging, events }) => (
    <div
      {...events}
      className="circle blue draggable"
      style={{opacity: isDragging ? 0 : 1}}
    />
  )}
</Draggable>

<DragComponent for="blue">
  {({ x, y, currentlyHoveredDroppableId }) => (
    <div
      className="circle blue small shadow"
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        left: x - 30,
        top: y - 30
      }}
    />
  )}
</DragComponent>

<Droppable accepts="circle" onDrop={this.animateDrop}>
  {({ events, isOver }) => (
    <div
      {...events}
      className={\`droppable circle blue shadow-inner \${ isOver ? 'accept' : '' }\`}
    />
  )}
</Droppable>
`

export const multi = `<Draggable id="blue" type="blue">
  {({ isDragging, events }) => (
    <div
      {...events}
      className="circle blue draggable"
      style={{opacity: isDragging ? 0 : 1}}
    />
  )}
</Draggable>

<DragComponent for="blue">
  {({ x, y, currentlyHoveredDroppableId }) => (
    <div
      className="circle blue small shadow"
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        left: x - 30,
        top: y - 30
      }}
    />
  )}
</DragComponent>

<Droppable accepts="blue" onDrop={this.animateDrop}>
  {({ events, isOver, willAccept }) => (
    <div
      {...events}
      className={\`droppable circle blue shadow-inner \${
        isOver && willAccept ? 'accept' : ''
      }\`}
    />
  )}
</Droppable>

<Draggable id="orange" type="orange">
  {({ isDragging, events }) => (
    <div
      {...events}
      className="circle orange draggable"
      style={{opacity: isDragging ? 0 : 1}}
    />
  )}
</Draggable>

<DragComponent for="orange">
  {({ x, y, currentlyHoveredDroppableId }) => (
    <div
      className="circle orange small shadow"
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        left: x - 30,
        top: y - 30
      }}
    />
  )}
</DragComponent>

<Droppable accepts="orange" onDrop={this.animateDrop}>
  {({ events, isOver, willAccept }) => (
    <div
      {...events}
      className={\`droppable circle orange shadow-inner \${
        isOver && willAccept ? 'accept' : ''
      }\`}
    />
  )}
</Droppable>
`

// const test = () => (
// 	<div>
// 		<Draggable id="basic-orange" type="circle">
// 			{({ isDragging, events }) => (
// 				<div {...events} className="circle blue draggable" />
// 			)}
// 		</Draggable>
// 		<Arrow color="yellow" />
// 		<Portal>
// 			<DragComponent for="basic-orange">
// 				{({ x, y, currentlyHoveredDroppableId }) => (
// 					<div
// 						className="circle blue small shadow flex-center"
// 						style={{
// 							position: 'fixed',
// 							pointerEvents: 'none',
// 							left: x - 30,
// 							top: y - 30
// 						}}
// 					/>
// 				)}
// 			</DragComponent>
// 		</Portal>
// 		<Droppable accepts="circle">
// 			{({ events, isOver }) => (
// 				<div
// 					{...events}
// 					className={`droppable circle blue shadow-inner ${
// 						isOver ? 'depth-2' : ''
// 					}`}
// 				/>
// 			)}
// 		</Droppable>
// 	</div>
// )
