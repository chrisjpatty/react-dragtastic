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

<Droppable accepts="circle">
  {({ events, isOver }) => (
    <div
      {...events}
      className={\`droppable circle blue shadow-inner \${ isOver ? 'accept' : '' }\`}
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
