import {configure} from '@storybook/react'
import {setOptions} from '@storybook/addon-options'
import loadStories from './util/loadStories'
import loadDocsStories from './util/loadDocsStories'
import loadSourceStories from './util/loadSourceStories'

// Set storybook options.
setOptions({
  name: '@react-mapboxgl',
  url: 'https://github.com/TerraEclipse/react-mapboxgl',
  showSearchBox: false,
  downPanelInRight: false
})

// Configure storybook.
configure(() => {
  loadStories()
  loadDocsStories()
  loadSourceStories()
}, module)
