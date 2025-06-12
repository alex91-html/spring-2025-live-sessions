import { Card, CardContent, Typography, Box, Chip } from '@mui/material'
import { getSizeChipColor } from '../utils/flowerUtils'
import { EditButton } from './EditButton'

const styles = {
  card: {
    width: 200,
    height: 200,
    mx: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flexGrow: 1,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  chipContainer: {
    display: 'flex',
    gap: 1,
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  colorChip: {
    fontWeight: 'bold'
  },
  sizeChip: {
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.08)',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.12)',
    }
  }
}

const FlowerCard = ({ flower }) => {
  return (
    <Card sx={styles.card}>
      <CardContent sx={styles.content}>
        <Typography variant="h6" component="h3" gutterBottom>
          {flower.name}
        </Typography>
        <EditButton id={flower.id}/>
        <Box sx={styles.chipContainer}>
          <Chip
            label={flower.color}
            color="primary"
            variant="outlined"
            sx={styles.colorChip}
          />
          {flower.size && (
            <Chip
              label={flower.size}
              variant="filled"
              sx={{
                ...styles.sizeChip,
                color: getSizeChipColor(flower.size),
              }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default FlowerCard 