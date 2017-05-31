import React from 'react'

/**
 * Just a placeholder until rendering arrays is possible (React 16), so I can
 * easily find-replace and, until then, apply styling if needed.
 */
export default class Children extends React.PureComponent {
  render () {
    return (
      <div className='react-mapbox--children'>
        {this.props.children}
      </div>
    )
  }
}
