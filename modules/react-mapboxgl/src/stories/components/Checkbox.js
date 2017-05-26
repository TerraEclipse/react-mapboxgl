import React from 'react'

export default function Checkbox (props) {
  return (
    <label key={props.name} style={{
      display: 'block',
      padding: 5,
      color: props.checked ? 'lime' : 'white',
      whiteSpace: 'nowrap',
      cursor: 'pointer'
    }}>
      <input
        type='checkbox'
        onChange={props.onChange}
        checked={props.checked}
      /> {props.name}
    </label>
  )
}
