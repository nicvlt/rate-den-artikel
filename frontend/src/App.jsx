import Header from './components/header/Header'
import Guessing from './components/guessing/Guessing'

function App() {
  return (
    <div className='flex flex-col items-center w-[550px] gap-20'>
      <Header />
      <Guessing />
    </div>
  )
}

export default App
