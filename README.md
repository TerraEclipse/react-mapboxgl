@react-mapboxgl
===============

Note: This is a brand-new work-in-progress and so Docs and tests are a WIP. The
API likely **will** change so please lock down your version and monitor updates
carefully. Having said that, it **is** in production use, so please don't be
scared away!

About
-----

This aims to be as close of a 1-to-1 mapping of the `mapbox-gl-js` API to react as possible. It takes the largely imperative `mapbox-gl-js` codebase and wraps it in declarative react components. A few goals:

- Declarative way to create mapbox-gl maps.
- Support as close to 100% of the `mapbox-gl-js` API as makes sense.
- Leverage the `mapbox-gl-js` way of doing things wherever possible.
- "Everything is a component"
  - You should be able to do thinks like render layers, bind click handlers,
    respond to hovering over layers, ect. by merely rendering components.
  - Many maps will only need a render method, no state to juggle.
  - The core attempts to split things out to composable components wherever possible.

Inspired and bootstrapped from [react-mapbox-gl](https://github.com/alex3165/react-mapbox-gl).

Installation
------------

Currently, this module needs to be bundled by *your* app. If you are already
using something like webpack or rollup, you should be good to go. It requires
installing some peer dependencies. I chose this to avoid increasing the
bundle size if you're already using some of these libraries.

```sh
$ npm install --save @react-mapboxgl/core mapbox-gl lodash react prop-types
```

Documentation
-------------

Documentation and examples can be found in the [storybook](https://terraeclipse.github.io/react-mapboxgl).

Sandbox
-------

You can easily play around with maps on codesandbox.io:

[![Edit @react-mapboxgl Playground](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/E9p5AG5X0)


Quick Example
-------------

This renders a map, adds a source and layer to the map, and changes the fill
of polygon features when they are hovered. See it in action [in the storybook](https://terraeclipse.github.io/react-mapboxgl/?selectedKind=Examples&selectedStory=Hover&full=0&down=0).

![Hover map example](https://raw.githubusercontent.com/TerraEclipse/react-mapboxgl/master/assets/hover-map.png)

```js
import React from 'react'
import {MapboxProvider, MapGL, Source, Layer, Hover} from '@react-mapboxgl/core'

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

const ExampleMap = () => {
  return (
    <MapboxProvider accessToken='[your token]'>
      <MapGL {...mapOptions}>
        {/* Source to be used by layers (U.S. state polygons) */}
        <Source
          id='states'
          type='geojson'
          data='https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces.geojson'
        />

        {/* State fill layer */}
        <Layer
          id='states-fill'
          source='states'
          type='fill'
          paint={{
            'fill-color': '#627BC1',
            'fill-opacity': 0.5
          }}
        />

        {/* State borders layer */}
        <Layer
          id='states-borders'
          source='states'
          type='line'
          paint={{
            'line-color': '#627BC1',
            'line-width': 2
          }}
        />

        {/* Declarative handler for hovering a layer's features.

            This component optionally allows a function as the
            *children*, similar to how libraries like react-motion do. You can
            leverage that to filter layers or otherwise modify them.

            The *property* should be a member of `feature.properties` that
            uniquely identifies each feature.
        */}
        <Hover layer='states-fill' property='name'>
          {({properties: names}) => (
            <Layer
              id='states-hover'
              source='states'
              type='fill'
              paint={{
                'fill-color': '#627BC1',
                'fill-opacity': 1
              }}
              filter={[
                '==',
                'name',
                names[0] || ''
              ]}
            />
          )}
        </Hover>
      </MapGL>
    </MapboxProvider>
  )
}

export default ExampleMap
```

- - -

#### Developed by [TerraEclipse](https://github.com/TerraEclipse)

Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Santa Cruz, CA and Washington, D.C.
