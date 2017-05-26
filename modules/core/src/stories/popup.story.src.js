/**
 * Mapbox - Popups
 *
 * ## Add Popups to A Map
 * Adds text, html, and react children Popups to the map.
 */
import './popup.story.css'
import React from 'react'
import {MapGL, Layer, Toggle, Hover, Popup} from '../'
import {defaults} from './_utils'

const geojson = {
  'type': 'FeatureCollection',
  'features': [{
    // Example of using text for content.
    'type': 'Feature',
    'properties': {
      'id': 0,
      'text': 'Make it Mount Pleasant is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.',
      'icon': 'theatre'
    },
    'geometry': {
      'type': 'Point',
      'coordinates': [-77.038659, 38.931567]
    }
  }, {
    // Example of using html for content.
    'type': 'Feature',
    'properties': {
      'id': 1,
      'html': `<strong>Capital Pride Parade</strong><p>The annual <a href='http://www.capitalpride.org/parade' target='_blank' title='Opens in a new window'>Capital Pride Parade</a> makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>`,
      'icon': 'star'
    },
    'geometry': {
      'type': 'Point',
      'coordinates': [-77.043444, 38.909664]
    }
  }, {
    // Example of a popup using children react components.
    'type': 'Feature',
    'properties': {
      'id': 2,
      'children': (
        <div>
          <strong>Big Backyard Beach Bash and Wine Fest</strong>
          <p>
            EatBar (2761 Washington Boulevard Arlington VA) is throwing
            a <a
              href='http://tallulaeatbar.ticketleap.com/2012beachblanket/'
              target='_blank'
              title='Opens in a new window'
            >Big Backyard Beach Bash and Wine Fest</a> on Saturday,
            serving up conch fritters, fish tacos and crab sliders, and
            Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.
          </p>
        </div>
      ),
      'icon': 'bar'
    },
    'geometry': {
      'type': 'Point',
      'coordinates': [-77.090372, 38.881189]
    }
  }]
}

class Story extends React.Component {
  render () {
    return (
      <MapGL
        {...defaults}
        bbox={null}
        center={[-77.04, 38.907]}
        zoom={11.15}
      >
        <Layer
          id='features'
          type='symbol'
          source={{
            type: 'geojson',
            data: geojson
          }}
          layout={{
            'icon-image': '{icon}-15',
            'icon-allow-overlap': true
          }}
        />
        <Hover layer='features' property='id' />
        <Toggle layer='features' property='id'>
          {({features: [feature]}) => (feature ? (
            <Popup
              coordinates={feature.geometry.coordinates}
              text={feature.properties.text || null}
              html={feature.properties.html || null}
            >
              {
                // Have to access the children from the original geojson
                // above because the <Source> converts objects to strings
                // in properties.
                feature.properties.children
                  ? geojson.features[feature.properties.id].properties.children
                  : null
              }
            </Popup>
          ) : null)}
        </Toggle>
      </MapGL>
    )
  }
}

export default Story
