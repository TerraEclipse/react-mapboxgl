import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import diff from './util/diff'
import Source from './Source'

class Layer extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'fill',
      'line',
      'symbol',
      'circle',
      'fill-extrusion',
      'raster',
      'background'
    ]).isRequired,
    source: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired,
    sourceLayer: PropTypes.string,
    metadata: PropTypes.object,
    copy: PropTypes.string,
    minzoom: PropTypes.number,
    maxzoom: PropTypes.number,
    filter: PropTypes.array,
    layout: PropTypes.object,
    paint: PropTypes.object,
    before: PropTypes.string
  }

  static contextTypes = {
    map: PropTypes.object
  }

  componentDidMount () {
    let {map} = this.context
    let options = {}

    // Grab basic options from props.
    _.extend(options, _.omitBy(_.pick(this.props, [
      'id',
      'type',
      'metadata',
      'minzoom',
      'maxzoom',
      'filter',
      'layout',
      'paint'
    ]), _.isNil))

    // Grab 'ref' from 'copy'.
    if (this.props.copy) {
      options.ref = this.props.copy
    }

    // Check if we have a source id or object.
    if (_.isPlainObject(this.props.source)) {
      options.source = this.props.source.id || `${this.props.id}-source`
    } else {
      options.source = this.props.source
    }
    if (this.props.sourceLayer) {
      options['source-layer'] = this.props.sourceLayer
    }

    // Add the layer to the map.
    map.addLayer(options, this.props.before)
    map.fire('_addLayer', this.props.id)
  }

  componentWillUnmount () {
    let {map} = this.context
    map.removeLayer(this.props.id)
    map.fire('_removeLayer', this.props.id)
  }

  componentWillReceiveProps (nextProps) {
    let {map} = this.context

    if (!_.isEqual(this.props.filter, nextProps.filter)) {
      map.setFilter(this.props.id, nextProps.filter)
    }

    _.each(diff(this.props.layout, nextProps.layout), ({type, key, val}) => {
      map.setLayoutProperty(this.props.id, key, type === 'remove' ? null : val)
    })

    _.each(diff(this.props.paint, nextProps.paint), ({type, key, val}) => {
      map.setPaintProperty(this.props.id, key, type === 'remove' ? null : val)
    })

    if (this.props.before !== nextProps.before) {
      map.moveLayer(this.props.id, nextProps.before)
    }

    if (this.props.minZoom !== nextProps.minZoom ||
        this.props.maxZoom !== nextProps.maxZoom) {
      map.setLayerZoomRange(this.props.id, nextProps.minZoom, nextProps.maxZoom)
    }
  }

  render () {
    // Render our source, or nothing.
    return _.isPlainObject(this.props.source)
      ? <Source id={`${this.props.id}-source`} {...this.props.source} />
      : null
  }
}

export default Layer
