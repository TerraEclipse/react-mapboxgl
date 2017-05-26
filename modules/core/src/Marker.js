import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Marker extends React.Component {
  static propTypes = {
    coordinates: PropTypes.array,
    offset: PropTypes.array,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    offset: [0, 0]
  }

  static contextTypes = {
    map: PropTypes.object,
    mapboxgl: PropTypes.object
  }

  componentDidMount () {
    // Setup marker div.
    this.el = document.createElement('div')
    this.el.className = 'react-mapbox--marker'
    _.extend(this.el.style, {
      position: 'relative',
      width: 0,
      height: 0,
      overflow: 'visible'
    })

    // Render children.
    this.renderChildren(this.props)

    // Add marker to map.
    this.addMarker(this.props)
  }

  componentWillUnmount () {
    if (this.component) {
      ReactDOM.unmountComponentAtNode(this.el)
      this.component = null
    }
    this.marker.remove()
    this.el = null
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEqual(this.props.coordinates, nextProps.coordinates)) {
      this.marker.setLngLat(nextProps.coordinates)
    }
    if (!_.isEqual(this.props.offset, nextProps.offset)) {
      this.removeMarker()
      this.addMarker(nextProps)
    }
    if (this.props.children !== nextProps.children) {
      this.renderChildren(nextProps)
    }
  }

  addMarker (props) {
    let {map, mapboxgl} = this.context
    this.marker = new mapboxgl.Marker(this.el, {offset: props.offset})
    if (props.coordinates) {
      this.marker.setLngLat(props.coordinates)
    }
    this.marker.addTo(map)
  }

  removeMarker () {
    this.marker.remove()
    this.marker = null
  }

  renderChildren (props) {
    if (this.component) {
      ReactDOM.unmountComponentAtNode(this.el)
    }
    this.component = ReactDOM.unstable_renderSubtreeIntoContainer(this, (
      React.Children.only(props.children)
    ), this.el)
  }

  render () {
    return null
  }
}

export default Marker
