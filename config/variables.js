// Palette: near-black, off-white, zinc neutrals, and the brand accent extracted
// from the Warden logomark — the teal/cyan top of the gradient "A" (#18a3d2).
const colors = {
  black: '#080808',
  white: '#fafafa',
  accent: '#18a3d2',
  grey: '#27272a',
}

const themes = {
  light: {
    layout: colors.accent,
    primary: colors.black,
    secondary: colors.black,
    contrast: colors.white,
    dot: colors.grey,
    'invert-layout': colors.black,
  },
  dark: {
    layout: colors.black,
    primary: colors.black,
    secondary: colors.white,
    contrast: colors.accent,
    dot: colors.grey,
    'invert-layout': colors.accent,
  },
}

const breakpoints = {
  mobile: '800px',
}

const viewports = {
  mobile: {
    width: '375px',
    height: '650px',
  },
  desktop: {
    width: '1440px',
    height: '816px',
  },
}

module.exports = {
  colors,
  themes,
  breakpoints,
  viewports,
}
