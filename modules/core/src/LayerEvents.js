import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Children from './Children'
import LayerEvent from './LayerEvent'

class LayerEvents extends React.PureComponent {
  static propTypes = {
    // Layer id.
    layer: PropTypes.string.isRequired,

    // Events.
    onDblClick: PropTypes.func,
    onClick: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchCancel: PropTypes.func,
    onContextMenu: PropTypes.func
  }

  static pickEvents (props) {
    return _.pick(
      props,
      _.keys(_.omit(LayerEvents.propTypes, 'layer'))
    )
  }

  render () {
    return (
      <Children>
        {_.map(LayerEvents.propTypes, (_, type) => (
          (this.props[type] && (type !== 'layer')) ? (
            <LayerEvent
              key={type}
              type={type.slice(2).toLowerCase()}
              layer={this.props.layer}
              onChange={this.props[type]}
            />
          ) : null
        ))}
      </Children>
    )
  }
}

export default LayerEvents
