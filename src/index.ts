// Colour utility functions.
type colour = [number, number, number, number];

function rgba(red: number, green: number, blue: number, alpha: number): colour {
  return [red, green, blue, alpha];
}

function rgb(red: number, green: number, blue: number): colour {
  return rgba(red, green, blue, 0);
}

function hex(hex: string): colour {
  return [parseInt(hex.slice(0, 2), 16) || 0, parseInt(hex.slice(0, 2), 16) || 0, parseInt(hex.slice(0, 2), 16) || 0, parseInt(hex.slice(0, 2), 16) || 0];
}

// Styles cos some peeps are afraid of css.
enum PaddingPresets {
  DEFAULT,
  NONE
}

enum SizePresets {
  DEFAULT,
  FULL
}

type padding = [number, number, number, number];
function pad(top: number, right: number, bottom: number, left: number): padding {
  return [top, right, bottom, left];
}

interface IConsentStyle {
  popup?: {
    width?: SizePresets | number,
    height?: SizePresets | number,
    top?: SizePresets | number,
    bottom?: SizePresets | number,
    background?: colour,
    rounded?: boolean,
    fadeIn: number,
    fadeOut: number
  },
  message?: {
    text?: colour,
    padding?: padding | PaddingPresets | number
  },
  allow?: {
    background?: colour,
    border?: colour,
    text?: colour,
    rounded?: boolean,
    padding?: padding | PaddingPresets | number
  },
  deny?: {
    background?: colour,
    border?: colour,
    text?: colour,
    rounded?: boolean,
    padding?: padding | PaddingPresets | number
  },
  link?: {
    text?: colour,
    padding?: padding | PaddingPresets | number
  }
}

// The actual contents of the cookie popup.
interface IConsentContent {
  message?: string,
  link?: string,
  allow?: string,
  deny?: string
}

// Presets if you cant be fucked configuring everything yourself.
interface IConsentPresets {
  position: ConsentPosition,
  layout: ConsentLayout,
  palette: ConsentPalette
}

enum ConsentPosition {
  BANNER_BOTTOM,
  BANNER_TOP,
  FLOATING_TL,
  FLOATING_TR,
  FLOATING_BL,
  FLOATING_BR,
  FLOATING_CENTRE
}

enum ConsentLayout {
  BLOCK,
  ROUNDED,
  EDGELESS,
  WIRE
}

enum ConsentPalette {
  FEIN_ORANGE,
  FEIN_GREEN
}

// The actual fucking options that required all the above shitty code.
interface IConsentOptions {
  style?: IConsentStyle,
  content?: IConsentContent,
  presets?: IConsentPresets
}
