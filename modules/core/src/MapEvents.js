import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Children from './Children'
import MapEvent from './MapEvent'

class MapEvents extends React.Component {
  static propTypes = {
    onResize: PropTypes.func,
    onDblClick: PropTypes.func,
    onClick: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMoveStart: PropTypes.func,
    onMove: PropTypes.func,
    onMoveEnd: PropTypes.func,
    onMouseOut: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onDragStart: PropTypes.func,
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func,
    onTouchMove: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchCancel: PropTypes.func,
    onZoomStart: PropTypes.func,
    onZoom: PropTypes.func,
    onZoomEnd: PropTypes.func,
    onBoxZoomStart: PropTypes.func,
    onBoxZoomEnd: PropTypes.func,
    onBoxZoomCancel: PropTypes.func,
    onRotateStart: PropTypes.func,
    onRotate: PropTypes.func,
    onRotateEnd: PropTypes.func,
    onPitchStart: PropTypes.func,
    onPitch: PropTypes.func,
    onPitchEnd: PropTypes.func,
    onWebGLContextLost: PropTypes.func,
    onWebGLContextRestored: PropTypes.func,
    onRemove: PropTypes.func,
    onStyleData: PropTypes.func,
    onSourceData: PropTypes.func,
    onSourceDataLoading: PropTypes.func,
    onData: PropTypes.func,
    onDataLoading: PropTypes.func,
    onRender: PropTypes.func,
    onContextMenu: PropTypes.func,
    onStyleDataLoading: PropTypes.func,
    onError: PropTypes.func
  }

  static contextTypes = {
    map: PropTypes.object
  }

  render () {
    return (
      <Children>
        {_.map(MapEvents.propTypes, (_, type) => (
          this.props[type] ? (
            <MapEvent
              key={type}
              type={type.slice(2).toLowerCase()}
              onChange={this.props[type]}
            />
          ) : null
        ))}
      </Children>
    )
  }
}

export default MapEvents
