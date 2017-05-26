import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Source extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'canvas',
      'geojson',
      'image',
      'raster',
      'vector',
      'video'
    ]).isRequired,
    data: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    dataRev: PropTypes.number,
    url: PropTypes.string,
    tiles: PropTypes.array,
    tileSize: PropTypes.number,
    minzoom: PropTypes.number,
    maxzoom: PropTypes.number,
    coordinates: PropTypes.array,
    buffer: PropTypes.number,
    tolerance: PropTypes.number,
    cluster: PropTypes.bool,
    clusterRadius: PropTypes.number,
    clusterMaxZoom: PropTypes.number,
    canvas: PropTypes.string,
    animate: PropTypes.bool
  }

  static contextTypes = {
    map: PropTypes.object
  }

  componentDidMount () {
    this.addSource(this.props)
  }

  componentWillUnmount () {
    this.removeSource(this.props)
  }

  componentWillReceiveProps (nextProps) {
    let {map} = this.context

    // If any of these props change, we have to just recreate the
    // source from scratch.
    let invalidate = [
      'type',
      'url',
      'tiles',
      'tileSize',
      'minzoom',
      'maxzoom',
      'buffer',
      'tolerance',
      'cluster',
      'clusterRadius',
      'clusterMaxZoom',
      'canvas',
      'animate'
    ]
    if (!_.isEqual(
      _.pick(this.props, invalidate),
      _.pick(nextProps, invalidate)
    )) {
      this.removeSource(this.props.id)
      this.addSource(nextProps)
      return
    }

    // The coordinates changed.
    if (!_.isEqual(this.props.coordinates, nextProps.coordinates)) {
      map.getSource(nextProps.id).setCoordinates(nextProps.coordinates)
    }

    // The data changed.
    if (!_.isEqual(this.props.data, nextProps.data)) {
      map.getSource(nextProps.id).setData(nextProps.data)
    }

    // The dataRev changed (perhaps a timestamp). Use this to 'refresh'
    // an external geojson source.
    if (this.props.dataRev !== nextProps.dataRev) {
      map.getSource(nextProps.id).setData(nextProps.data)
    }
  }

  addSource (props) {
    let {map} = this.context
    let options = {}

    // Grab basic options from props.
    _.extend(options, _.omitBy(_.pick(props, [
      'type',
      'data',
      'url',
      'tiles',
      'tileSize',
      'minzoom',
      'maxzoom',
      'coordinates',
      'buffer',
      'tolerance',
      'cluster',
      'clusterRadius',
      'clusterMaxZoom',
      'canvas',
      'animate'
    ]), _.isNil))

    // Add the source.
    map.addSource(props.id, options)
    map.fire('_addSource', this.props.id)
  }

  removeSource (props) {
    let {map} = this.context
    map.removeSource(props.id)
    map.fire('_removeSource', props.id)
  }

  render () {
    return null
  }
}

export default Source
