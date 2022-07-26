import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import React from 'react';
export const PriceSlider = ({ value, onChangeCommitted, onChange }) => {
  return (
    <Box sx={{ width: '100%', color: '#e45d5d' }}>
      <Slider
        sx={{
          color: '#e45d5d',
          height: '0.5vh',
          width: '100%',
        }}
        value={value}
        min={199}
        max={1000}
        step={1}
        onChange={onChange}
        onChangeCommitted={onChangeCommitted}
        valueLabelDisplay='auto'
      />
    </Box>
  );
};
