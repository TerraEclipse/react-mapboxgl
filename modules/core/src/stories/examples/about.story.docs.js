/**
 * Examples - About
 *
 * ## About the Examples
 *
 */

/**
 * The examples are all wrapped in the required MapboxProvider. You need to
 * do so in your own App as well.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {MapboxProvider} from '@react-mapboxgl/core'

ReactDOM.render((
  <App>
    <MapboxProvider accessToken='[your access token]'>
      {/* ... the rest of your app */}
    </MapboxProvider>
  </App>
), document.getElementById('root'))


/**
 * The default options fed into most of the maps are:
 */
const defaults = {
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
