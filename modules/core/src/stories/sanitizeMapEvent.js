import _ from 'lodash'

export default function sanitizeMapEvent (e) {
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
