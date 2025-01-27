import Controls from "./components/Controls"
import Screen from "./components/Screen"
import GameProvider from "./contexts/GameProvider"

function App() {

  return (
    <div>
      <GameProvider>
          <div className="flex place-content-center pt-[30px] md:pt-[130px]">
            <Screen />
          </div>
          <Controls />
      </GameProvider>
    </div>
  )
};

export default App;
