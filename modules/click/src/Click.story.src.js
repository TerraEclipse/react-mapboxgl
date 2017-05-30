/**
 * Click - Example
 *
 * ## Click Features in a Layer
 *
 * Adds a click handler for features in a Layer. `<Click>` provides some helpful
 * functionality around `<MapEvent>` and `<LayerEvent>` for optionally avoiding
 * double-click events (useful when you want to use double-click for zooming).
 */
import React from 'react'
import {action} from '@kadira/storybook'
import {mapDefaults} from '@react-mapboxgl/docs'
import {MapGL, Source, Layer} from '@react-mapboxgl/core'
import Click from './'

class Story extends React.Component {
  state = {
    multiple: false
  }

  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e, features) {
    action('click')(features)
  }

  render () {
    return (
      <MapGL {...mapDefaults}>
        <Source
          id='states'
          type='geojson'
          data='https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces.geojson'
        />
        <Layer
          id='states-fill'
          source='states'
          type='fill'
          paint={{
            'fill-color': '#627BC1',
            'fill-opacity': 0.5
          }}
        />
        <Layer
          id='states-borders'
          source='states'
          type='line'
          paint={{
            'line-color': '#627BC1',
            'line-width': 2
          }}
        />
        <Click
          layer='states-fill'
          onClick={this.handleClick}
          avoidDoubleClick
        />
      </MapGL>
    )
  }
}

export default Story
