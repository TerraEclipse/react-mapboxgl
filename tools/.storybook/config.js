import {configure, setAddon} from '@kadira/storybook'
import infoAddon from '@kadira/react-storybook-addon-info'
import loadStories from './util/loadStories'
import loadSourceStories from './util/loadSourceStories'

// Setup addons.
setAddon(infoAddon)

// Configure storybook.
configure(() => {
  loadStories()
  loadSourceStories()
}, module)
