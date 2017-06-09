import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Image extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    image: PropTypes.any // HTMLImageElement | ArrayBufferView
  }

  static contextTypes = {
    map: PropTypes.object
  }

  componentDidMount () {
    let {map} = this.context
    map.addImage(this.props.name, this.props.image, _.omit(this.props, 'name', 'image'))
  }

  componentWillUnmount () {
    let {map} = this.context
    map.removeImage(this.props.name)
  }

  render () {
    return null
  }
}

export default Image
