export interface ColorPair {
  color: string
  bg: string
  border: string
}

export interface Theme {
  isDark: boolean
  text: string
  soft: string
  mute: string
  card: string
  cardBorder: string
  cardShadow: string
  inputBg: string
  navBg: string
  mobileBg: string
  pairs: {
    purple: ColorPair
    blue:   ColorPair
    green:  ColorPair
    orange: ColorPair
    pink:   ColorPair
    gold:   ColorPair
  }
}

export const dark: Theme = {
  isDark: true,
  text:      '#F5F0FF',
  soft:      '#C4B5FD',
  mute:      '#A78BFA',
  card:      'rgba(255,255,255,0.06)',
  cardBorder:'1px solid rgba(168,85,247,0.2)',
  cardShadow:'0 8px 32px rgba(0,0,0,0.4)',
  inputBg:   'rgba(255,255,255,0.07)',
  navBg:     'rgba(15,5,32,0.78)',
  mobileBg:  'rgba(15,5,32,0.94)',
  pairs: {
    purple: { color:'#A855F7', bg:'rgba(168,85,247,0.12)', border:'rgba(168,85,247,0.25)' },
    blue:   { color:'#38BDF8', bg:'rgba(56,189,248,0.12)',  border:'rgba(56,189,248,0.25)'  },
    green:  { color:'#4ADE80', bg:'rgba(74,222,128,0.12)',  border:'rgba(74,222,128,0.25)'  },
    orange: { color:'#FB923C', bg:'rgba(251,146,60,0.12)',  border:'rgba(251,146,60,0.25)'  },
    pink:   { color:'#F472B6', bg:'rgba(244,114,182,0.12)', border:'rgba(244,114,182,0.25)' },
    gold:   { color:'#FBBF24', bg:'rgba(251,191,36,0.12)',  border:'rgba(251,191,36,0.25)'  },
  },
}

export const light: Theme = {
  isDark: false,
  text:      '#2E1065',
  soft:      '#5B21B6',
  mute:      '#8B5CF6',
  card:      'rgba(255,255,255,0.65)',
  cardBorder:'1.5px solid rgba(255,255,255,0.85)',
  cardShadow:'0 8px 32px rgba(124,58,237,0.1)',
  inputBg:   'rgba(255,255,255,0.7)',
  navBg:     'rgba(255,255,255,0.55)',
  mobileBg:  'rgba(255,255,255,0.88)',
  pairs: {
    purple: { color:'#7C3AED', bg:'rgba(124,58,237,0.08)',  border:'rgba(124,58,237,0.2)'  },
    blue:   { color:'#0369A1', bg:'rgba(3,105,161,0.08)',   border:'rgba(3,105,161,0.2)'   },
    green:  { color:'#15803D', bg:'rgba(21,128,61,0.08)',   border:'rgba(21,128,61,0.2)'   },
    orange: { color:'#C2410C', bg:'rgba(194,65,12,0.08)',   border:'rgba(194,65,12,0.2)'   },
    pink:   { color:'#DB2777', bg:'rgba(219,39,119,0.08)',  border:'rgba(219,39,119,0.2)'  },
    gold:   { color:'#D97706', bg:'rgba(217,119,6,0.08)',   border:'rgba(217,119,6,0.2)'   },
  },
}
