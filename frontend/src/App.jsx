import Header from './components/header/Header'
import Guessing from './components/guessing/Guessing'
import ProgressBar from './components/progressbar/ProgressBar'
import { ExperienceProvider } from './contexts/ExperienceContext'

function App() {
  return (
    <ExperienceProvider>
      <div className='flex justify-center sm:items-center min-h-screen'>
        <div className='flex flex-col items-center justify-between sm:max-h-[67%] sm:w-[550px] sm:gap-20'>
          <Header />
          <Guessing />
          <ProgressBar />
        </div>
      </div>
    </ExperienceProvider>
  )
}

export default App
