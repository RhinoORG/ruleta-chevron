const words = [ 
  { 
    track: "refran venezolano", 
    phrase: "camaron que se duerme se lo lleva la corriente" 
  }, 
  { 
    track: "trabalenguas popular", 
    phrase: "pablito clavo un clavito un clavito clavo pablito" 
  },
  { 
    track: "WILLIAM RALPH INGE", 
    phrase: "el juego es una enfermedad propia de barbaros superficialmente civilizados" 
  },
  { 
    track: "humildad", 
    phrase: "pensar que no eres mejor que nadie ya te hace mejor que todos" 
  },
  { 
    track: "refran venezolano", 
    phrase: "el que se fue para la villa perdio su silla" 
  },
  { 
    track: "trabalenguas popular", 
    phrase: "tres tristes tigres toman trigo en un trigal" 
  },
] 
 
export function getWord () { 
    return words[Math.floor(Math.random() * words.length)] 
}

export const KEYS = [
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'ñ',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm'
]
