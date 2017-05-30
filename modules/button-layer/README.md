@react-mapboxgl/button-layer
============================

The `ButtonLayer` component encapsulates several styled layers pointing to the
same source. These layers provide the typical UI required for  'interactive'
features.

Props
-----

- **id (required):** The id for this layer.
- **property (required):** The unique property to identify features.
- **source:** The source (id or options).
- **sourceLayer:** The source-layer (if relevant).
- **base:** Options for the 'base' layer, the one that is always visible.
- **borders:** Options for a borders layer (if relevant).
- **hover:** Options for a hover layer (if relevant).
- **hoverBorder:** Options for a hover-border layer (if relevant).
- **active:** Options for an active layer (if relevant).
- **activeBorder:** Options for an active border layer (if relevant).
- **activeProperty:** The property value identifying the currently active feature (if one is active).

Example
-------

An example usage. See it in action [in the storybook](https://terraeclipse.github.io/react-mapboxgl/?selectedKind=ButtonLayer&selectedStory=Example).

```js
/**
 * ButtonLayer - Example
 *
 * ## ButtonLayer Example - Interactive Polygons
 *
 * Uses the ButtonLayer 'meta component' to add polygons
 * with border, hover, and active states.
 *
 * Toggle any polygon to 'zoom' into/out of it.
 */
import React from 'react'
import bbox from '@turf/bbox'
import {MapboxProvider, MapGL} from '@react-mapboxgl/core'
import Hover from '@react-mapboxgl/hover'
import Toggle from '@react-mapboxgl/toggle'
import ButtonLayer from './'

const mapOptions = {
  style: 'mapbox://styles/mapbox/streets-v9',
  bbox: [[-123.881836, 25.063209], [-65.170898, 48.848451]],
  center: [-95.844727, 39.620499],
  zoom: 3,
  padding: 30,
  containerStyle: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  }
}

class Example extends React.Component {
  state = {
    activeName: null,
    bbox: mapOptions.bbox
  }

  constructor () {
    super()
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle (feature, isOn) {
    if (isOn) {
      this.setState({
        activeName: feature.properties.name,
        bbox: bbox(feature)
      })
    } else {
      this.setState({
        activeName: null,
        bbox: mapOptions.bbox
      })
    }
  }

  render () {
    return (
      <MapboxProvider accessToken='[your token]'>
        <MapGL {...mapOptions} bbox={this.state.bbox}>
          <ButtonLayer
            id='states'
            property='name'
            activeProperty={this.state.activeName}
            source={{
              id: 'states',
              type: 'geojson',
              data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces.geojson'
            }}
            base={{
              type: 'fill',
              paint: {
                'fill-color': '#627BC1',
                'fill-opacity': 0.5
              }
            }}
            borders={{
              type: 'line',
              paint: {
                'line-color': '#627BC1',
                'line-width': 2
              }
            }}
            hover={{
              type: 'fill',
              paint: {
                'fill-color': '#627BC1',
                'fill-opacity': 1
              }
            }}
            hoverBorder={{
              type: 'line',
              paint: {
                'line-color': '#425BA1',
                'line-width': 2
              }
            }}
            active={{
              type: 'fill',
              paint: {
                'fill-color': '#ff0e0e',
                'fill-opacity': 0.4
              }
            }}
            activeBorder={{
              type: 'line',
              paint: {
                'line-color': '#ff0e0e',
                'line-width': 2
              }
            }}
          />
          <Hover layer='states' property='name'>
            {({properties: names}) => names[0] ? (
              <h2 style={{
                position: 'absolute',
                top: 10,
                left: 10,
                margin: 0,
                padding: 10,
                backgroundColor: '#333',
                color: '#ddd',
                boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)',
                zIndex: 10
              }}>
                {names[0]}
              </h2>
            ) : null}
          </Hover>
          <Toggle
            layer='states'
            property='name'
            onToggle={this.handleToggle}
            avoidDoubleClick
          />
        </MapGL>
      </MapboxProvider>
    )
  }
}

export default Example
```

- - -

#### Developed by [TerraEclipse](https://github.com/TerraEclipse)

Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Santa Cruz, CA and Washington, D.C.
