import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import union from '@turf/union'
import {Children, Layer, LayerEvents, Source} from '@react-mapboxgl/core'
import Click from '@react-mapboxgl/click'
import Hover from '@react-mapboxgl/hover'

class ButtonLayer extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    property: PropTypes.string,

    // Source
    source: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired,
    sourceLayer: PropTypes.string,

    // Layers
    base: PropTypes.object.isRequired,
    border: PropTypes.object,
    hover: PropTypes.object,
    hoverBorder: PropTypes.object,
    cluster: PropTypes.object,
    clusterBorder: PropTypes.object,
    clusterLabel: PropTypes.object,
    active: PropTypes.object,
    activeBorder: PropTypes.object,
    activeProperty: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),

    // Hover
    hoverMode: PropTypes.string, // Either 'auto' or 'filter'.
    cursor: PropTypes.string,
    onHoverOver: PropTypes.func,
    onHoverOut: PropTypes.func,

    // Click
    clickEvent: PropTypes.string,
    avoidDoubleClick: PropTypes.bool,
    doubleClickSpeed: PropTypes.number,
    onClick: PropTypes.func

    // LayerEvents (bound to base layer)
  }

  static defaultProps = {
    hoverMode: 'auto'
  }

  static contextTypes = {
    map: PropTypes.object
  }

  constructor () {
    super()
    this.renderHoverChildren = this.renderHoverChildren.bind(this)
  }

  unionFeatures (features) {
    try {
      let result = []
      result.push(features.reduce((joined, next) => {
        if (joined.geometry.type === 'Polygon' || joined.geometry.type === 'MultiPolygon') {
          if (next.geometry.type === 'Polygon' || next.geometry.type === 'MultiPolygon') {
            return union(joined, next)
          } else {
            result.push(next)
            return joined
          }
        } else {
          result.push(joined)
          return next
        }
      }))
      return result
    } catch (e) {
      console.warn('Error detected when trying to union hovered features.')
      console.warn(e)
      return features
    }
  }

  renderHoverChildren ({properties}) {
    let {map} = this.context
    let {
      id, source, sourceLayer, property, base,
      hoverMode, hover, hoverBorder
    } = this.props
    let sourceId = (typeof source === 'string')
      ? source
      : (source.id || `${id}-source`)
    let sourceDef = map.getSource(sourceId)

    // For GeoJSON we change the data on a hover <Source/>.
    if (hoverMode !== 'filter' && sourceDef && sourceDef.type === 'geojson') {
      let features = []
      if (properties.length) {
        features = this.unionFeatures(map.querySourceFeatures(sourceId, {
          filter: ['in', property, ...properties]
        }))
      }
      return (
        <Children>
          {(hover || hoverBorder) ? (
            <Source
              id={`${sourceId}-hover`}
              type='geojson'
              data={{type: 'FeatureCollection', features}}
            />
          ) : null}

          {hover ? (
            <Layer
              id={`${id}-hover`}
              {..._.defaults({source: `${sourceId}-hover`}, hover)}
            />
          ) : null}

          {hoverBorder ? (
            <Layer
              id={`${id}-hover-border`}
              {..._.defaults({source: `${sourceId}-hover`}, hoverBorder)}
            />
          ) : null}
        </Children>
      )
    // For all other types, we use a filter on the layer.
    } else {
      return (
        <Children>
          {hover ? (
            <Layer
              id={`${id}-hover`}
              {..._.defaults({}, hover, {
                source: sourceId,
                sourceLayer: sourceLayer
              })}
              filter={base.filter
                ? ['all', ['==', property, properties[0] || ''], base.filter]
                : ['==', property, properties[0] || '']
              }
            />
          ) : null}

          {hoverBorder ? (
            <Layer
              id={`${id}-hover-border`}
              {..._.defaults({}, hoverBorder, {
                source: sourceId,
                sourceLayer: sourceLayer
              })}
              filter={base.filter
                ? ['all', ['==', property, properties[0] || ''], base.filter]
                : ['==', property, properties[0] || '']
              }
            />
          ) : null}
        </Children>
      )
    }
  }

  render () {
    let {
      id, source, sourceLayer, property,
      base, border, hover, hoverBorder,
      cluster, clusterBorder, clusterLabel,
      active, activeBorder, activeProperty,
      cursor, onHoverOver, onHoverOut,
      clickEvent, avoidDoubleClick, doubleClickSpeed, onClick
    } = this.props

    let sourceId = (typeof source === 'string')
      ? source
      : (source.id || `${id}-source`)

    return (
      <Children>
        {typeof source !== 'string' ? (
          <Source {..._.extend({}, source, {id: sourceId})} />
        ) : null}

        <Layer
          id={id}
          {..._.defaults({},
            base,
            _.omit(LayerEvents.pickEvents(this.props), 'onClick'),
            {
              source: sourceId,
              sourceLayer: sourceLayer
            }
          )}
        />

        {onClick ? (
          <Click
            layer={id}
            {...{clickEvent, avoidDoubleClick, doubleClickSpeed, onClick}}
          />
        ) : null}

        {border ? (
          <Layer
            id={`${id}-border`}
            {..._.defaults({}, border, {
              source: sourceId,
              sourceLayer: sourceLayer
            })}
            filter={base.filter}
          />
        ) : null}

        {(hover || hoverBorder || cursor || onHoverOver || onHoverOut) ? (
          <Hover layer={id} {...{property, cursor, onHoverOver, onHoverOut}}>
            {this.renderHoverChildren}
          </Hover>
        ) : null}

        {cluster ? (
          <Layer
            id={`${id}-cluster`}
            {..._.defaults({}, cluster, {
              source: sourceId,
              sourceLayer: sourceLayer
            })}
          />
        ) : null}

        {clusterBorder ? (
          <Layer
            id={`${id}-cluster-border`}
            {..._.defaults({}, clusterBorder, {
              source: sourceId,
              sourceLayer: sourceLayer
            })}
          />
        ) : null}

        {clusterLabel ? (
          <Layer
            id={`${id}-cluster-label`}
            {..._.defaults({}, clusterLabel, {
              source: sourceId,
              sourceLayer: sourceLayer
            })}
          />
        ) : null}

        {active ? (
          <Layer
            id={`${id}-active`}
            {..._.defaults({}, active, {
              source: sourceId,
              sourceLayer: sourceLayer
            })}
            filter={base.filter
              ? ['all', ['==', property, activeProperty || ''], base.filter]
              : ['==', property, activeProperty || '']
            }
          />
        ) : null}

        {activeBorder ? (
          <Layer
            id={`${id}-active-border`}
            {..._.defaults({}, activeBorder, {
              source: sourceId,
              sourceLayer: sourceLayer
            })}
            filter={base.filter
              ? ['all', ['==', property, activeProperty || ''], base.filter]
              : ['==', property, activeProperty || '']
            }
          />
        ) : null}
      </Children>
    )
  }
}

export default ButtonLayer
