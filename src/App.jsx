import { useState } from 'react'
import './App.css'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <div className='h-full w-full bg-white'></div>
    <Footer/>
     
    </>
  )
}

export default App
