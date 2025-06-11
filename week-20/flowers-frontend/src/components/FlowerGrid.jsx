import {
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Box
} from '@mui/material'
import { getSizeChipColor } from '../utils/flowerUtils'

const FlowerGrid = ({ flowers, colorFilter }) => {
  if (flowers.length === 0) {
    return (
      <Typography>
        {colorFilter ? `No ${colorFilter.toLowerCase()} flowers found` : 'No flowers in the garden yet'}
      </Typography>
    )
  }

  return (
    <Box>
      <Typography variant="h5">
        {colorFilter ? `${colorFilter} Flowers` : 'All Flowers'} ({flowers.length})
      </Typography>
      <Grid container spacing={2}>
        {flowers.map((flower, index) => (
          <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{flower.name}</Typography>
                <Chip label={flower.color} color="primary" />
                {flower.size && (
                  <Chip
                    label={flower.size}
                    sx={{ color: getSizeChipColor(flower.size) }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default FlowerGrid 