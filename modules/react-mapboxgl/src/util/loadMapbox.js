import mapboxPkg from 'mapbox-gl/package.json'

// Load mapbox script and/or css.
export default function loadMapbox (css = true) {
  let load = new Promise((resolve, reject) => {
    // Already loaded?
    if (window && window.mapboxgl) {
      return resolve()
    }

    // Do the load.
    if (window) {
      Promise.all([
        loadScript(`https://api.mapbox.com/mapbox-gl-js/v${mapboxPkg.version}/mapbox-gl.js`),
        css
          ? loadCSS(`https://api.mapbox.com/mapbox-gl-js/v${mapboxPkg.version}/mapbox-gl.css`)
          : Promise.resolve()
      ]).then(resolve).catch(reject)
    } else {
      return reject(new Error('Cannot load mapbox in a non-browser environment'))
    }
  })

  return load.then(() => {
    if (window.mapboxgl.supported()) {
      return window.mapboxgl
    } else {
      return Promise.reject(new Error('MapboxGL not supported'))
    }
  })
}

// Helper to load a script.
function loadScript (src) {
  return new Promise((resolve, reject) => {
    try {
      var script = document.createElement('script')
      script.src = src
      script.onload = resolve
      script.onerror = reject
      document.head.appendChild(script)
    } catch (err) {
      reject(err)
    }
  })
}

// Helper to load a stylesheet.
function loadCSS (url) {
  return new Promise((resolve, reject) => {
    try {
      var style = document.createElement('style')
      style.textContent = '@import "' + url + '"'

      var fi = setInterval(function () {
        try {
          // Only populated when file is loaded
          if (style.sheet.cssRules) {
            clearInterval(fi)
            resolve()
          }
        } catch (e) {}
      }, 10)

      document.head.appendChild(style)
    } catch (err) {
      reject(err)
    }
  })
}
