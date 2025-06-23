import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputField from './InputField'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <InputField/>
    </>
  )
}

export default App
