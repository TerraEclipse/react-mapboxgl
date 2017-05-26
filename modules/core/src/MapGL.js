/**
 * A minor clean-up of react-mapbox-gl/map.
 */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import loadMapbox from './util/loadMapbox'
import MapEvents from './MapEvents'
import MapOptions from './MapOptions'
import MapPosition from './MapPosition'
import MapInteraction from './MapInteraction'
import Children from './Children'

class MapGL extends React.Component {
  static propTypes = {
    accessToken: PropTypes.string.isRequired,
    containerStyle: PropTypes.object,
    loadCSS: PropTypes.bool,
    renderUnsupported: PropTypes.func,
    onLoad: PropTypes.func,
    onStyleLoad: PropTypes.func
    // MapOptions
    // MapPosition
    // MapInteraction
    // MapEvents
  }

  static defaultProps = {
    loadCSS: true,
    containerStyle: {
      position: 'relative'
    }
  }

  static childContextTypes = {
    map: PropTypes.object,
    mapboxgl: PropTypes.object
  }

  state = {
    unsupported: false,
    map: null,
    mapboxgl: null
  }

  getChildContext = () => ({
    map: this.state.map,
    mapboxgl: this.state.mapboxgl
  })

  componentDidMount () {
    loadMapbox({loadCSS: this.props.loadCSS})
      .then((mapboxgl) => {
        if (!this.unmounted) {
          this.setState({mapboxgl: mapboxgl})
          this.createMap(mapboxgl)
        }
      })
      .catch((err) => {
        if (!this.unmounted) {
          console.warn(err)
          this.setState({unsupported: true})
        }
      })
  }

  componentWillUnmount () {
    const {map} = this.state
    this.unmounted = true
    if (map) {
      map.off()
      // NOTE: We need to defer removing the map to after all
      // children have unmounted
      setImmediate(() => {
        map.remove()
      })
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      !_.isEqual(this.props, nextProps) ||
      !_.isEqual(this.state, nextState)
    )
  }

  componentWillReceiveProps (nextProps) {
    let {map} = this.state
    if (map && !_.isEqual(this.props.containerStyle, nextProps.containerStyle)) {
      map.resize()
    }
  }

  createMap (mapboxgl) {
    mapboxgl.accessToken = this.props.accessToken

    // Build options from sub-components.
    const options = _.extend(
      {container: this.container},
      MapOptions.getOptions(this.props),
      MapPosition.getOptions(this.props),
      MapInteraction.getOptions(this.props)
    )

    // Create map.
    const map = new mapboxgl.Map(options)

    // On map load, trigger events and set state.
    map.on('load', (...args) => {
      if (!this.unmounted) {
        if (this.props.onLoad) {
          this.props.onLoad(...args)
        }
        this.setState({map})
      }
    })

    // Optionally handle style.load.
    if (this.props.onStyleLoad) {
      map.on('style.load', this.props.onStyleLoad)
    }

    return map
  }

  renderUnsupported () {
    return this.props.renderUnsupported ? (
      this.props.renderUnsupported()
    ) : (
      <div className='unsupported'>
        Your browser does not support WebGL-based maps.
      </div>
    )
  }

  render () {
    const {containerStyle, className} = this.props
    const {unsupported, map} = this.state
    return (
      <div
        ref={(x) => { this.container = x }}
        className={`react-mapbox--container ${className || ''}`}
        style={containerStyle}
      >
        {unsupported ? (
          this.renderUnsupported()
        ) : map ? (
          <Children>
            <MapOptions {...this.props} />
            <MapPosition {...this.props} />
            <MapInteraction {...this.props} />
            <MapEvents {...this.props} />
            {this.props.children}
          </Children>
        ) : null}
      </div>
    )
  }
}

export default MapGL
