/**
 * Core - Controls
 *
 * ## Map with Controls
 * An example map with all of the possible mapbox-gl-js controls added.
 */
import React from 'react'
import {mapDefaults} from '@react-mapboxgl/docs'
import {MapGL, Control} from '../'

const Story = () => (
  <MapGL {...mapDefaults}>
    <Control type='Navigation' position='top-left' />
    <Control type='Geolocate' position='top-left' watchPosition />
    <Control type='Scale' position='bottom-right' maxWidth={300} unit='imperial' />
    <Control type='Fullscreen' position='top-left' />
  </MapGL>
)

export default Story