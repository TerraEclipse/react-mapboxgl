/**
 * Mapbox - Toggle
 *
 * ## Toggle Features in a Layer
 * 'Toggles' features in a layer, using them in a children render function to add a fill color.
 */
import React from 'react'
import {MapGL, Source, Layer, Toggle} from '../'
import Overlay from './components/Overlay'
import Checkbox from './components/Checkbox'
import {defaults} from './_utils'

class Story extends React.Component {
  state = {
    multiple: false
  }
  render () {
    return (
      <MapGL {...defaults}>
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
        <Toggle
          layer='states-fill'
          property='name'
          multiple={this.state.multiple}
          closeOnClickOutside={false}
        >
          {({properties: names}) => (
            <Layer
              id='states-toggled'
              source='states'
              type='fill'
              paint={{
                'fill-color': '#ff0e0e',
                'fill-opacity': 0.4
              }}
              filter={[
                'in',
                'name',
                '',
                ...names
              ]}
            />
          )}
        </Toggle>
        <Overlay>
          <Checkbox
            name='multiple'
            onChange={() => {
              this.setState((state) => {
                state.multiple = !state.multiple
              })
            }}
            checked={this.state.multiple}
          />
        </Overlay>
      </MapGL>
    )
  }
}

export default Story
