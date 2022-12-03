import { usePlayers } from '../context/PlayersContext'

function PlayersHUD ({ playerActive }) {
  const { players } = usePlayers()
  return (
    <aside className='absolute left-5 top-5 z-10 flex my-auto gap-10 flex-col'>
      {players.map((player, index) => (
        <div key={`player-aside-${index}`} className={`transition relative flex items-center gap-2 ${index === playerActive ? 'border-2 border-cyan-500' : ''} rounded-xl px-2 py-2`}>
          <header className='w-12 h-16 rounded-xl bg-cyan-500 flex items-center justify-center text-2xl font-medium text-gray-200'>
            J{index + 1}
          </header>
          <div className=' flex items-center justify-center flex-col'>
            <span className='  text-white uppercase text-xs font-medium '>{player.name}</span>
            <div className='mb-2 text-xl font-medium rounded-xl flex items-center justify-center text-gray-200 w-24 z-20'>PTS: {player.puntos}</div>
          </div>
        </div>
      ))}
    </aside>
  )
}

export default PlayersHUD
