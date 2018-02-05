import React from 'react'
import './Arrow.css'

const Arrow = ({ color }) => (
  <div className="arrow">
    <div className={`bar ${color}`} />
    <div className={`head ${color}`} />
  </div>
)

export default Arrow
