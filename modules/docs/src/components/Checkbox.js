import React from 'react'

export default function Checkbox (props) {
  return (
    <label key={props.name} style={Object.assign({
      display: 'block',
      padding: 5,
      color: props.checked ? 'lime' : 'white',
      whiteSpace: 'nowrap',
      cursor: 'pointer'
    }, (props.style || {}))}>
      <input
        type='checkbox'
        onChange={props.onChange}
        checked={props.checked}
      /> {props.name}
    </label>
  )
}
