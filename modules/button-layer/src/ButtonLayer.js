import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Children, Layer, LayerEvents, Source} from '@react-mapboxgl/core'
import Click from '@react-mapboxgl/click'
import Hover from '@react-mapboxgl/hover'

class ButtonLayer extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    property: PropTypes.string.isRequired,

    // Source
    source: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired,
    sourceLayer: PropTypes.string,

    // Layers & styles
    base: PropTypes.object.isRequired,
    border: PropTypes.object,
    hover: PropTypes.object,
    hoverBorder: PropTypes.object,
    active: PropTypes.object,
    activeBorder: PropTypes.object,
    activeProperty: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),

    // Hover
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

  render () {
    let {
      id, source, sourceLayer, property,
      base, border, hover, hoverBorder,
      active, activeBorder, activeProperty,
      cursor, onHoverOver, onHoverOut,
      clickEvent, avoidDoubleClick, doubleClickSpeed, onClick
    } = this.props
    let sourceId = typeof source === 'string' ? source : source.id
    return (
      <Children>
        {typeof source !== 'string' ? (
          <Source {...source} />
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
            {({properties}) => {
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
            }}
          </Hover>
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
