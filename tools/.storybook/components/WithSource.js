import './WithSource.css'
import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import 'prismjs/themes/prism.css'

class WithSource extends React.Component {
  static propTypes = {
    description: PropTypes.string,
    source: PropTypes.string,
    children: PropTypes.node
  }

  componentDidMount () {
    document.body.className += ' has-storybook-with-source'
  }

  componentWillUnmount () {
    document.body.className = document.body.className.replace('has-storybook-with-source', '')
  }

  render () {
    return (
      <div className='storybook-with-source'>
        {this.props.description ? (
          <ReactMarkdown className='description' source={this.props.description} />
        ) : null}
        <div className='labeled'>
          <div className='label'>Example</div>
          <div className='story'>
            {this.props.children}
          </div>
        </div>
        {this.props.source ? (
          <div className='labeled'>
            <div className='label'>Source</div>
            <div className='source'>
              <pre dangerouslySetInnerHTML={{__html: this.props.source}} />
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default WithSource
