const words = [ 
  { 
    track: "refran venezolano", 
    phrase: "el que se fue a la villa perdio su silla" 
  }, 
  { 
    track: "trabalenguas", 
    phrase: "pablito clavo un clavito un clavito clavo pablito" 
  } 
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
