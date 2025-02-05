import { useCallback, useEffect, useState } from "react"
import { useLocation } from "wouter"
import {
  EndGame,
  Keyboard,
  Layout,
  PlayersHUD,
  FinalRoulete,
  Screen
} from "../components"
import { getWord } from "../constants"
import { usePlayers } from "../context/PlayersContext"

function FinalGame() {
  const { players, playerTurn, setPlayerTurn, createPlayers } = usePlayers();
  const [wordToGess, setwordToGess] = useState(getWord())
  const [guessedLetters, setGuessedLetters] = useState([])
  const [showRuleta, setShowRuleta] = useState(false)
  const [showAction, setShowAction] = useState(true)
  const [showFinishGameModal, setFinishGameModal] = useState(false)
  const [step, setStep] = useState(0)
  const [count, setCount] = useState(0)
  const [movements, setMovements] = useState(0)
  const [quiebra, setQuiebra] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const [location, navigate] = useLocation();
  console.log(wordToGess.phrase);
  const handleClickRuleta = () => {
    setShowRuleta(true);
    setShowAction(false);
    setCount(0);
    setMovements(0);
  };


  const setMovementsToPlay = (n) => {
    setMovements(n);
  };

  const sumCount = () => {
    setCount(count + 1);
  };

  const removeRuletaFromRuleta = () => {
    setShowRuleta(false);
  };

  const handleFinishGame = () => {
    setGuessedLetters([]);
    window.localStorage.removeItem("players");
    navigate("/");
    setPlayerTurn(0);
    setFinishGameModal(false);
  };

  const changePlayerTurn = () => {
    const playersCantity = players.length;

    if (playerTurn < playersCantity - 1) {
      setPlayerTurn(playerTurn + 1);
    }
    if (playerTurn === playersCantity - 1) {
      setPlayerTurn(0);
    }

    setShowAction(true);
  };

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGess.phrase.includes(letter)
  );

  const correctLetters = guessedLetters.filter((letter) =>
    wordToGess.phrase.includes(letter)
  );

  let isWinnerArray = [];

  isWinnerArray.push(wordToGess.phrase.split(""));
  guessedLetters.push(" ");

  const isWinner = isWinnerArray[0].every((letter) =>
    correctLetters.includes(letter)
  );
  console.log(correctLetters, "letters");
  console.log(isWinnerArray[0], "IsWinner");
  console.log(isWinner);

  /**
   * Funcion para calcular el mayor puntuaje ganador o empate
   * @param
   * @returns 
   */

  //Puntos completos de la partida
  let pts = [];

  players.map((player) => {
    pts.push(player.puntos);
  });

  //Mayor puntuacion
  const preWinnerPts = Math.max(...pts);

  //Player empatados, con nombres y puntos
  let tiePoints = [];

  players.map((player) => {
    if (player.puntos === preWinnerPts) {
      tiePoints.push(player)
    }
  })


  // Funcion para cambiar turno si se lanza letra equivocada
  const addGuessedLetter = useCallback(
    (letter) => {
      if (guessedLetters.includes(letter) || isWinner) {
        return;
      }
      if (!wordToGess.phrase.includes(letter) && count === movements) {
        changePlayerTurn();
      }
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner]
  );

  const handleClickRevelar = () => {
    let player = JSON.stringify(players[playerTurn])
    setStep(1)
    setShowAction(false)
    
    console.log(`PlayerTurnPoints: ${player}`)
  }


  //Letra no encontrada en la frase (ROJO)
  useEffect(() => {
    const handler = (e) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();

      if (!wordToGess.phrase.includes(key)) {
        const playersCantity = players.length - 1;

        if (playerTurn < playersCantity) {
          setPlayerTurn(playerTurn + 1);
        }
        if (playerTurn === playersCantity) {
          setPlayerTurn(0);
        }
      }
    };

    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  // Letra encontrada en la frase VERDE
  useEffect(() => {
    const handler = (e) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) {
        return;
      }

      e.preventDefault();

      addGuessedLetter(key);

      if (!wordToGess.phrase.includes(key)) {
        changePlayerTurn();
      }
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e) => {
      const key = e.key;
      if (key !== "Enter") {
        return;
      }

      e.preventDefault();

      if (!wordToGess.phrase.includes(key)) {
        console.log(key);
      }

      setGuessedLetters([]);

    }

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    if (wordToGess.phrase.split() === guessedLetters) {
      console.log("winner");
    }
    if (isWinner === true && tiePoints.length === 1) {
      setStep(1);
      createPlayers(tiePoints)
    }

    if (isWinner === true && tiePoints.length >= 2) {
      setStep(2);
      createPlayers(tiePoints)
    }
  }, [isWinner]);

  return (
    <Layout>
      {step === 0 && (
        <>
          <PlayersHUD playerActive={playerTurn} />

          <EndGame />
          <Screen
            guessedLetters={guessedLetters}
            track={wordToGess.track}
            wordTo={wordToGess.phrase}
          />
          <div className="max-w-3xl">
            <Keyboard
              disabled={isWinner}
              addGuessedLetter={addGuessedLetter}
              activeLetters={guessedLetters.filter((letter) =>
                wordToGess.phrase.includes(letter)
              )}
              inactiveLetters={incorrectLetters}
              sumCount={sumCount}
              wordTo={wordToGess.phrase}
            />
          </div>
        </>
      )}

      {step === 1 && (
        <>
          {players.map((player, index) => {
            if (player.puntos === preWinnerPts) {
              return (
                <div key={index} className="transition relative flex items-center gap-2 border-2 border-cyan-500 rounded-xl px-2 py-2 mb-10">
                  <header className="w-12 h-16 rounded-xl bg-cyan-500 flex items-center justify-center text-2xl font-medium text-gray-200">
                    J{index + 1}
                  </header>
                  <div className=" flex items-center justify-center flex-col">
                    <span className="  text-white uppercase text-xs font-medium ">
                      {player.name}
                    </span>
                    <div className="mb-2 text-xl font-medium rounded-xl flex items-center justify-center text-gray-200 w-24 z-20">
                      PTS: {player.puntos}
                    </div>
                  </div>
                </div>
              );
            }
          })}
          <h1 className="text-white text-4xl font-bold uppercase">
            ¡En hora buena, has ganado el juego!
          </h1>
        </>
      )}

      {showAction !== false && (
        <section className="h-full w-full bg-black/60 backdrop-blur-sm  absolute flex flex-col justify-center items-center">
          <div className="right-20 z-30 w-60 h-60 flex flex-col justify-center items-center">
            <div className="animate-ping absolute w-36 h-36 rounded-full opacity-75 bg-green-600"></div>
            <button
              onClick={handleClickRuleta}
              className="relative z-30 w-40 h-40 rounded-full bg-green-600 text-white text-2xl uppercase font-black [letter-spacing:0.1em] hover:[letter-spacing:0.25em] transition hover:scale-105"
            >
              Girar
            </button>
          </div>
          <div className="flex justify-around items-center flex-row w-5/12">
              <button
                onClick={() => {
                  setStep(1)
                  setShowAction(false)
                 }}
                className="w-28 h-28 p-4 flex items-center bg-gray-800 justify-center rounded-full border-4 border-gray-800 text-white text-lg uppercase font-black transition hover:scale-105 btn-shadow"
              >
                Revelar
              </button>

              <button
                onClick={() => {
                  setStep(5)
                  setShowAction(false)
                }}
                className="w-28 h-28 p-4 flex items-center bg-gray-800 justify-center rounded-full border-4 border-gray-800 text-white text-lg uppercase font-black transition hover:scale-105 btn-shadow"
              >
                Quebrar
              </button>
            </div>
        </section>
      )}
      {step === 5 && (
            <div className='fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm  flex justify-center items-center flex-col'>
              <div className='text-white text-4xl font-bold uppercase'> Has perdido el juego, gracias por participar!! </div>
             </div>
      )}
      <FinalRoulete
        isVisible={showRuleta}
        playerActive={playerTurn}
        removeRuletaFromRuleta={removeRuletaFromRuleta}
        setMovementsToPlay={setMovementsToPlay}
        quiebra={quiebra}
      />
      {showFinishGameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-50 flex justify-center items-center flex-col">
          <div className="w-[450px] h-52 bg-slate-800 flex items-center flex-col justify-evenly rounded-md">
            <h1 className="text-center my-8 font-bold text-white text-3xl">
              ¿Quieres finalizar el Juego?
            </h1>
            <div className="flex justify-center items-center gap-6">
              <button
                className="bg-lime-500 px-5 py-2 rounded-xl font-semibold relative text-white"
                onClick={handleFinishGame}
              >
                Aceptar
              </button>
              <button
                className="border border-gray-200 px-5 py-2 rounded-xl font-semibold text-white"
                onClick={() => setFinishGameModal((prev) => !prev)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        className="absolute w-14 h-14 rounded-full right-3 top-2 border-4 bg-gray-800 border-gray-800 text-white text-2xl uppercase font-black transition hover:scale-105 btn-shadow"
        onClick={() => setFinishGameModal((prev) => !prev)}
      >
        X
      </button>
    </Layout>
  );
}

export default FinalGame;
