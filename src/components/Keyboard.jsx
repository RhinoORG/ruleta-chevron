import { KEYS } from '../constants'

function Keyboard ({
  activeLetters,
  inactiveLetters,
  addGuessedLetter,
  disabled = false,
  sumCount,
  wordTo
}) {
  return (
    <div
      className='grid grid-cols-9 gap-3'
    >
      {KEYS.map(key => {
        const isActive = activeLetters.includes(key)
        const isInactive = inactiveLetters.includes(key)
        const containLetter = !wordTo.includes(key)

        return (
          <button
            onClick={() => {
              if(containLetter) {
                sumCount()
              }
              addGuessedLetter(key)
            }}
            className={`w-full letter ${isActive ? 'text-green-500 border-green-500 hover:bg-transparent cursor-not-allowed' : ''} ${
              isInactive ? 'text-red-500 border-red-500 hover:bg-transparent cursor-not-allowed' : ''
            }`}
            disabled={isInactive || isActive || disabled}
            key={key}
          >
            {key}
          </button>
        )
      })}
    </div>
  )
}

export default Keyboard
