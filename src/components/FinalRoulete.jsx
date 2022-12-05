import { useState } from 'react'
import { usePlayers } from '../context/PlayersContext'

const opts = [
  { name: 'QUIEBRA', value: 0, movements: 0 },
  { name: 'PIERDE', value: 110, movements: 0 },
  { name: 'GANA', value: 210, movements: 0 },
  { name: 'GANADOR', value: 20, movements: 0 },
  // { name: 'GANADOR', value: 240, movements: 0 },

  { name: 25, value: 330, movements: 1 },
  { name: 25, value: 80, movements: 1 },
  { name: 25, value: 33.6, movements: 1 },

  { name: 50, value: 66.8, movements: 2 },
  { name: 50, value: 170, movements: 2 },
  { name: 50, value: 300, movements: 2 },

  { name: 75, value: 150, movements: 3 },
  { name: 75, value: 280, movements: 3 },
  { name: 75, value: 190, movements: 3 },

  { name: 100, value: 270, movements: 4 },
  { name: 100, value: 130, movements: 4 },
]

function getRandomIdx(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function FinalRoulete({ isVisible, playerActive, removeRuletaFromRuleta, setMovementsToPlay }) {
  const { players, setPlayerTurn, playerTurn } = usePlayers()
  const [rotateDeg, setRotateDeg] = useState(0)
  const [reward, setReward] = useState('')
  const [movements, setMovements] = useState('')
  const [finish, setFinish] = useState(true)
  const [showButton, setShowButton] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [finalRound, setFinalRound] = useState(3)

  if (!isVisible) return null

  console.log(`finalRound ${finalRound}`)

  function rotate() {
    const idx = getRandomIdx(1, 10)
    const opt = opts[idx]

    if (isClicked) {
      return null
    }

    setRotateDeg(opt.value)

    console.log(opt)

    setTimeout(() => {
      const reward = opt.name
      const player = players[playerActive]

      setReward(reward)
      setFinish(true)

      if (reward == 'GANADOR') {
        player.puntos = 100 + player.puntos;
        setShowButton(false)
        setShowMessage(true)
        setIsClicked(false)
        setFinish(false)
        setIsClicked(false)
        setReward(`Felicidades ${player.name}`)
        setMovements('Has ganado el juego')
        return
      }

      if (reward == 'QUIEBRA') {
        player.puntos = player.puntos - player.puntos;
        setFinish(true)
        setShowMessage(true)
        setMovements('Has perdido, perdedor')
        setIsClicked(false)
        setFinalRound(0)

        const playersCantity = players.length

        setTimeout(() => {
          if (playerTurn < playersCantity - 1) {
            setPlayerTurn(playerTurn + 1)
          }
          if (playerTurn === playersCantity - 1) {
            setPlayerTurn(0)
          }
          setReward('Siguiente jugador')
          setMovements(`Turno de ${player.name}`)
        }, 3000)
      }

      if (reward == 'PIERDE') {
        player.puntos = player.puntos - player.puntos;
        setFinish(true)
        setShowMessage(true)
        setReward(`Has perdido un tiro, te quedan ${finalRound - 1} tiros`)
        setMovements('Vuelve a girar')
        setIsClicked(false)
        setFinalRound(finalRound - 1)

        const playersCantity = players.length
      }

      if (reward == 'GANA') {
        setReward(`Has ganado un tiro, te quedan ${finalRound + 1} tiros`)
        setMovements('Tienes 2 letras')
        setFinish(false)
        setShowMessage(true)
        setShowButton(true)
        setIsClicked(false)
        setFinalRound(finalRound + 1)

        player.puntos = player.puntos

        const playersCantity = players.length
      }

      if (typeof reward !== 'string') {
        setShowMessage(true)
        setShowButton(true)
        setFinish(false)
        setMovements(`Haz ganado ${opt.movements + 1} letras`)
        setFinalRound(finalRound - 1)

        setMovementsToPlay(opt.movements)

        player.puntos = player.puntos + reward
      }

      window.localStorage.setItem('players', `${JSON.stringify(players)}`)
    }, 6000)

    setFinish(true)
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm  flex justify-center items-center flex-col'>

      {finish && (
        <>
          <div className='w-3 h-14  relative -bottom-6   z-50' >
            <svg height="200" width="200">
              <polygon points="10,100 25,0 0,0" fill="red" />
            </svg>
          </div>

          <img src='/ruletaFinal.png' style={{ transition: '5s all', transform: `rotate(${(rotateDeg)}deg` }} className='w-[400px] h-[400px]   rounded-full' onClick={() => { 
            if (finalRound === 0) {
              return
            } else {
              rotate(); 
              setIsClicked(true) 
            }
            
            }} alt='' />
        </>)
      }

      {showMessage && <>
        <h2 className='text-gray-200 text-5xl my-7 uppercase font-medium'>{reward}</h2>
        <h4 className='text-gray-200 4text-3xl my-5 uppercase font-medium'>{movements}</h4>
      </>
      }

      {showButton &&
        <button
          className='bg-lime-500 px-5 py-2 my-4 rounded-xl rounded-mfont-semibold  relative text-white'
          onClick={() => {
            setFinish(true);
            removeRuletaFromRuleta(false)
            setShowMessage(false)
            setShowButton(false)
            setIsClicked(false)
          }}>
          Jugar
        </button>
      }
    </div>
  )
}
export default FinalRoulete
