// Coerce plain JS values into modern dart-sass `Value` objects.
//
// Migrated from the legacy `sass.types.*` API (node-sass style) to the modern
// API (`sass.SassString`, `sass.SassNumber`, `sass.SassColor`, `sass.SassMap`,
// ...) required by Next 16's sass-loader. Original reference:
// https://github.com/sass-eyeglass/node-sass-utils/blob/master/lib/coercion.js

const sass = require('sass')

function hexToColor(hex) {
  if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex))
    throw new Error(`Invalid hex: ${hex}`)

  let c = hex.substring(1).split('')
  if (c.length === 3) {
    c = [c[0], c[0], c[1], c[1], c[2], c[2]]
  }
  const n = c.join('')
  return new sass.SassColor({
    red: parseInt(n.substring(0, 2), 16),
    green: parseInt(n.substring(2, 4), 16),
    blue: parseInt(n.substring(4, 6), 16),
    alpha: 1,
  })
}

function isSassValue(value) {
  return (
    value != null &&
    typeof value === 'object' &&
    typeof value.constructor === 'function' &&
    /^Sass/.test(value.constructor.name)
  )
}

function castToSass(jsValue) {
  if (jsValue && typeof jsValue.toSass === 'function') {
    return jsValue.toSass()
  } else if (isSassValue(jsValue)) {
    // already a sass Value — pass through untouched
    return jsValue
  } else if (typeof jsValue === 'string') {
    if (jsValue.includes('px')) {
      return new sass.SassNumber(Number(jsValue.replace('px', '')), 'px')
    } else if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(jsValue)) {
      return hexToColor(jsValue)
    } else {
      return new sass.SassString(jsValue, { quotes: false })
    }
  } else if (typeof jsValue === 'boolean') {
    return jsValue ? sass.sassTrue : sass.sassFalse
  } else if (typeof jsValue === 'undefined' || jsValue === null) {
    return sass.sassNull
  } else if (typeof jsValue === 'number') {
    return new sass.SassNumber(jsValue)
  } else if (Array.isArray(jsValue)) {
    return new sass.SassList(
      jsValue.map((v) => castToSass(v)),
      { separator: ',' },
    )
  } else if (typeof jsValue === 'object') {
    const map = new Map()
    for (const key of Object.keys(jsValue)) {
      map.set(
        new sass.SassString(key, { quotes: false }),
        castToSass(jsValue[key]),
      )
    }
    return new sass.SassMap(map)
  } else {
    throw new Error("Don't know how to coerce: " + jsValue)
  }
}

module.exports = {
  castToSass,
}
