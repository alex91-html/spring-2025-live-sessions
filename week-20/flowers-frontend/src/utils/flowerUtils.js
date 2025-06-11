// Function to get size chip color based on size value
export const getSizeChipColor = (size) => {
  const sizeValue = size?.toLowerCase()
  switch (sizeValue) {
    case 'small':
      return '#4CAF50' // Green
    case 'medium':
      return '#FF9800' // Orange
    case 'large':
      return '#F44336' // Red
    default:
      return '#757575' // Grey for unknown sizes
  }
} 