import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Children, Image} from './'

class LoadImages extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node
  }

  static contextTypes = {
    map: PropTypes.object
  }

  state = {
    loaded: false,
    images: {}
  }

  constructor () {
    super()
    this.loadImage = this.loadImage.bind(this)
  }

  componentDidMount () {
    this.mounted = true
    this.loadImages(_.omit(this.props, 'children'))
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEqual(
      _.omit(this.props, 'children'),
      _.omit(nextProps, 'children')
    )) {
      this.loadImages(_.omit(this.props, 'children'))
    }
  }

  componentWillUnmount () {
    this.mounted = false
  }

  loadImages (images) {
    this.setState({loaded: false})
    Promise.all(_.map(images, this.loadImage)).then((results) => {
      if (this.mounted) {
        this.setState({
          loaded: true,
          images: _.fromPairs(results)
        })
      }
    })
  }

  loadImage (src, name) {
    let {map} = this.context
    return new Promise((resolve, reject) => {
      map.loadImage(src, (err, image) => {
        if (err) return reject(err)
        resolve([name, image])
      })
    })
  }

  render () {
    return (
      <Children>
        {_.map(this.state.images, (image, name) => (
          <Image key={name} name={name} image={image} />
        ))}
        {this.state.loaded ? this.props.children : null}
      </Children>
    )
  }
}

export default LoadImages
