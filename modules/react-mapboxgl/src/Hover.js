import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import throttleRAF from '@terraeclipse/throttle-raf-decorator'
import Children from './Children'
import LayerEvent from './LayerEvent'

class Hover extends React.Component {
  static propTypes = {
    layer: PropTypes.string.isRequired,
    property: PropTypes.string.isRequired,
    cursor: PropTypes.string,
    onHoverOver: PropTypes.func,
    onHoverOut: PropTypes.func,
    children: PropTypes.func
  }

  static defaultProps = {
    cursor: 'pointer'
  }

  static contextTypes = {
    map: PropTypes.object
  }

  state = {
    properties: [],
    features: []
  }

  @throttleRAF
  handleMouseMove (e) {
    let propertyPath = `properties.${this.props.property}`
    let properties = _.map(e.features, propertyPath)
    let over = _.difference(properties, this.state.properties)
    let out = _.difference(this.state.properties, properties)
    if (over.length || out.length) {
      if (out.length && this.props.onHoverOut) {
        _.each(out, (property) => {
          this.props.onHoverOut(e, _.find(this.state.features, [propertyPath, property]))
        })
      }
      if (over.length && this.props.onHoverOver) {
        _.each(over, (property) => {
          this.props.onHoverOver(e, _.find(e.features, [propertyPath, property]))
        })
      }
      if (this.props.cursor) {
        this.context.map.getCanvas().style.cursor = this.props.cursor
      }
      this.setState({
        properties: properties,
        features: e.features
      })
    }
  }

  @throttleRAF
  handleMouseLeave (e) {
    if (this.state.properties && this.props.onHoverOut) {
      _.each(this.state.features, (feature) => {
        this.props.onHoverOut(e, feature)
      })
    }
    if (this.props.cursor) {
      this.context.map.getCanvas().style.cursor = ''
    }
    this.setState({
      properties: [],
      features: []
    })
  }

  render () {
    return (
      <Children>
        <LayerEvent
          type='mousemove'
          layer={this.props.layer}
          onChange={this.handleMouseMove}
        />
        <LayerEvent
          type='mouseleave'
          layer={this.props.layer}
          onChange={this.handleMouseLeave}
        />
        {this.props.children
          ? (typeof this.props.children === 'function')
            ? this.props.children(this.state)
            : this.props.children
          : null
        }
      </Children>
    )
  }
}

export default Hover
