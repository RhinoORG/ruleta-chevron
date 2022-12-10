const words = [ 
  { 
    track: "Refran venezolano", 
    phrase: "camaron que se duerme se lo lleva la corriente" 
  }, 
  { 
    track: "Trabalenguas popular", 
    phrase: "pablito clavo un clavito un clavito clavo pablito" 
  },
  { 
    track: "Willian Ralph Inge", 
    phrase: "el juego es una enfermedad propia de barbaros superficialmente civilizados" 
  },
  { 
    track: "Humildad", 
    phrase: "pensar que no eres mejor que nadie ya te hace mejor que todos" 
  },
  { 
    track: "Refran", 
    phrase: "el que se fue para la villa perdio su silla" 
  },
  { 
    track: "Trabalenguas Hispano", 
    phrase: "tres tristes tigres toman trigo en un trigal" 
  },
  { 
    track: "Carolina Herrera", 
    phrase: "educacion es el principal vestido para la fiesta de la vida" 
  },
   { 
    track: "Jose Antonio Abreu", 
    phrase: "lo mas tragico no es que un hombre no tenga zapatos que ponerse sino que nunca haya sentido la necesidad de tener zapatos" 
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
