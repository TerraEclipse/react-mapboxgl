import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class LayerEvent extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    layer: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  static contextTypes = {
    map: PropTypes.object
  }

  componentDidMount () {
    let {map} = this.context
    map.on(this.props.type, this.props.layer, this.props.onChange)
  }

  componentWillUnmount () {
    let {map} = this.context
    map.off(this.props.type, this.props.layer, this.props.onChange)
  }

  componentWillReceiveProps (nextProps) {
    let {map} = this.context
    if (_.isEqual(this.props, nextProps)) {
      map.off(this.props.type, this.props.layer, this.props.onChange)
      map.on(nextProps.type, nextProps.layer, nextProps.onChange)
    }
  }

  render () {
    return null
  }
}

export default LayerEvent
