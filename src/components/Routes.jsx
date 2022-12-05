import { Route, Router } from 'wouter'
import { PlayersProvider } from '../context/PlayersContext'
import { Game, FinalGame, Home, Players } from '../pages'

function Routes () {
  return (
    <Router>
      <PlayersProvider>
        <Route path='/' component={Home} />
        <Route path='/create-players' component={Players} />
        <Route path='/game' component={Game} />
        <Route path='/final-game' component={FinalGame} />
      </PlayersProvider>
    </Router>
  )
}

export default Routes
