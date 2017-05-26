/**
 * Mapbox - Markers
 *
 * ## Add Markers to a Map
 * While not as performant as Layers for large data-sets, markers make
 * it easy to add arbitrary HTML to the map.'
 */
import React from 'react'
import {action} from '@kadira/storybook'
import {MapGL, Marker} from '../'
import {defaults} from './_utils'
import Overlay from './components/Overlay'

const geojson = {
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'properties': {
        'message': 'Foo',
        'iconSize': [60, 60]
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          -66.324462890625,
          -16.024695711685304
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'message': 'Bar',
        'iconSize': [50, 50]
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          -61.2158203125,
          -15.97189158092897
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'message': 'Baz',
        'iconSize': [40, 40]
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          -63.29223632812499,
          -18.28151823530889
        ]
      }
    }
  ]
}

class Story extends React.Component {
  state = {
    size: 1
  }
  render () {
    let {size} = this.state
    return (
      <MapGL
        {...defaults}
        bbox={null}
        center={[-65.017, -16.457]}
        zoom={5}
      >
        {geojson.features.map((feature, i) => {
          let [x, y] = feature.properties.iconSize
          return (
            <Marker key={i} coordinates={feature.geometry.coordinates}>
              <div
                style={{
                  width: Math.floor(x * size),
                  height: Math.floor(y * size),
                  backgroundImage: `url('https://placekitten.com/g/${([x, y]).join('/')}/')`,
                  backgroundSize: 'cover',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  transform: 'translate(-50%, -50%)',
                  transition: 'all 500ms ease-out'
                }}
                onClick={() => action('click')(feature.properties.message)}
              />
            </Marker>
          )
        })}
        <Overlay>
          <span>Icons:</span>
          <button className='btn' onClick={() => {
            this.setState((s) => {
              s.size = s.size * 1.33333
              return s
            })
          }}>Bigger</button>
          <button className='btn' onClick={() => {
            this.setState({size: 1})
          }}>Reset</button>
        </Overlay>
      </MapGL>
    )
  }
}

export default Story
