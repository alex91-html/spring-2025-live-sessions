import {
  Container,
  Box,
  CircularProgress,
  Typography
} from '@mui/material'

const LoadingSpinner = () => {
  return (
    <Container>
      <Box>
        <CircularProgress />
        <Typography>Loading flowers...</Typography>
      </Box>
    </Container>
  )
}

export default LoadingSpinner 