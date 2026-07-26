import { useState } from 'react'
import './App.css'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Hero from './sections/Hero'
import SplashScreen from './components/layouts/SplashScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <SplashScreen/>
    <Header/>
    <Hero/>
    <Footer/>
     
    </>
  )
}

export default App
