const { bootstrap, delay } = require('./test-helpers.js')

test('listen drag state', async () => {
  const page = await bootstrap()
  const renderFn = jest.fn()
  await page.exposeFunction('renderFn', renderFn)

  await page.evaluate(() => {
    const React = window.React
    const { Draggable, Droppable, DragState } = window.ReactDragtastic

    const App = () => (
      <React.Fragment>
        <Draggable id="draggable" data="data">
          {({ events }) => (
            <div style={{ width: 100, height: 100 }} {...events} />
          )}
        </Draggable>
        <Droppable id="droppable">
          {({ events }) => (
            <div style={{ width: 100, height: 100 }} {...events} />
          )}
        </Droppable>
        <DragState>
          {params => {
            window.renderFn(params)
            return null
          }}
        </DragState>
      </React.Fragment>
    )

    window.render(<App />)
  })

  expect(renderFn).lastCalledWith({
    currentlyDraggingId: null,
    currentlyHoveredDroppableAccepts: null,
    currentlyHoveredDroppableId: null,
    data: null,
    isDragging: false,
    startingX: 0,
    startingY: 0,
    type: null,
    x: 0,
    y: 0
  })

  await page.mouse.down(50, 50)
  await page.mouse.move(60, 60)

  await delay(50)

  expect(renderFn).lastCalledWith({
    currentlyDraggingId: 'draggable',
    currentlyHoveredDroppableAccepts: null,
    currentlyHoveredDroppableId: null,
    data: 'data',
    isDragging: true,
    startingX: 60,
    startingY: 60,
    type: null,
    x: 60,
    y: 60
  })

  await page.mouse.move(60, 150)
  await delay(50)

  expect(renderFn).lastCalledWith({
    currentlyDraggingId: 'draggable',
    currentlyHoveredDroppableAccepts: null,
    currentlyHoveredDroppableId: 'droppable',
    data: 'data',
    isDragging: true,
    startingX: 60,
    startingY: 60,
    type: null,
    x: 60,
    y: 150
  })

  await page.mouse.up()

  await delay(50)

  expect(renderFn).lastCalledWith({
    currentlyDraggingId: null,
    currentlyHoveredDroppableAccepts: null,
    currentlyHoveredDroppableId: null,
    data: null,
    isDragging: false,
    startingX: 0,
    startingY: 0,
    type: null,
    x: 0,
    y: 0
  })
})
