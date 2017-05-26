/**
 * Mapbox - Images
 *
 * ## Load and Use Custom Images
 * Loads images into the map sprite (limited size), then use them in
 * layer paint options. Assumes a webpack setup with `url-loader` for images.
 */
import React from 'react'
import {MapGL, LoadImages, Layer} from '../'
import {defaults} from './_utils'

const Story = () => (
  <MapGL {...defaults}>
    <LoadImages
      giants={require('./assets/giants.png')}
      nats={require('./assets/nats.png')}
      greenPattern={require('./assets/green-pattern.jpg')}
    >
      <Layer
        id='teams'
        type='symbol'
        source={{
          id: 'teams',
          type: 'geojson',
          data: {
            'type': 'FeatureCollection',
            'features': [{
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [-77.03238901390978, 38.913188059745586]
              },
              'properties': {
                'title': 'Washington Nationals',
                'icon-image': 'nats'
              }
            }, {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [-122.414, 37.776]
              },
              'properties': {
                'title': 'San Fransisco Giants',
                'icon-image': 'giants'
              }
            }]
          }
        }}
        layout={{
          'icon-image': '{icon-image}'
        }}
      />
      <Layer
        id='maine'
        type='fill'
        source={{
          id: 'maine',
          type: 'geojson',
          data: {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [[
                [-67.13734351262877, 45.137451890638886],
                [-66.96466, 44.8097],
                [-68.03252, 44.3252],
                [-69.06, 43.98],
                [-70.11617, 43.68405],
                [-70.64573401557249, 43.090083319667144],
                [-70.75102474636725, 43.08003225358635],
                [-70.79761105007827, 43.21973948828747],
                [-70.98176001655037, 43.36789581966826],
                [-70.94416541205806, 43.46633942318431],
                [-71.08482, 45.3052400000002],
                [-70.6600225491012, 45.46022288673396],
                [-70.30495378282376, 45.914794623389355],
                [-70.00014034695016, 46.69317088478567],
                [-69.23708614772835, 47.44777598732787],
                [-68.90478084987546, 47.184794623394396],
                [-68.23430497910454, 47.35462921812177],
                [-67.79035274928509, 47.066248887716995],
                [-67.79141211614706, 45.702585354182816],
                [-67.13734351262877, 45.137451890638886]
              ]]
            }
          }
        }}
        paint={{
          'fill-pattern': 'greenPattern'
        }}
      />
    </LoadImages>
  </MapGL>
)

export default Story
