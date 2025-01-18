import Controls from "./components/Controls"
import Screen from "./components/Screen"
import GameProvider from "./contexts/GameProvider"

function App() {

  return (
    <div className="">
      <h1 className='text-4xl font-customFont text-center text-green-500 py-7'>My vision is augmented</h1>
      <GameProvider>
        <div className="flex place-content-center pt-10">
          <Screen />
        </div>
        <Controls />
      </GameProvider>
    </div>
  )
}

export default App
