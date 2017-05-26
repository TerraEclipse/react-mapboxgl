/* eslint-env jest */
import diff from './diff'

describe('diff', () => {
  it('can diff two objects', () => {
    var a = {
      meal: 'dinner',
      name: 'quiche',
      ingredients: [
        'eggs',
        'cream',
        'cheese'
      ],
      status: {
        prepared: true,
        baked: false,
        ate: false
      },
      favorite: true
    }
    var b = {
      meal: 'dinner',
      name: 'bacon quiche',
      ingredients: [
        'eggs',
        'cream',
        'cheese',
        'bacon'
      ],
      status: {
        prepared: true,
        baked: true,
        ate: true
      },
      vegetarian: false
    }
    var changes = diff(a, b)
    expect(changes).toMatchSnapshot()
  })
})
