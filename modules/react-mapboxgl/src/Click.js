import React from 'react'
import PropTypes from 'prop-types'
import Children from './Children'
import MapEvent from './MapEvent'
import LayerEvent from './LayerEvent'

class Click extends React.Component {
  static propTypes = {
    layer: PropTypes.string,
    event: PropTypes.string,
    avoidDoubleClick: PropTypes.bool,
    doubleClickSpeed: PropTypes.number,
    onClick: PropTypes.func,
    children: PropTypes.func
  }

  static defaultProps = {
    event: 'click',
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
    let {event, layer, avoidDoubleClick} = this.props
    return (
      <Children>
        {layer ? (
          <LayerEvent type={event} layer={layer} onChange={this.handleClick} />
        ) : (
          <MapEvent type={event} onChange={this.handleClick} />
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
