import './Overlay.css'
import React from 'react'

export default function Overlay (props) {
  return (
    <div className='storybook-overlay'>
      {props.children}
    </div>
  )
}
