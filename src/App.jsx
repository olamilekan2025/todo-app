import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TodoApp from './TodoApp.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <TodoApp />
    </div>
  )
}

export default App
