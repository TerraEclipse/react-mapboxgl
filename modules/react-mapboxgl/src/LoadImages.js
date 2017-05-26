import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Children, Image} from './'

class LoadImages extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  static contextTypes = {
    map: PropTypes.object
  }

  state = {
    images: {},
    loaded: false
  }

  constructor () {
    super()
    this.loadImage = this.loadImage.bind(this)
  }

  componentDidMount () {
    let images = _.omit(this.props, 'children')
    Promise.all(_.map(images, this.loadImage)).then(() => {
      this.setState({loaded: true})
    })
  }

  loadImage (src, name) {
    let {map} = this.context
    return new Promise((resolve, reject) => {
      map.loadImage(src, (err, image) => {
        if (err) return reject(err)
        this.setState((state) => {
          state.images[name] = image
          return state
        })
        resolve()
      })
    })
  }

  render () {
    return this.state.loaded ? (
      <Children>
        {_.map(this.state.images, (image, name) => (
          <Image key={name} name={name} image={image} />
        ))}
        {this.props.children}
      </Children>
    ) : null
  }
}

export default LoadImages
