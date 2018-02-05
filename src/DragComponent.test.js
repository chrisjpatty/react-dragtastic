const { bootstrap } = require('./test-helpers.js')

test('not rendered if draggable id is not equal drag component for', async () => {
  const page = await bootstrap()

  const renderFn = jest.fn()
  await page.exposeFunction('renderFn', renderFn)

  await page.evaluate(() => {
    const React = window.React
    const { DragComponent, Draggable } = window.ReactDragtastic

    const App = () => (
      <React.Fragment>
        <Draggable id="draggable1">
          {({ events }) => (
            <div style={{ width: 100, height: 100 }} {...events} />
          )}
        </Draggable>>
        <DragComponent for="draggable2">
          {d => renderFn(d) && null}
        </DragComponent>
      </React.Fragment>
    )

    window.render(<App />)
  })

  await page.mouse.down(50, 50)
  await page.mouse.move(60, 60)

  expect(renderFn).toHaveBeenCalledTimes(0)
})

test('rendered on dragging', async () => {
  const page = await bootstrap()
  const renderFn = jest.fn()

  await page.exposeFunction('renderFn', renderFn)

  await page.evaluate(() => {
    const React = window.React
    const { DragComponent, Draggable } = window.ReactDragtastic

    // TODO make for prop required
    const App = () => (
      <React.Fragment>
        <Draggable id="draggable">
          {({ events }) => (
            <div style={{ width: 100, height: 100 }} {...events} />
          )}
        </Draggable>>
        <DragComponent for="draggable">
          {d => renderFn(d) && null}
        </DragComponent>
      </React.Fragment>
    )

    window.render(<App />)
  })

  await page.mouse.down(50, 50)

  expect(renderFn).toHaveBeenCalledTimes(0)

  await page.mouse.move(60, 60)

  expect(renderFn).lastCalledWith(
    expect.objectContaining({
      currentlyDraggingId: 'draggable',
      currentlyHoveredDroppableId: null,
      currentlyHoveredDroppableAccepts: null,
      isOverAccepted: false
    })
  )
})

test('accepts isOverAccepted when hovered droppable', async () => {
  const page = await bootstrap()
  const renderFn = jest.fn()

  await page.exposeFunction('renderFn', renderFn)

  await page.evaluate(() => {
    const React = window.React
    const { DragComponent, Draggable, Droppable } = window.ReactDragtastic

    const App = () => (
      <React.Fragment>
        <Draggable id="draggable" type="type1">
          {({ events }) => (
            <div style={{ width: 100, height: 100 }} {...events} />
          )}
        </Draggable>>
        <Droppable accepts="type1">
          {({ events }) => (
            <div style={{ width: 100, height: 100 }} {...events} />
          )}
        </Droppable>
        <DragComponent for="draggable">
          {d => renderFn(d) && null}
        </DragComponent>
      </React.Fragment>
    )

    window.render(<App />)
  })

  await page.mouse.down(50, 50)
  await page.mouse.move(50, 75)

  expect(renderFn).lastCalledWith(
    expect.objectContaining({
      currentlyDraggingId: 'draggable',
      currentlyHoveredDroppableAccepts: null,
      isOverAccepted: false
    })
  )

  await page.mouse.move(50, 150)

  expect(renderFn).lastCalledWith(
    expect.objectContaining({
      currentlyDraggingId: 'draggable',
      currentlyHoveredDroppableAccepts: 'type1',
      isOverAccepted: true
    })
  )
})
