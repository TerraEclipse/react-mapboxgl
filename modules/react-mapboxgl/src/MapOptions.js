import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class MapOptions extends React.Component {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired,
    hash: PropTypes.bool,
    bearingSnap: PropTypes.number,
    attributionControl: PropTypes.bool,
    logoPosition: PropTypes.string,
    preserveDrawingBuffer: PropTypes.bool,
    refreshExpiredTiles: PropTypes.bool,
    trackResize: PropTypes.bool,
    renderWorldCopies: PropTypes.bool,

    // Not options, set with a method.
    showTileBoundaries: PropTypes.bool,
    showCollisionBoxes: PropTypes.bool,
    repaint: PropTypes.bool,
    rtlTextPlugin: PropTypes.string
  }

  static contextTypes = {
    map: PropTypes.object
  }

  // Called when the map is initally created.
  static getOptions (props) {
    return _.omit(_.pick(props, _.keys(MapOptions.propTypes)), [
      'showTileBoundaries',
      'showCollisionBoxes',
      'repaint',
      'rtlTextPlugin'
    ])
  }

  componentWillReceiveProps (nextProps) {
    const {map} = this.context
    if (!_.isEqual(this.props.style, nextProps.style)) {
      map.setStyle(nextProps.style)
    }
    if (this.props.showTileBoundaries !== nextProps.showTileBoundaries) {
      map.showTileBoundaries(nextProps.showTileBoundaries)
    }
    if (this.props.showCollisionBoxes !== nextProps.showCollisionBoxes) {
      map.showCollisionBoxes(nextProps.showCollisionBoxes)
    }
    if (this.props.repaint !== nextProps.repaint) {
      map.repaint(nextProps.repaint)
    }
    if (this.props.rtlTextPlugin !== nextProps.rtlTextPlugin) {
      map.setRTLTextPlugin(nextProps.rtlTextPlugin)
    }
  }

  render () {
    return null
  }
}

export default MapOptions
