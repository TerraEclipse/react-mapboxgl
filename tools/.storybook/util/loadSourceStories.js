import React from 'react'
import {storiesOf} from '@storybook/react'
import parseComment from './parseComment'
import WithSource from '../components/WithSource'
import MapboxProvider from '../../../modules/core/src/MapboxProvider'

// Mapbox access token.
const TOKEN = 'pk.eyJ1IjoidGVycmEiLCJhIjoiVmNta3lMSSJ9.V4vST11PV1hulV2Mf9DqdQ'

/**
 * Load `*.story.src.js` files, which render with description,
 * example, and source code.
 */
export default function loadSourceStories () {
  // Create webpack require contexts for 'source' stories and load them.
  const reqSourceStory = require.context('../../../modules', true, /\.\/[^/]+\/src\/.*\.story\.src\.js$/)
  const reqSourceRaw = require.context('!!raw-loader!../../../modules', true, /\.\/[^/]+\/src\/.*\.story\.src\.js$/)
  const reqSourcePrism = require.context('!!prismjs-loader?lang=jsx!../../../modules', true, /\.\/[^/]+\/src\/.*\.story\.src\.js$/)
  reqSourceStory.keys().forEach((filepath) => {
    let Story = reqSourceStory(filepath).default
    let raw = reqSourceRaw(filepath)
    let source = reqSourcePrism(filepath)
    let meta = parseComment(raw)

    // Remove the docblock from the source because its redundant with the
    // rendered markdown description.
    source = source.replace(/^<span class="token comment"[^>]+>[^<]*<\/span>/, '')
    source = source.trim()

    // Add the story.
    storiesOf(meta.category).add(meta.label, () => (
      <WithSource
        description={meta.description}
        source={source}
      >
        <MapboxProvider accessToken={TOKEN}>
          <Story />
        </MapboxProvider>
      </WithSource>
    ))
  })
}
