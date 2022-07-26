import Pagination from '@mui/material/Pagination';
import React from 'react';
import Stack from '@mui/material/Stack';

export const PaginationMUI = ({ page, getPage, numOfPages }) => {
  const handleChange = (event, value) => {
    getPage(+value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        sx={{ color: 'var(--clr-mocha-2)' }}
        count={numOfPages}
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
};
