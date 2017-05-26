import _ from 'lodash'

export const defaults = {
  accessToken: 'pk.eyJ1IjoidGVycmEiLCJhIjoiVmNta3lMSSJ9.V4vST11PV1hulV2Mf9DqdQ',
  style: 'mapbox://styles/mapbox/streets-v9',
  bbox: [[-123.881836, 25.063209], [-65.170898, 48.848451]],
  center: [-95.844727, 39.620499],
  zoom: 3,
  padding: 30,
  containerStyle: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  }
}

export function sanitizeMapEvent (e) {
  return _.mapValues(e, (val, key) => {
    switch (key) {
      case 'originalEvent':
      case 'target':
        return `[${key}]`
      default:
        return val
    }
  })
}
