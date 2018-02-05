import React, { Fragment } from 'react'

const Orbit = ({ color }) => (
  <Fragment>
    <div className={`orbit ${color}`} />
    <div className={`orbit ${color} tick-2`} />
    <div className={`orbit ${color} tick-3`} />
    <div className={`orbit ${color} tick-4`} />
    <div className={`orbit ${color} tick-5`} />
  </Fragment>
)

export default Orbit
