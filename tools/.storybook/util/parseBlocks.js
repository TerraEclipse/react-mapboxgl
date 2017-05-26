// Helper to parse comment -> code blocks from source.
export default function parseBlocks (raw, source) {
  let blocks = []
  let rawRegex = /\/\*\*[^*]*\*+(?:[^*/][^*]*\*+)*\//m
  let sourceRegex = /^<span class="token comment"[^>]+>\/\*\*[^<]*<\/span>/m

  // Remove the first comment from the raw.
  raw = raw.replace(rawRegex, '')
  raw = raw.trim()

  // Remove the top docblock from the source.
  source = source.replace(sourceRegex, '')
  source = source.trim()

  // Parse out the comment blocks from the raw.
  while (raw.length) {
    let result = rawRegex.exec(raw)
    if (result) {
      blocks.push({comment: result[0]})
      raw = raw.slice(result.index + result[0].length)
    } else {
      break
    }
  }

  // Parse out the code blocks from source.
  let block = 0
  while (source.length) {
    let result = sourceRegex.exec(source)
    if (result) {
      if (result.index === 0) {
        source = source.slice(result[0].length)
      } else {
        blocks[block++].code = source.slice(0, result.index)
        source = source.slice(result.index + result[0].length)
      }
    } else {
      blocks[block++].code = source
      break
    }
  }

  // Parse block comments into markdown.
  blocks.forEach((block) => {
    if (block.comment) {
      // Split into lines without comment syntax.
      var lines = block.comment.split('\r\n').map((line) => {
        return line.replace(/^(\/\*\*?\s?)|(\s?\*\*?\/?\s?)/gm, '')
      })

      // Join back into markdown.
      block.markdown = lines.join('\n')
    }
  })

  // Trim newlines from stuff.
  blocks.forEach((block) => {
    if (block.markdown) {
      block.markdown = block.markdown.trim()
    }
    if (block.code) {
      block.code = block.code.trim()
    }
  })

  return blocks
}
