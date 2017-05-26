import './Options.css'
import React from 'react'

export default function Options (props) {
  return (
    <div className='storybook-options'>
      {props.children}
    </div>
  )
}
