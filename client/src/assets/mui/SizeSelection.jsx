import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SizeSelection = ({ width, sizes, onChange, value, name, disabled }) => {
  // eslint-disable-next-line
  const [size, setSize] = useState(Number(sizes));
  const handleChange = (event) => {
    setSize(Number(event.target.value));
  };

  return (
    <FormControl sx={{ minWidth: 20 }} style={{ width: width }} size='small'>
      <Select
        defaultValue={''}
        labelId='demo-select-small'
        id='demo-select-small'
        value={value}
        inputProps={{ 'aria-label': 'Without label' }}
        onChange={onChange || handleChange}
        name={name || null}
        disabled={disabled ? true : false}
      >
        {sizes &&
          sizes.map((size, index) => (
            <MenuItem
              disabled={disabled ? true : false}
              value={Number(size)}
              key={index}
            >
              {size}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default SizeSelection;
