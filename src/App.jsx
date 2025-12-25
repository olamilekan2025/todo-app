import { useState } from 'react'
import reactLogo from './assets/react.svg'
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
