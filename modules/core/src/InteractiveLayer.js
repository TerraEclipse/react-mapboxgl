import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Children, Hover, Layer, Source} from './'

class InteractiveLayer extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    property: PropTypes.string.isRequired,
    source: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    sourceLayer: PropTypes.string,
    base: PropTypes.object,
    borders: PropTypes.object,
    hover: PropTypes.object,
    hoverBorder: PropTypes.object,
    active: PropTypes.object,
    activeBorder: PropTypes.object,
    activeProperty: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ])
  }

  render () {
    let {
      id, source, sourceLayer, property,
      base, borders, hover, hoverBorder,
      active, activeBorder, activeProperty
    } = this.props

    let sourceId = typeof source === 'string' ? source : source.id

    return (
      <Children>
        {typeof source !== 'string' ? (
          <Source {...source} />
        ) : null}

        {base ? (
          <Layer
            id={id}
            {..._.defaults({}, base, {
              source: sourceId,
              sourceLayer: sourceLayer
            })}
          />
        ) : null}

        {borders ? (
          <Layer
            id={`${id}-borders`}
            {..._.defaults({}, borders, {
              source: sourceId,
              sourceLayer: sourceLayer
            })}
            filter={base.filter}
          />
        ) : null}

        {(hover || hoverBorder) ? (
          <Hover layer={id} property={property}>
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

export default InteractiveLayer
