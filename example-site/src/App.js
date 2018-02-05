import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home'
import demos from './demos'
import 'normalize.css'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="body-wrapper">
          <div className="demo-wrapper">
            <Route path="/" component={Home} exact />
            {demos.map(demo => (
              <Route
                path={`/demos/${demo.path}`}
                component={demo.page}
                exact
                key={demo.path}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default App
