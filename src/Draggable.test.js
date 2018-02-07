const { bootstrap, delay } = require('./test-helpers.js')

test('call onDragStart, onDrag and onDragEnd callbacks', async () => {
  const page = await bootstrap()
  const onDragStartFn = jest.fn()
  const onDragFn = jest.fn()
  const onDragEndFn = jest.fn()
  await page.exposeFunction('onDragStartFn', onDragStartFn)
  await page.exposeFunction('onDragFn', onDragFn)
  await page.exposeFunction('onDragEndFn', onDragEndFn)

  await page.evaluate(() => {
    const React = window.React
    const { Draggable } = window.ReactDragtastic

    const App = () => (
      <Draggable
        id="draggable"
        data="data"
        onDragStart={window.onDragStartFn}
        onDrag={window.onDragFn}
        onDragEnd={window.onDragEndFn}
      >
        {({ events }) => (
          <div style={{ width: 100, height: 100 }} {...events} />
        )}
      </Draggable>
    )

    window.render(<App />)
  })

  await page.mouse.down(50, 50)
  await page.mouse.move(60, 60)
  await page.mouse.move(60, 150)
  await page.mouse.up()
  await delay(50)

  expect(onDragStartFn).toHaveBeenCalledTimes(1)
  expect(onDragFn).toHaveBeenCalledTimes(2)
  expect(onDragEndFn).toHaveBeenCalledTimes(1)
})

test('pass props to render prop', async () => {
  const page = await bootstrap()
  const renderFn = jest.fn()
  await page.exposeFunction('renderFn', renderFn)

  await page.evaluate(() => {
    const React = window.React
    const { Draggable } = window.ReactDragtastic

    const App = () => (
      <Draggable id="draggable" data="data" type="type">
        {params => {
          window.renderFn(params)
          return <div style={{ width: 100, height: 100 }} {...params.events} />
        }}
      </Draggable>
    )

    window.render(<App />)
  })

  expect(renderFn).lastCalledWith(
    expect.objectContaining({
      isDragging: false,
      currentlyDraggingId: null,
      data: null,
      type: null
    })
  )

  await page.mouse.down(39, 59)
  await page.mouse.move(40, 60)

  expect(renderFn).lastCalledWith(
    expect.objectContaining({
      isDragging: true,
      startingX: 40,
      startingY: 60,
      x: 40,
      y: 60,
      currentlyDraggingId: 'draggable',
      data: 'data',
      type: 'type'
    })
  )

  await page.mouse.move(80, 90)

  expect(renderFn).lastCalledWith(
    expect.objectContaining({
      startingX: 40,
      startingY: 60,
      x: 80,
      y: 90
    })
  )

  await page.mouse.up()

  expect(renderFn).lastCalledWith(
    expect.objectContaining({
      isDragging: false,
      currentlyDraggingId: null,
      data: null,
      type: null
    })
  )
})
