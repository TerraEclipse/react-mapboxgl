// Helper to parse meta from top comment block.
export default function parseMeta (src) {
  var regex = /\/(\*)[^*]*\*+(?:[^*/][^*]*\*+)*\//gm
  var blocks = src.match(regex)
  if (blocks) {
    // Split into lines without comment syntax.
    var lines = blocks[0].split('\n').map((line) => {
      return line.replace(/^(\/\*\*?\s?)|(\s?\*\*?\/?\s?)/g, '')
    })

    // Strip empty lines.
    while (lines[0] === '') {
      lines.shift()
    }

    // Parse category and label (and remove it).
    var [category, label] = lines[0].split(/\s-\s/).map((part) => part.trim())
    lines.shift()
    if (!category || !label) {
      throw new Error('Could not parse category or label from docblock')
    }

    // Strip empty lines.
    while (lines.length && lines[0] === '') {
      lines.shift()
    }

    // Join the rest into a description.
    var description = lines.join('\n')

    return {category, label, description}
  } else {
    return false
  }
}
