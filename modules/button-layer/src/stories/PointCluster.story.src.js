/**
 * ButtonLayer - Point Clustering
 *
 * ## ButtonLayer Example - Point Clustering
 *
 * Uses the ButtonLayer 'meta component' to add points with clustering.
 */
import React from 'react'
import {mapDefaults} from '@react-mapboxgl/docs'
import {MapGL} from '@react-mapboxgl/core'
import ButtonLayer from '../'

class Story extends React.Component {
  render () {
    return (
      <MapGL {...mapDefaults} style='mapbox://styles/mapbox/dark-v9'>
        <ButtonLayer
          id='earthquakes'
          source={{
            // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
            // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
            type: 'geojson',
            data: 'https://raw.githubusercontent.com/TerraEclipse/react-mapboxgl/master/assets/earthquakes.geojson',
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
          }}
          base={{
            type: 'circle',
            filter: ['!has', 'point_count'],
            paint: {
              'circle-color': '#11b4da',
              'circle-radius': 4,
              'circle-stroke-width': 1,
              'circle-stroke-color': '#fff'
            }
          }}
          cluster={{
            type: 'circle',
            filter: ['has', 'point_count'],
            paint: {
              'circle-color': {
                property: 'point_count',
                type: 'interval',
                stops: [
                  [0, '#51bbd6'],
                  [100, '#f1f075'],
                  [750, '#f28cb1']
                ]
              },
              'circle-radius': {
                property: 'point_count',
                type: 'interval',
                stops: [
                  [0, 20],
                  [100, 30],
                  [750, 40]
                ]
              }
            }
          }}
          clusterLabel={{
            type: 'symbol',
            filter: ['has', 'point_count'],
            layout: {
              'text-field': '{point_count_abbreviated}',
              'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
              'text-size': 12
            }
          }}
        />
      </MapGL>
    )
  }
}

export default Story
