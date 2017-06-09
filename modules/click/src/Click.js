import React from 'react'
import PropTypes from 'prop-types'
import {Children, MapEvent, LayerEvent} from '@react-mapboxgl/core'

class Click extends React.Component {
  static propTypes = {
    layer: PropTypes.string,
    clickEvent: PropTypes.string,
    avoidDoubleClick: PropTypes.bool,
    doubleClickSpeed: PropTypes.number,
    onClick: PropTypes.func,
    children: PropTypes.func
  }

  static defaultProps = {
    clickEvent: 'click',
    avoidDoubleClick: false,
    doubleClickSpeed: 300
  }

  static contextTypes = {
    map: PropTypes.object
  }

  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleDoubleClick = this.handleDoubleClick.bind(this)
  }

  handleClick (e) {
    if (this.props.onClick) {
      if (this.props.avoidDoubleClick) {
        clearTimeout(this._doubleClickTimeout)
        this._doubleClickTimeout = setTimeout(() => {
          this.props.onClick(e, e.features)
        }, this.props.doubleClickSpeed)
      } else {
        this.props.onClick(e, e.features)
      }
    }
  }

  handleDoubleClick (e) {
    clearTimeout(this._doubleClickTimeout)
  }

  render () {
    let {clickEvent, layer, avoidDoubleClick} = this.props
    return (
      <Children>
        {layer ? (
          <LayerEvent type={clickEvent} layer={layer} onChange={this.handleClick} />
        ) : (
          <MapEvent type={clickEvent} onChange={this.handleClick} />
        )}
        {avoidDoubleClick ? (
          <MapEvent type='dblclick' onChange={this.handleDoubleClick} />
        ) : null}
        {this.props.children}
      </Children>
    )
  }
}

export default Click
