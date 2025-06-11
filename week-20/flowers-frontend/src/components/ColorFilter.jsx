import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'

const ColorFilter = ({ colorFilter, availableColors, onColorChange }) => {
  return (
    <FormControl sx={{ minWidth: 200, margin: 2 }}>
      <InputLabel>Filter by Color</InputLabel>
      <Select
        value={colorFilter}
        label="Filter by Color"
        onChange={onColorChange}
      >
        <MenuItem value="">All Colors</MenuItem>
        {availableColors.map((color) => (
          <MenuItem key={color} value={color}>
            {color}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default ColorFilter 