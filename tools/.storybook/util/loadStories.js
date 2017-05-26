import {storiesOf, action} from '@kadira/storybook'

/**
 * Load regular `*.story.js` files.
 */
export default function loadStories () {
  // Create webpack require context for stories and load them.
  const reqStory = require.context('../../../modules', true, /\.story\.js$/)
  reqStory.keys().forEach((filepath) => {
    reqStory(filepath).default({storiesOf, action})
  })
}
