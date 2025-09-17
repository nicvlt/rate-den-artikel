import Header from './components/header/Header'
import Guessing from './components/guessing/Guessing'
import ProgressBar from './components/progressbar/ProgressBar'
import { ExperienceProvider } from './contexts/ExperienceContext'

function App() {
  return (
    <ExperienceProvider>
      <div className='flex flex-col items-center w-[550px] gap-20'>
        <Header />
        <Guessing />
        <ProgressBar />
      </div>
    </ExperienceProvider>
  )
}

export default App
