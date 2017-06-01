import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

/**
 * Load regular `*.story.js` files.
 */
export default function loadStories () {
  // Create webpack require context for stories and load them.
  const reqStory = require.context('../../../modules', true, /\.\/[^/]+\/src\/.*\.story\.js$/)
  reqStory.keys().forEach((filepath) => {
    reqStory(filepath).default({storiesOf, action})
  })
}
