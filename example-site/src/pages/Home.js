import React from 'react'
import { Link } from 'react-router-dom'
import demos from '../demos'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        {demos.map(demo => (
          <Link to={`/demos/${demo.path}`} key={demo.path}>
            {demo.title}
          </Link>
        ))}
      </div>
    )
  }
}
