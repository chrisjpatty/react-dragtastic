const bootstrap = async () => {
  const page = await global.__BROWSER__.newPage()

  const scripts = [
    './node_modules/react/umd/react.development.js',
    './node_modules/react-dom/umd/react-dom.development.js',
    './node_modules/prop-types/prop-types.js',
    './build/index.js'
  ]

  await page.setViewport({ width: 1000, height: 1000 })

  for (const path of scripts) {
    await page.addScriptTag({ path })
  }

  await page.evaluate(() => {
    const container = document.createElement('div')
    if (document.body) {
      const body = document.body
      body.appendChild(container)
      body.style.margin = '0px'
    }

    window.div100 = events => (
      <div style={{ width: 100, height: 100 }} {...events} />
    )

    window.render = component => {
      window.ReactDOM.render(component, container)
    }
  })

  page.on('console', msg =>
    msg.args().forEach(arg => console.log(arg.toString()))
  )

  return page
}

exports.bootstrap = bootstrap
