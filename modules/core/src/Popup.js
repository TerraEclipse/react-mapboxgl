import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

/**
 * Open a mapbox-gl 'native' popup.
 *
 * Note: It's usually not going to be a good idea to use the `closeButton` or
 * `closeOnClick` options, because they can conflict with the mounted state of
 * your popup. You should instead 'close' your own <Popup> component by simply
 * unrendering it. If you want a close button, it would be better to render and
 * manage it yourself (tied to some state that controls the rendering of the
 * Popup).
 */
class Popup extends React.Component {
  static propTypes = {
    // Popup options.
    closeButton: PropTypes.bool,
    closeOnClick: PropTypes.bool,
    anchor: PropTypes.string,
    offset: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.array,
      PropTypes.object
    ]),

    // Coordinates.
    coordinates: PropTypes.array,

    // Only one of the following.
    text: PropTypes.string,
    html: PropTypes.string,
    children: PropTypes.node,

    // Events.
    onClose: PropTypes.func
  }

  static defaultProps = {
    closeButton: false,
    closeOnClick: false
  }

  static contextTypes = {
    map: PropTypes.object,
    mapboxgl: PropTypes.object
  }

  componentDidMount () {
    // Setup popup div.
    this.el = document.createElement('div')
    this.el.className = 'react-mapbox--popup'
    _.extend(this.el.style, {
      position: 'relative',
      display: 'inline-block'
    })

    // Add popup to map.
    this.addPopup(this.props)
  }

  componentWillUnmount () {
    if (this.component) {
      ReactDOM.unmountComponentAtNode(this.el)
      this.component = null
    }
    this.removePopup()
    this.el = null
  }

  componentWillReceiveProps (nextProps) {
    // For options or content, we need to make a new popup.
    if (
        !_.isEqual(this.getOptions(this.props), this.getOptions(nextProps)) ||
        !_.isEqual(this.props.html, nextProps.html) ||
        !_.isEqual(this.props.text, nextProps.text) ||
        !_.isEqual(this.props.onClose, nextProps.onClose)
      ) {
      this.removePopup()
      this.addPopup(nextProps)
      return
    }

    // Otherwise update the current popup.
    if (!_.isEqual(this.props.coordinates, nextProps.coordinates)) {
      this.popup.setLngLat(nextProps.coordinates)
    }
    if (this.props.children !== nextProps.children) {
      this.renderChildren(nextProps)
    }
  }

  getOptions (props) {
    return _.omitBy(_.pick(props, [
      'closeButton',
      'closeOnClick',
      'anchor',
      'offset'
    ]), _.isNil)
  }

  addPopup (props) {
    let {map, mapboxgl} = this.context
    this.popup = new mapboxgl.Popup(this.getOptions(props))
    if (this.props.onClose) {
      this.popup.on('close', this.props.onClose)
    }
    if (props.coordinates) {
      this.popup.setLngLat(props.coordinates)
    }
    if (props.html) {
      this.popup.setHTML(props.html)
    }
    if (props.text) {
      this.popup.setText(props.text)
    }
    if (props.children) {
      this.renderChildren(props)
      this.popup.setDOMContent(this.el)
    }
    this.popup.addTo(map)
  }

  removePopup () {
    if (this.popup.isOpen()) {
      this.popup.off('close')
      this.popup.remove()
    }
    this.popup = null
  }

  renderChildren (props) {
    if (this.component) {
      ReactDOM.unmountComponentAtNode(this.el)
    }
    if (props.children) {
      this.component = ReactDOM.unstable_renderSubtreeIntoContainer(this,
        React.Children.only(props.children),
        this.el
      )
    }
  }

  render () {
    return null
  }
}

export default Popup
