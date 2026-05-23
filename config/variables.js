// Palette mirrors the Techanv product (AIDLC-Sec): near-black, off-white,
// emerald accent, and zinc neutrals.
const colors = {
  black: '#080808',
  white: '#fafafa',
  green: '#4ade80',
  grey: '#27272a',
}

const themes = {
  light: {
    layout: colors.green,
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
    contrast: colors.green,
    dot: colors.grey,
    'invert-layout': colors.green,
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
