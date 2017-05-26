import React from 'react'
import PropTypes from 'prop-types'
import loadCSS from './util/loadCSS'
import loadScript from './util/loadScript'
import pkg from '../package.json'

class MapboxProvider extends React.Component {
  static propTypes = {
    // We need an access token.
    accessToken: PropTypes.string.isRequired,

    // Either pass in the mapbox-gl module ...
    // ... or we'll try to grab mapboxgl from the window ...
    // ... or we'll load the js/css from mapbox's CDN.
    mapboxgl: PropTypes.object,
    js: PropTypes.bool,
    css: PropTypes.bool,
    cdn: PropTypes.string,
    version: PropTypes.string
  }

  static defaultProps = {
    js: true,
    css: true,
    cdn: 'https://api.mapbox.com/mapbox-gl-js',
    version: pkg.devDependencies['mapbox-gl'].slice(1)
  }

  static childContextTypes = {
    mapboxgl: PropTypes.object
  }

  state = {
    mapboxgl: null
  }

  getChildContext = () => ({
    mapboxgl: this.state.mapboxgl
  })

  componentDidMount () {
    let {accessToken} = this.props
    this.loadMapboxGL().then((mapboxgl) => {
      if (!this.unmounted) {
        mapboxgl.accessToken = accessToken
        this.setState({mapboxgl})
      }
    }).catch((err) => {
      throw err
    })
  }

  componentWillUnount () {
    this.unmounted = false
  }

  loadMapboxGL () {
    let {mapboxgl, js, css, version, cdn} = this.props
    return new Promise((resolve, reject) => {
      if (mapboxgl) {
        resolve(mapboxgl)
      } else if (window && window.mapboxgl) {
        resolve(window.mapboxgl)
      } else if (window) {
        Promise.all([
          js
            ? loadScript(`${cdn}/v${version}/mapbox-gl.js`)
            : Promise.resolve(),
          css
            ? loadCSS(`${cdn}/v${version}/mapbox-gl.css`)
            : Promise.resolve()
        ])
        .then(() => {
          resolve(window.mapboxgl)
        })
        .catch((err) => {
          reject(err)
        })
      } else {
        reject(new Error('Cannot load mapbox in a non-browser environment'))
      }
    })
  }

  render () {
    return this.state.mapboxgl
      ? React.Children.only(this.props.children)
      : null
  }
}

export default MapboxProvider
