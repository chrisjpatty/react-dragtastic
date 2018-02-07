const { bootstrap, delay } = require('./test-helpers.js')

test('call onDragEnter, onDragLeave callbacks', async () => {
  const page = await bootstrap()
  const onDragEnterFn = jest.fn()
  const onDragLeaveFn = jest.fn()
  await page.exposeFunction('onDragEnterFn', onDragEnterFn)
  await page.exposeFunction('onDragLeaveFn', onDragLeaveFn)

  await page.evaluate(() => {
    const React = window.React
    const { Draggable, Droppable } = window.ReactDragtastic

    const App = () => (
      <React.Fragment>
        <Draggable id="draggable">
          {({ events }) => window.div100(events)}
        </Draggable>>
        <Droppable
          onDragEnter={window.onDragEnterFn}
          onDragLeave={window.onDragLeaveFn}
        >
          {({ events }) => window.div100(events)}
        </Droppable>
      </React.Fragment>
    )

    window.render(<App />)
  })

  await page.mouse.down(50, 50)

  expect(onDragEnterFn).toHaveBeenCalledTimes(0)

  await page.mouse.move(50, 150, { steps: 2 })

  expect(onDragEnterFn).toHaveBeenCalledTimes(1)
  expect(onDragLeaveFn).toHaveBeenCalledTimes(0)

  await page.mouse.move(150, 150)

  expect(onDragEnterFn).toHaveBeenCalledTimes(1)
  expect(onDragLeaveFn).toHaveBeenCalledTimes(1)
})

test('call onDrop callback with default accepts', async () => {
  const page = await bootstrap()
  const onDropFn = jest.fn()
  await page.exposeFunction('onDropFn', onDropFn)

  await page.evaluate(() => {
    const React = window.React
    const { Draggable, Droppable } = window.ReactDragtastic

    const App = () => (
      <React.Fragment>
        <Draggable id="draggable">
          {({ events }) => window.div100(events)}
        </Draggable>>
        <Droppable onDrop={window.onDropFn}>
          {({ events }) => window.div100(events)}
        </Droppable>
      </React.Fragment>
    )

    window.render(<App />)
  })

  await page.mouse.down(50, 50)
  await page.mouse.move(150, 50)
  await page.mouse.up()

  expect(onDropFn).toHaveBeenCalledTimes(0)

  await page.mouse.move(50, 50)
  await page.mouse.down(50, 50)
  await page.mouse.move(50, 150)
  await page.mouse.up()

  expect(onDropFn).toHaveBeenCalledTimes(1)
})

test('pass isOver: true when drag is over droppable', async () => {
  const page = await bootstrap()
  const renderFn = jest.fn()
  await page.exposeFunction('renderFn', renderFn)

  await page.evaluate(() => {
    const React = window.React
    const { Draggable, Droppable } = window.ReactDragtastic

    const App = () => (
      <React.Fragment>
        <Draggable id="draggable" type="type1">
          {({ events }) => window.div100(events)}
        </Draggable>>
        <Droppable accepts="type2">
          {params => window.renderFn(params) && window.div100(params.events)}
        </Droppable>
      </React.Fragment>
    )

    window.render(<App />)
  })

  expect(renderFn).lastCalledWith(expect.objectContaining({ isOver: false }))

  await page.mouse.down(50, 50)
  await page.mouse.move(50, 150, { steps: 2 })

  expect(renderFn).lastCalledWith(expect.objectContaining({ isOver: true }))

  await page.mouse.up()

  await delay(50)

  expect(renderFn).lastCalledWith(expect.objectContaining({ isOver: false }))
})
