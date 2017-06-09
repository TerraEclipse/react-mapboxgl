import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import diff from './util/diff'
import Children from './Children'
import Source from './Source'
import LayerEvents from './LayerEvents'

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
    // LayerEvents
  }

  static contextTypes = {
    map: PropTypes.object
  }

  state = {
    added: false
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      !_.isEqual(this.props, nextProps) ||
      !_.isEqual(this.state, nextState)
    )
  }

  componentDidMount () {
    this.addLayer(this.props)
  }

  componentWillUnmount () {
    this.removeLayer(this.props)
  }

  componentWillReceiveProps (nextProps) {
    let {map} = this.context

    // Have to recreate layer if these change.
    if (
      !_.isEqual(this.props.id, nextProps.id) ||
      !_.isEqual(this.props.type, nextProps.type) ||
      !_.isEqual(this.props.source, nextProps.source) ||
      !_.isEqual(this.props.sourceLayer, nextProps.sourceLayer) ||
      !_.isEqual(this.props.metadata, nextProps.metadata) ||
      !_.isEqual(this.props.copy, nextProps.copy)
    ) {
      this.removeLayer(this.props)
      this.addLayer(nextProps)
      return
    }

    if (!_.isEqual(this.props.filter, nextProps.filter)) {
      map.setFilter(this.props.id, nextProps.filter)
    }

    _.each(diff(this.props.layout || {}, nextProps.layout || {}), ({type, key, value}) => {
      map.setLayoutProperty(this.props.id, key, type === 'remove' ? null : value)
    })

    _.each(diff(this.props.paint || {}, nextProps.paint || {}), ({type, key, value}) => {
      map.setPaintProperty(this.props.id, key, type === 'remove' ? null : value)
    })

    if (this.props.before !== nextProps.before) {
      map.moveLayer(this.props.id, nextProps.before)
    }

    if (this.props.minZoom !== nextProps.minZoom ||
        this.props.maxZoom !== nextProps.maxZoom) {
      map.setLayerZoomRange(this.props.id, nextProps.minZoom, nextProps.maxZoom)
    }
  }

  addLayer (props) {
    let {map} = this.context
    let options = {}

    // Grab basic options from props.
    _.extend(options, _.omitBy(_.pick(props, [
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
    if (props.copy) {
      options.ref = props.copy
    }

    // Check if we have a source id or object.
    if (_.isPlainObject(props.source)) {
      options.source = props.source.id || `${props.id}-source`
    } else {
      options.source = props.source
    }
    if (props.sourceLayer) {
      options['source-layer'] = props.sourceLayer
    }

    // Add the layer to the map.
    map.addLayer(options, props.before)
    map.fire('_addLayer', props.id)
    this.setState({added: true})
  }

  removeLayer (props) {
    let {map} = this.context
    map.removeLayer(props.id)
    map.fire('_removeLayer', props.id)
    this.setState({added: false})
  }

  render () {
    return (
      <Children>
        {_.isPlainObject(this.props.source) ? (
          <Source
            id={`${this.props.id}-source`}
            {...this.props.source}
          />
        ) : null}
        {this.state.added ? (
          <LayerEvents
            layer={this.props.id}
            {...LayerEvents.pickEvents(this.props)}
          />
        ) : null}
      </Children>
    )
  }
}

export default Layer
