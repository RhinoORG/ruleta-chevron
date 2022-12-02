import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { EndGame, Keyboard, Layout, PlayersHUD, Ruleta, Screen } from '../components'
import { getWord } from '../constants'
import { usePlayers } from '../context/PlayersContext'

function Game () {
  const { players, playerTurn, setPlayerTurn } = usePlayers()
  const [wordToGuess, setWordToGuess] = useState(getWord().phrase)
  const [guessedLetters, setGuessedLetters] = useState([])
  const [showRuleta, setShowRuleta] = useState(false)
  const [showAction, setShowAction] = useState(true)
  const [showFinishGameModal, setFinishGameModal] = useState(false)
  const [step, setStep] =  useState(0)
  const [count, setCount] = useState(0)
  const [movements, setMovements] = useState(0)

  // eslint-disable-next-line no-unused-vars
  const [location, navigate] = useLocation()

  const handleClickRuleta = () => {
    setShowRuleta(true)
    setShowAction(false)
    setCount(0)
    setMovements(0)
  }

  const setMovementsToPlay = (n) => {
    setMovements(n)
  }

  const sumCount = () => {
    setCount(count + 1)
  }

  const removeRuletaFromRuleta = () => {
    setShowRuleta(false)
  }

  const handleFinishGame = () => {
    setGuessedLetters([])
    setWordToGuess(getWord())
    window.localStorage.removeItem('players')
    navigate('/create-players')
    setPlayerTurn(0)
    setFinishGameModal(false)
  }

  const changePlayerTurn = () => {
    const playersCantity = players.length


    if ((playerTurn < playersCantity - 1)) {
      setPlayerTurn(playerTurn + 1)
    }
    if ((playerTurn === playersCantity - 1)) {
      setPlayerTurn(0)
    }
  
    setShowAction(true)
  }

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  const correctLetters = guessedLetters.filter(
    letter => wordToGuess.includes(letter)
  )


  let isWinnerArray = [];

  isWinnerArray.push(wordToGuess.split(""))
  guessedLetters.push(" ")

  const isWinner = isWinnerArray[0].every(letter => correctLetters.includes(letter))

  // Funcion para cambiar turno si se lanza letra equivocada
  const addGuessedLetter = useCallback((letter) => {
      if (guessedLetters.includes(letter) || isWinner) {
        return
      }
      if (!wordToGuess.includes(letter) && (count == movements)) {
          changePlayerTurn()
      }
      setGuessedLetters(currentLetters => [...currentLetters, letter])
    },
    [guessedLetters, isWinner]
  )

  console.log(`Este es el count ${count}`)
  console.log(`Este es el movenment ${movements}`)

  //Letra no encontrada en la frase (ROJO)
  useEffect(() => {
    const handler = (e) => {
      const key = e.key
      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()

      if (!wordToGuess.includes(key)) {
        const playersCantity = players.length - 1
       
        if (playerTurn < playersCantity) {
          setPlayerTurn(playerTurn + 1)
        }
        if (playerTurn === playersCantity) {
          setPlayerTurn(0)
        }
    
      }
    }

    document.addEventListener('keypress', handler)
    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [guessedLetters])

  // Letra encontrada en la frase VERDE
  useEffect(() => {
    const handler = (e) => {
      const key = e.key
      if (!key.match(/^[a-z]$/)) {
        return
      }

      e.preventDefault()

      addGuessedLetter(key)

      if (!wordToGuess.includes(key)) {
  
        changePlayerTurn()
  
      }
    }
    
    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e) => {
      const key = e.key
      if (key !== 'Enter') {
        return
      }

      e.preventDefault()

      if (!wordToGuess.includes(key)) {
        console.log(key)
      }

      setGuessedLetters([])
      setWordToGuess(getWord())
    }

    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [guessedLetters])

  useEffect(() => { 
    if (wordToGuess.split() === guessedLetters) {console.log('winner')} 
    if(isWinner === true){
      setStep(1)
    }
  }, [isWinner])

  return (
    <Layout>
      {step === 0 && (
      <>
      <PlayersHUD playerActive={playerTurn} />
      <EndGame />
      <Screen guessedLetters={guessedLetters} track={getWord().track} wordToGuess={wordToGuess} />
      <div className='max-w-3xl'>
        <Keyboard
          disabled={isWinner}
          addGuessedLetter={addGuessedLetter}
          activeLetters={guessedLetters.filter(letter =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          sumCount={sumCount}
          wordToGuess={wordToGuess}
        />
      </div>
      </>
)}
{step === 1 && (
  <>
  <span></span>
   <h1 className='text-white text-4xl font-bold uppercase'>¡En hora buena, has ganado la ronda calificatoria!</h1>
   <p className='text-gray-200 4text-3xl my-5 uppercase font-medium'>Decifra la frase final para ganar el juego...</p>
   <button className='bg-lime-500 px-5 py-2 my-4 rounded-mfont-semibold  relative text-white' onClick={() => {setStep(2)}}>Avanzar</button>
  </>
)}
 {step === 2 && (
      <>
      <PlayersHUD playerActive={playerTurn} />
      <EndGame />
      <Screen guessedLetters={guessedLetters} track={getWord().track} wordToGuess={wordToGuess} />
      <div className='max-w-3xl'>
        <Keyboard
          disabled={isWinner}
          addGuessedLetter={addGuessedLetter}
          activeLetters={guessedLetters.filter(letter =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
        />
      </div>
      </>
)}
      {showAction !== false &&
        <section className='h-full w-full bg-black/5 backdrop-blur-sm  absolute flex justify-center items-center'>
        <div className='right-20 z-30 w-60 h-60  flex justify-center items-center'>
        <div className='animate-ping absolute w-36 h-36 rounded-full opacity-75 bg-green-600'></div>
        <button onClick={handleClickRuleta} className='relative z-30 w-40 h-40 rounded-full bg-green-600 text-white text-2xl uppercase font-black [letter-spacing:0.1em] hover:[letter-spacing:0.25em] transition hover:scale-105'>
          Girar
        </button>
        </div>
        </section>
      }
      <Ruleta isVisible={showRuleta} playerActive={playerTurn} removeRuletaFromRuleta={removeRuletaFromRuleta} setMovementsToPlay={setMovementsToPlay}/>
      {showFinishGameModal && (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-50 flex justify-center items-center flex-col'>
          <div className='w-[450px] h-52 bg-slate-800 flex items-center flex-col justify-evenly rounded-md'>
            <h1 className='text-center my-8 font-bold text-white text-3xl'>¿Quieres finalizar el Juego?</h1>
            <div className='flex justify-center items-center gap-6'>
              <button className='bg-lime-500 px-5 py-2 rounded-md font-semibold relative text-white' onClick={handleFinishGame}>Aceptar</button>
              <button className='border border-gray-200 px-5 py-2 rounded-md font-semibold text-white' onClick={() => setFinishGameModal((prev) => !prev)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      <button className='absolute w-14 h-14 rounded-full right-3 top-2 border-4 border-gray-800 text-white text-2xl uppercase font-black transition hover:scale-105 btn-shadow' onClick={() => setFinishGameModal((prev) => !prev)}>X</button>
      </Layout>
  )
}

export default Game
