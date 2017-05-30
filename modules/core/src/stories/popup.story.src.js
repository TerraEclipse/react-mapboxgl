/**
 * Core - Popups
 *
 * ## Add Popups to A Map
 * Adds text, html, and react children Popups to the map.
 */
import './popup.story.css'
import React from 'react'
import {mapDefaults, Options, Checkbox} from '@react-mapboxgl/docs'
import {MapGL, Layer, Popup} from '../'

const geojson = {
  'type': 'FeatureCollection',
  'features': [{
    // Example of using text for content.
    'type': 'Feature',
    'properties': {
      'id': 0,
      'name': 'Make it Mount Pleasant (Text)',
      'icon': 'theatre',
      'text': 'Make it Mount Pleasant is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.'
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
      'name': 'Capital Pride Parade (HTML)',
      'icon': 'star',
      'html': `<strong>Capital Pride Parade</strong><p>The annual <a href='http://www.capitalpride.org/parade' target='_blank' title='Opens in a new window'>Capital Pride Parade</a> makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>`
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
      'name': 'Big Backyard Bash (Children)',
      'icon': 'bar',
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
      )
    },
    'geometry': {
      'type': 'Point',
      'coordinates': [-77.090372, 38.881189]
    }
  }]
}

class Story extends React.Component {
  state = {}
  render () {
    return (
      <div>
        <MapGL
          {...mapDefaults}
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

          {/* Render the popups if checked */}
          {geojson.features.map((feature) => {
            return this.state[feature.properties.name] ? (
              <Popup
                coordinates={feature.geometry.coordinates}
                text={feature.properties.text || null}
                html={feature.properties.html || null}
              >
                {feature.properties.children || null}
              </Popup>
            ) : null
          })}
        </MapGL>
        <Options>
          {geojson.features.map((feature) => (
            <Checkbox
              key={feature.properties.id}
              name={feature.properties.name}
              onChange={(e) => {
                this.setState({[feature.properties.name]: e.currentTarget.checked})
              }}
              checked={this.state[feature.properties.name]}
              style={{flex: 1}}
            />
          ))}
        </Options>
      </div>
    )
  }
}

export default Story
