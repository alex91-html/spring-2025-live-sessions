import { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material'

const FlowerForm = ({ onFlowerAdded, loading }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const flowerName = event.target.flowerName.value
    const flowerColor = event.target.flowerColor.value

    setIsSubmitting(true)
    fetch("http://localhost:8080/flowers", {
      method: "POST",
      body: JSON.stringify({ name: flowerName, color: flowerColor }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        // Reset form
        event.target.reset()
        // Notify parent component
        onFlowerAdded()
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Add New Flower</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="flowerName"
            label="Flower Name"
            placeholder="e.g., Rose, Tulip, Daisy"
            required
            fullWidth
          />
          <TextField
            name="flowerColor"
            label="Flower Color"
            placeholder="e.g., Red, Blue, Yellow"
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading || isSubmitting}
          >
            Add Flower
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default FlowerForm 