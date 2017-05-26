import React from 'react'
import PropTypes from 'prop-types'

class MapEvent extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  static contextTypes = {
    map: PropTypes.object
  }

  componentDidMount () {
    let {map} = this.context
    map.on(this.props.type, this.props.onChange)
  }

  componentWillUnmount () {
    let {map} = this.context
    map.off(this.props.type, this.props.onChange)
  }

  componentWillReceiveProps (nextProps) {
    let {map} = this.context
    if (
      (this.props.type !== nextProps.type) ||
      (this.props.onChange !== nextProps.onChange)
    ) {
      map.off(this.props.type, this.props.onChange)
      map.on(nextProps.type, nextProps.onChange)
    }
  }

  render () {
    return null
  }
}

export default MapEvent
