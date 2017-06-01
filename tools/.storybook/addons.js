import {setAddon} from '@storybook/react'
import infoAddon from '@storybook/addon-info'

// Registration-based addons.
import '@storybook/addon-actions/register'
import '@storybook/addon-options/register'

// Set other addons.
setAddon(infoAddon)
