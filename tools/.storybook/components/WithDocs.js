import './WithDocs.css'
import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import 'prismjs/themes/prism.css'

class WithSource extends React.Component {
  static propTypes = {
    description: PropTypes.string,
    blocks: PropTypes.array,
    children: PropTypes.node
  }

  componentDidMount () {
    document.body.className += ' has-storybook-with-docs'
  }

  componentWillUnmount () {
    document.body.className = document.body.className.replace('has-storybook-with-docs', '')
  }

  render () {
    return (
      <div className='storybook-with-docs'>
        {this.props.blocks.map((block) => (
          <div className='block'>
            {block.markdown ? (
              <ReactMarkdown className='description' source={block.markdown} />
            ) : null}
            {block.code ? (
              <div className='source'>
                <pre dangerouslySetInnerHTML={{__html: block.code}} />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    )
  }
}

export default WithSource
