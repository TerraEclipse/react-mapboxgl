import React from 'react'
import {storiesOf} from '@storybook/react'
import parseComment from './parseComment'
import parseBlocks from './parseBlocks'
import WithDocs from '../components/WithDocs'

/**
 * Load `*.story.docs.js` files, which render with as docs.
 */
export default function loadDocsStories () {
  // Create webpack require contexts for 'source' stories and load them.
  const reqSourceRaw = require.context('!!raw-loader!../../../modules', true, /\.\/[^/]+\/src\/.*\.story\.docs\.js$/)
  const reqSourcePrism = require.context('!!prismjs-loader?lang=jsx!../../../modules', true, /\.\/[^/]+\/src\/.*\.story\.docs\.js$/)
  reqSourceRaw.keys().forEach((filepath) => {
    let raw = reqSourceRaw(filepath)
    let source = reqSourcePrism(filepath)
    let meta = parseComment(raw)
    let blocks = parseBlocks(raw, source)

    // Remove the top docblock from the source because its redundant with the
    // rendered markdown description.
    source = source.replace(/^<span class="token comment"[^>]+>[^<]*<\/span>/, '')
    source = source.trim()

    // Add the story.
    storiesOf(meta.category).add(meta.label, () => (
      <WithDocs
        description={meta.description}
        blocks={blocks}
      />
    ))
  })
}
