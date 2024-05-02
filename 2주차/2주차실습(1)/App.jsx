import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div id="all">
        <h2 id="number">{count}</h2>
        <div id="buttons">
          <button onClick={() => setCount(count + 1)}>+1</button>
          <button onClick={() => setCount( count - 1)}>-1</button>
        </div>
      </div>
  
    </>
  )
}

export default App
