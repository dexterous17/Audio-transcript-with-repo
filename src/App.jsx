import './App.css'
import Menu from './Components/Menu'
import SideBar from './Components/SideBar'
import Main from './Components/Main'
import { useState } from 'react';

function App() {
  const [selectedCard, setSelectedCard] = useState(null);

  // Handler to reset to default (welcome card)
  const handleCreateNewRecording = () => setSelectedCard(null);

  return (
    <div className='app'>
      <Menu />
      <div className='container'>
        <SideBar onCardClick={setSelectedCard} onCreateNewRecording={handleCreateNewRecording} />
        <Main selectedCard={selectedCard} />
      </div>
    </div>
  )
}

export default App
  