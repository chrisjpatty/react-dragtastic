import React from 'react'

export const Title = ({ children, color = '' }) => (
  <div className="title-wrapper">
    <h3 className={`title ${color}`}>{children}</h3>
  </div>
)
