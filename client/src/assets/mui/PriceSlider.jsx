import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import React from 'react';
export const PriceSlider = ({ value, onChangeCommitted, onChange }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Slider
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
