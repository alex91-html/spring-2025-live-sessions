import { useState, useEffect } from 'react'
import { Container, Typography } from '@mui/material'
import FlowerForm from './components/FlowerForm'
import ColorFilter from './components/ColorFilter'
import FlowerGrid from './components/FlowerGrid'
import LoadingSpinner from './components/LoadingSpinner'
import './App.css'

function App() {
  const [flowers, setFlowers] = useState([])
  const [loading, setLoading] = useState(false)
  const [colorFilter, setColorFilter] = useState('')

  // Compute filtered flowers and available colors on-the-fly
  const filteredFlowers = colorFilter
    ? flowers.filter(flower => flower.color === colorFilter)
    : flowers

  const availableColors = [...new Set(flowers.map(flower => flower.color))]

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
        setFlowers(data.response)
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

  const handleColorFilterChange = (event) => {
    setColorFilter(event.target.value)
  }

  const handleFlowerAdded = () => {
    // Refresh the flower list when a new flower is added
    fetchFlowers()
  }

  if (loading && flowers.length === 0) {
    return <LoadingSpinner />
  }

  return (
    <Container>
      <Typography variant="h3">Flower Power!</Typography>

      <FlowerForm onFlowerAdded={handleFlowerAdded} loading={loading} />

      <ColorFilter
        colorFilter={colorFilter}
        availableColors={availableColors}
        onColorChange={handleColorFilterChange}
      />

      <FlowerGrid flowers={filteredFlowers} colorFilter={colorFilter} />
    </Container>
  )
}

export default App
