import React from 'react'
import PropTypes from 'prop-types'

class LayerEvent extends React.PureComponent {
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
    if (
      (this.props.type !== nextProps.type) ||
      (this.props.layer !== nextProps.layer) ||
      (this.props.onChange !== nextProps.onChange)
    ) {
      map.off(this.props.type, this.props.layer, this.props.onChange)
      map.on(nextProps.type, nextProps.layer, nextProps.onChange)
    }
  }

  render () {
    return null
  }
}

export default LayerEvent
