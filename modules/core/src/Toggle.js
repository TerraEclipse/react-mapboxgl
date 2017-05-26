import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Children from './Children'
import Click from './Click'

class Toggle extends React.Component {
  static propTypes = {
    layer: PropTypes.string.isRequired,
    property: PropTypes.string.isRequired,
    multiple: PropTypes.bool,
    clickEvent: PropTypes.string,
    avoidDoubleClick: PropTypes.bool,
    doubleClickSpeed: PropTypes.number,
    closeOnClickOutside: PropTypes.bool,
    onToggle: PropTypes.func,
    children: PropTypes.func
  }

  static defaultProps = {
    multiple: false,
    closeOnClickOutside: true
  }

  static contextTypes = {
    map: PropTypes.object
  }

  state = {
    features: {}
  }

  constructor () {
    super()
    this.handleClickLayer = this.handleClickLayer.bind(this)
    this.handleClickMap = this.handleClickMap.bind(this)
    this.toggleFeature = this.toggleFeature.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.layer !== nextProps.layer) {
      this.setState({features: {}})
    }
    if (this.props.multiple !== nextProps.multiple) {
      if (!nextProps.multiple && !_.isEmpty(this.state.features)) {
        let key = _.keys(this.state.features).pop()
        this.setState({features: {
          [key]: this.state.features[key]
        }})
      }
    }
  }

  handleClickLayer (e) {
    if (this.props.multiple) {
      _.each(e.features, this.toggleFeature)
    } else if (e.features.length) {
      this.toggleFeature(e.features[0])
    }
  }

  handleClickMap (e) {
    let {map} = this.context
    let features = map.queryRenderedFeatures(e.point, {
      layers: [this.props.layer]
    })
    if (!features.length) {
      if (this.props.closeOnClickOutside) {
        this.setState({features: {}})
      }
    } else if (this.props.multiple) {
      _.each(features, this.toggleFeature)
    } else {
      this.toggleFeature(features[0])
    }
  }

  toggleFeature (feature) {
    let {features} = this.state
    let property = this.getProperty(feature)
    let isOn = true

    if (this.props.multiple) {
      if (this.state.features[property]) {
        isOn = false
        delete features[property]
      } else {
        features[property] = feature
      }
    } else {
      if (features[property]) {
        isOn = false
        features = {}
      } else {
        features = {[property]: feature}
      }
    }

    if (this.props.onToggle) {
      this.props.onToggle(feature, isOn)
    }

    this.setState({features})
  }

  getProperty (feature) {
    let propertyPath = `properties.${this.props.property}`
    let property = _.get(feature, propertyPath)
    if (typeof property !== 'undefined') {
      return property
    } else {
      throw new Error('Could not find property for <Toggle> feature')
    }
  }

  render () {
    return (
      <Children>
        {this.props.closeOnClickOutside ? (
          <Click
            event={this.props.clickEvent}
            avoidDoubleClick={this.props.avoidDoubleClick}
            doubleClickSpeed={this.props.doubleClickSpeed}
            onClick={this.handleClickMap}
          />
        ) : (
          <Click
            layer={this.props.layer}
            event={this.props.clickEvent}
            avoidDoubleClick={this.props.avoidDoubleClick}
            doubleClickSpeed={this.props.doubleClickSpeed}
            onClick={this.handleClickLayer}
          />
        )}
        {this.props.children
          ? (typeof this.props.children === 'function')
            ? this.props.children({
              features: _.values(this.state.features),
              properties: _.keys(this.state.features)
            })
            : this.props.children
          : null
        }
      </Children>
    )
  }
}

export default Toggle
