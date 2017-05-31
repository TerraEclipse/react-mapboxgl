import _ from 'lodash'

/**
 * Produces a shallow diff of an object. Output is an array of
 * 'changes' where a change is either an 'add', 'remove', or 'update'.
 */
export default function diff (a, b) {
  // Throw is a or b are not objects.
  if (!_.isPlainObject(a)) {
    throw new Error('First parameter to diff() is not an object')
  }
  if (!_.isPlainObject(b)) {
    throw new Error('Second parameter to diff() is not an object')
  }

  let changes = []
  let keysA = _.keys(a)
  let keysB = _.keys(b)

  // Find the items in A that are not in B.
  _.each(_.difference(keysA, keysB), (key) => {
    changes.push({type: 'remove', key: key, value: a[key]})
  })

  // Find the items in B that are not in A.
  _.each(_.difference(keysB, keysA), (key) => {
    changes.push({type: 'add', key: key, value: b[key]})
  })

  // Find the items that are in both, but have changed.
  _.each(_.intersection(keysA, keysB), (key) => {
    if (!_.isEqual(a[key], b[key])) {
      changes.push({type: 'update', key: key, value: b[key]})
    }
  })

  return changes
}
