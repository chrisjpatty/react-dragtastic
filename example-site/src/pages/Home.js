import React from 'react'
import { Link } from 'react-router-dom'
import demos from '../demos'

export default class Home extends React.Component {
  render() {
    return (
      <div className="demos">
        {demos.map(demo => <DemoLink {...demo} key={demo.path} />)}
      </div>
    )
  }
}

class DemoLink extends React.Component {
  render() {
    const { path, title, img } = this.props
    return (
      <Link to={`/demos/${path}`} className="demo-link">
        <div className="demo-img">
          <img src={img} />
        </div>
        <span className="title">{title}</span>
      </Link>
    )
  }
}
