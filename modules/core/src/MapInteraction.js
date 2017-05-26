import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class MapInteraction extends React.Component {
  static propTypes = {
    interactive: PropTypes.bool,
    scrollZoom: PropTypes.bool,
    boxZoom: PropTypes.bool,
    dragRotate: PropTypes.bool,
    dragPan: PropTypes.bool,
    keyboard: PropTypes.bool,
    doubleClickZoom: PropTypes.bool,
    touchZoomRotate: PropTypes.bool
  }

  static defaultProps = {
    interactive: true,
    scrollZoom: true,
    boxZoom: true,
    dragRotate: true,
    dragPan: true,
    keyboard: true,
    doubleClickZoom: true,
    touchZoomRotate: true
  }

  static contextTypes = {
    map: PropTypes.object
  }

  // Called when the map is initally created.
  static getOptions (props) {
    return _.pick(
      _.defaults({}, props, MapInteraction.defaultProps),
      _.keys(MapInteraction.propTypes)
    )
  }

  componentWillReceiveProps (nextProps) {
    const {map} = this.context
    const handlers = [
      'scrollZoom',
      'boxZoom',
      'dragRotate',
      'dragPan',
      'keyboard',
      'doubleClickZoom',
      'touchZoomRotate'
    ]
    _.each(handlers, (handler) => {
      if (this.props[handler] !== nextProps[handler]) {
        if (nextProps[handler]) {
          map[handler].enable()
        } else {
          map[handler].disable()
        }
      }
    })
  }

  render () {
    return null
  }
}

export default MapInteraction
