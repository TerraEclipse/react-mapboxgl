/**
 * A minor clean-up of react-mapbox-gl/map.
 */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import MapEvents from './MapEvents'
import MapOptions from './MapOptions'
import MapPosition from './MapPosition'
import MapInteraction from './MapInteraction'
import Children from './Children'

class MapGL extends React.Component {
  static propTypes = {
    containerStyle: PropTypes.object,
    renderUnsupported: PropTypes.func,
    onLoad: PropTypes.func,
    onStyleLoad: PropTypes.func
    // MapOptions
    // MapPosition
    // MapInteraction
    // MapEvents
  }

  static defaultProps = {
    containerStyle: {
      position: 'relative',
      width: '100%',
      paddingBottom: '50%'
    }
  }

  static contextTypes = {
    mapboxgl: PropTypes.object
  }

  static childContextTypes = {
    map: PropTypes.object
  }

  state = {
    unsupported: false,
    map: null
  }

  getChildContext = () => ({
    map: this.state.map
  })

  shouldComponentUpdate (nextProps, nextState) {
    return (
      !_.isEqual(this.props, nextProps) ||
      !_.isEqual(this.state, nextState)
    )
  }

  componentDidMount () {
    let {mapboxgl} = this.context
    if (mapboxgl.supported()) {
      this.createMap()
    } else {
      this.setState({unsupported: true})
    }
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

  componentWillReceiveProps (nextProps) {
    let {map} = this.state
    if (map && !_.isEqual(this.props.containerStyle, nextProps.containerStyle)) {
      map.resize()
    }
  }

  createMap () {
    let {mapboxgl} = this.context

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
            <MapOptions {..._.pick(this.props, _.keys(MapOptions.propTypes))} />
            <MapPosition {..._.pick(this.props, _.keys(MapPosition.propTypes))} />
            <MapInteraction {..._.pick(this.props, _.keys(MapInteraction.propTypes))} />
            <MapEvents {..._.pick(this.props, _.keys(MapEvents.propTypes))} />
            {this.props.children}
          </Children>
        ) : null}
      </div>
    )
  }
}

export default MapGL
