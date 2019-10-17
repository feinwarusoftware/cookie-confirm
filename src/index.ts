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

// ----------------------------------------------
// only popup in countries with cookie law option
// ----------------------------------------------

interface IConsentStyle {
  popup?: {
    width?: SizePresets | number,
    height?: SizePresets | number,
    top?: SizePresets | number,
    bottom?: SizePresets | number,
    background?: colour,
    rounded?: boolean,
    fadeIn?: number,
    fadeOut?: number
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
  message: string,
  link: string,
  allow: string,
  deny?: string
}

// Presets if you cant be fucked configuring everything yourself.
interface IConsentPresets {
  position?: ConsentPosition,
  layout?: ConsentLayout,
  palette?: ConsentPalette
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
  OUTLINE
}

enum ConsentPalette {
  FEIN_ORANGE,
  FEIN_GREEN
}

const themePresets = {
  [ConsentPalette.FEIN_GREEN]: {

  },
  [ConsentPalette.FEIN_ORANGE]: {

  }
};

// The actual fucking options that required all the above shitty code.
interface IConsentOptions {
  style?: IConsentStyle,
  content: IConsentContent,
  presets?: IConsentPresets
}

function createCookieConsent(options: IConsentOptions, parent: HTMLElement = document.body) { 
  // Used to apply all classes to consentMessage in one call.
  let classes: string[] = [];
  // Main consent message div.
  const consentMessage = document.createElement("div");
  classes = [...classes, "cookie-confirm"];

  // Consent message body.
  const bodySection = document.createElement("div");
  bodySection.classList.add("cookie-confirm--text");

  const consentText = document.createElement("p");
  consentText.nodeValue = options.content.message;

  const infoLink = document.createElement("a");
  infoLink.nodeValue = options.content.link;

  bodySection.appendChild(consentText);
  bodySection.appendChild(infoLink);

  // Consent message buttons.
  const buttonSection = document.createElement("div");
  buttonSection.classList.add("cookie-confirm--buttons");

  const allowButton = document.createElement("button");
  allowButton.nodeValue = options.content.allow;
  allowButton.setAttribute("action", "allow");

  if (options.content.deny) {
    const denyButton = document.createElement("button");
    denyButton.nodeValue = options.content.deny;
    allowButton.setAttribute("action", "deny");

    buttonSection.appendChild(denyButton);
  }

  buttonSection.appendChild(allowButton);

  // Add above sections to main body.
  consentMessage.appendChild(bodySection);
  consentMessage.appendChild(buttonSection);

  // Add preset styles...
  const presetDefaults: IConsentPresets = {
    position: ConsentPosition.BANNER_BOTTOM,
    layout: ConsentLayout.BLOCK,
    palette: ConsentPalette.FEIN_ORANGE
  };

  const presets = { ...(options.presets || {}), ...presetDefaults };

  // Position:
  switch (presets.position) {
    case ConsentPosition.BANNER_BOTTOM: {
      classes = [...classes, "cookie-confirm--banner", "cookie-confirm--bottom"];
      break;
    }
    case ConsentPosition.BANNER_TOP: {
      classes = [...classes, "cookie-confirm--banner", "cookie-confirm--top"];
      break;
    }
    case ConsentPosition.FLOATING_BL: {
      classes = [...classes, "cookie-confirm--floating", "cookie-confirm--bl"];
      break;
    }
    case ConsentPosition.FLOATING_BR: {
      classes = [...classes, "cookie-confirm--floating", "cookie-confirm--br"];
      break;
    }
    case ConsentPosition.FLOATING_CENTRE: {
      classes = [...classes, "cookie-confirm--floating", "cookie-confirm--centre"];
      break;
    }
    case ConsentPosition.FLOATING_TL: {
      classes = [...classes, "cookie-confirm--floating", "cookie-confirm--tl"];
      break;
    }
    case ConsentPosition.FLOATING_TR: {
      classes = [...classes, "cookie-confirm--floating", "cookie-confirm--tr"];
      break;
    }
  }
  // Layout:
  switch (presets.layout) {
    case ConsentLayout.BLOCK: {
      classes = [...classes, "cookie-confirm--block"];
      break;
    }
    case ConsentLayout.EDGELESS: {
      classes = [...classes, "cookie-confirm--edgeless"];
      break;
    }
    case ConsentLayout.ROUNDED: {
      classes = [...classes, "cookie-confirm--rounded"];
      break;
    }
    case ConsentLayout.OUTLINE: {
      classes = [...classes, "cookie-confirm--outline"];
      break;
    }
  }
  // Palette:
  // const root = document.documentElement;
  switch (presets.palette) {
    case ConsentPalette.FEIN_GREEN: {
      // root.style.setProperty();
      break;
    }
    case ConsentPalette.FEIN_ORANGE: {

      break;
    }
  }

  consentMessage.classList.add(...classes);
}
