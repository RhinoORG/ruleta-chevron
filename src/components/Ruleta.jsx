import { useState } from 'react'
import { usePlayers } from '../context/PlayersContext'

const opts = [
  { name: 'QUIEBRA', value: 0, movements: 0 },
  { name: 'QUIEBRA', value: 110, movements: 0 },
  { name: 'PIERDE TURNO', value: 210, movements: 0 },
  { name: 'COMODIN', value: 20, movements: 0 },
  { name: 'COMODIN', value: 240, movements: 0 },

  { name: 25, value: 330, movements: 1 },
  { name: 25, value: 170, movements: 1 },
  { name: 25, value: 80, movements: 1 },
  { name: 25, value: 33.6, movements: 1 },

  { name: 50, value: 300, movements: 2 },
  { name: 50, value: 150, movements: 2 },
  { name: 50, value: 66.8, movements: 2 },

  { name: 75, value: 280, movements: 3 },
  { name: 75, value: 190, movements: 3 },

  { name: 100, value: 270, movements: 4 },
  { name: 100, value: 130, movements: 4 },
]

function getRandomIdx(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function Ruleta({ isVisible, playerActive, removeRuletaFromRuleta }) {
  const { players, setPlayerTurn, playerTurn } = usePlayers()
  const [rotateDeg, setRotateDeg] = useState(0)
  const [reward, setReward] = useState('')
  const [movements, setMovements] = useState('')
  const [finish, setFinish] = useState(true)
  const [showButton, setShowButton] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  if (!isVisible) return null

  function rotate() {
    const idx = getRandomIdx(1, 10)
    const opt = opts[idx]

    console.log(opt)

    setRotateDeg(opt.value)

    setTimeout(() => {
      const reward = opt.name
      const player = players[playerActive]

      setReward(reward)
      setFinish(true)

      if (reward == 'COMODIN') {
        player.puntos = 100 + player.puntos;
        setShowButton(false)
        setFinish(true)
        setShowMessage(true)
        setMovements('Has ganado 500 pts. Puedes girar la ruleta de nuevo')
        return
      }

      if (reward == 'QUIEBRA') {
        player.puntos = player.puntos - player.puntos;
        setFinish(true)
        setShowMessage(true)
        setMovements('Te has quedado sin puntos')

        const playersCantity = players.length

        if (playerTurn < playersCantity - 1) {
          setPlayerTurn(playerTurn + 1)
        }
        if (playerTurn === playersCantity - 1) {
          setPlayerTurn(0)
        }
      }

      if (reward == 'PIERDE TURNO') {
        setMovements('Haz perdido el turno')
        setFinish(true)
        setShowMessage(true)
        setShowButton(false)
        player.puntos = player.puntos

        const playersCantity = players.length

        if (playerTurn < playersCantity - 1) {
          setPlayerTurn(playerTurn + 1)
        }
        if (playerTurn === playersCantity - 1) {
          setPlayerTurn(0)
        }

      }

      if (typeof reward !== 'string') {
        setShowMessage(true)
        setShowButton(true)
        setFinish(false)
        setMovements(`Haz ganado ${opt.movements} letras`)

        player.puntos = player.puntos + reward
      }

      window.localStorage.setItem('players', `${JSON.stringify(players)}`)
    }, 6000)

    setFinish(true)
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm  flex justify-center items-center flex-col'>

      {finish && (
        <>
          <div className='w-3 h-14 bg-cyan-500 rounded-b-xl relative -bottom-6   z-50' />

          <img src='/ruleta.png' style={{ transition: '5s all', transform: `rotate(${rotateDeg}deg` }} className='w-[400px] h-[400px]   rounded-full' onClick={rotate} alt='' />
        </>)
      }

      {showMessage && <>
        <h2 className='text-gray-200 text-5xl my-7 uppercase font-medium'>{reward}</h2>
        <h4 className='text-gray-200 4text-3xl my-5 uppercase font-medium'>{movements}</h4>
      </>
      }

      {showButton &&
        <button
          className='bg-lime-500 px-5 py-2 my-4 rounded-mfont-semibold  relative text-white'
          onClick={() => {
            setFinish(true);
            removeRuletaFromRuleta(false)
            setShowMessage(false)
            setShowButton(false)
          }}>
          Jugar
        </button>
      }
    </div>
  )
}
export default Ruleta
