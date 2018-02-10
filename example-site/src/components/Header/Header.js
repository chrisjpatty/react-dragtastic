import React from 'react'
import logo from '../../common/img/logo.svg'
import { Link } from 'react-router-dom'
import './Header.css'

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <Link to="/">
          <img src={logo} />
        </Link>
        <div className="page-gradient" />
      </header>
    )
  }
}
