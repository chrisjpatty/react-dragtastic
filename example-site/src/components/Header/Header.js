import React from 'react'
import logo from '../../common/img/logo.svg'
import './Header.css'

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <img src={logo} />
        <div className="page-gradient" />
      </header>
    )
  }
}
