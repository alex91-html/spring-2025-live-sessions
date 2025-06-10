import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [flowers, setFlowers] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchFlowers = () => {
    setLoading(true)
    fetch("http://localhost:8080/flowers")
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok')
      })
      .then(data => {
        setFlowers(data)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchFlowers()
  }, [])

  const handleClick = () => {
    setLoading(true)
    fetch("http://localhost:8080/flowers?color=red")
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok')
      })
      .then(data => {
        setFlowers(data)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (loading) {
    return <p>LOADING...</p>
  }

  return (
    <>
      <h1>Flower Power!</h1>
      <button onClick={handleClick}>Get red flowers</button>
      {flowers.length && flowers.map(flower => <p>{flower.name} - {flower.color}</p>)}
    </>
  )
}

export default App
