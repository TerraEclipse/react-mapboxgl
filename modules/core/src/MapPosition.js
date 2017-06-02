import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class MapPosition extends React.Component {
  static propTypes = {
    // Map position options.
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    maxBounds: PropTypes.array,
    bearing: PropTypes.number,
    pitch: PropTypes.number,

    // Custom position options.
    bbox: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    padding: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object
    ]),
    moveMethod: PropTypes.oneOf([
      'jumpTo',
      'easeTo',
      'flyTo'
    ]),
    moveAround: PropTypes.array,
    moveAnimationOptions: PropTypes.object,
    moveFlyToOptions: PropTypes.object,

    // The positionRev provides a way to 'hard reset' the map
    // position. For example, if you want to reset the position to the
    // original props values (without changing the props values). An easy
    // way to use this would be to set it to a timestamp.
    positionRev: PropTypes.number
  }

  static defaultProps = {
    // Default map options.
    center: [
      -0.2416815,
      51.5285582
    ],
    zoom: 11,
    minZoom: 0,
    maxZoom: 20,
    bearing: 0,
    pitch: 0,

    // Default custom options.
    moveMethod: 'flyTo',
    moveAnimationOptions: {},
    moveFlyToOptions: {},
    positionRev: 0
  }

  static contextTypes = {
    map: PropTypes.object
  }

  // Called when the map is initally created.
  static getOptions (props) {
    let pickFrom = _.defaults({}, props, MapPosition.defaultProps)
    let picked = _.pick(pickFrom, _.keys(MapPosition.propTypes))
    return _.omit(picked, [
      'bbox',
      'padding',
      'moveMethod',
      'moveAround',
      'moveAnimationOptions',
      'moveFlyToOptions',
      'positionRev'
    ])
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      !_.isEqual(this.props, nextProps) ||
      !_.isEqual(this.state, nextState)
    )
  }

  componentDidMount () {
    let {map} = this.context
    if (this.props.bbox) {
      map.fitBounds(this.props.bbox, {
        padding: this.props.padding || 0,
        duration: 0
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    const {map} = this.context

    const didCenterUpdate = !_.isEqual(this.props.center, nextProps.center)
    const didZoomUpdate = this.props.zoom !== nextProps.zoom
    const didBearingUpdate = this.props.bearing !== nextProps.bearing
    const didPitchUpdate = this.props.pitch !== nextProps.pitch
    let cameraOptions = null

    // Position props changed.
    if (didZoomUpdate || didCenterUpdate || didBearingUpdate || didPitchUpdate) {
      cameraOptions = {
        center: didCenterUpdate ? nextProps.center : map.getCenter(),
        zoom: didZoomUpdate ? nextProps.zoom : map.getZoom(),
        bearing: didBearingUpdate ? nextProps.bearing : map.getBearing(),
        pitch: didPitchUpdate ? nextProps.pitch : map.getPitch(),
        around: nextProps.moveAround
      }
    }

    // PositionRev changed.
    if (this.props.positionRev !== nextProps.positionRev) {
      cameraOptions = {
        center: !_.isUndefined(nextProps.center) ? nextProps.center : map.getCenter(),
        zoom: !_.isUndefined(nextProps.zoom) ? nextProps.zoom : map.getZoom(),
        bearing: !_.isUndefined(nextProps.bearing) ? nextProps.bearing : map.getBearing(),
        pitch: !_.isUndefined(nextProps.pitch) ? nextProps.pitch : map.getPitch(),
        around: nextProps.moveAround
      }
    }

    if (cameraOptions) {
      map[nextProps.moveMethod](_.extend(
        cameraOptions,
        nextProps.moveMethod !== 'jumpTo'
          ? nextProps.moveAnimationOptions
          : {},
        nextProps.moveMethod === 'flyTo'
          ? nextProps.moveFlyToOptions
          : {}
      ))
    }

    if (!_.isEqual(this.props.bbox, nextProps.bbox)) {
      map.fitBounds(nextProps.bbox, _.extend(
        {
          padding: nextProps.padding || 0,
          linear: nextProps.moveMethod !== 'flyTo'
        },
        nextProps.moveAnimationOptions
          ? nextProps.moveAnimationOptions
          : {},
        nextProps.moveMethod === 'flyTo'
          ? nextProps.moveFlyToOptions
          : {}
      ))
    }
  }

  render () {
    return null
  }
}

export default MapPosition
