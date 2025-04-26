import './App.css'
import Menu from './Components/Menu'
import SideBar from './Components/SideBar'
import Main from './Components/Main'
function App() {
  return (
    <div className='app'>
      <Menu />
      <div className='container'>
        <SideBar />
        <Main/>
      </div>
    </div>
  )
}

export default App
  