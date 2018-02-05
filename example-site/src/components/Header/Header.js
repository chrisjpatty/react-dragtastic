import React from 'react'
import logo from '../../common/img/logo.png'
import './Header.css'

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <img src={logo} />
      </header>
    )
  }
}
