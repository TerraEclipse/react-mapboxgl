import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Control extends React.Component {
  static propTypes = {
    type: PropTypes.oneOfType([
      PropTypes.oneOf([
        'Navigation',
        'Geolocate',
        'Attribution',
        'Scale',
        'Fullscreen'
      ]),
      PropTypes.object,
      PropTypes.func
    ]).isRequired,
    position: PropTypes.string
  }

  static defaultProps = {
    position: 'top-right'
  }

  static contextTypes = {
    map: PropTypes.object,
    mapboxgl: PropTypes.object
  }

  createControl (props) {
    let {mapboxgl} = this.context
    let ControlClass = (typeof props.type === 'string')
      ? mapboxgl[`${props.type}Control`]
      : props.type
    let options = _.omit(props, 'type', 'position')

    return new ControlClass(options)
  }

  componentDidMount () {
    let {map} = this.context
    this.control = this.createControl(this.props)
    map.addControl(this.control, this.props.position)
  }

  componentWillUnmount () {
    let {map} = this.context
    map.removeControl(this.control)
  }

  componentWillReceiveProps (nextProps) {
    let {map} = this.context
    if (!_.isEqual(this.props, nextProps)) {
      map.removeControl(this.control)
      this.control = this.createControl(nextProps)
      map.addControl(this.control, nextProps.position)
    }
  }

  render () {
    return null
  }
}

export default Control
