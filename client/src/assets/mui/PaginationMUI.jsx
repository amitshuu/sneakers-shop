import Pagination from '@mui/material/Pagination';
import React from 'react';
import Stack from '@mui/material/Stack';

export const PaginationMUI = ({ page, getPage, numOfPages }) => {
  const handleChange = (event, value) => {
    getPage(+value);
  };

  const paginationStyle = {
    color: 'var(--clr-mocha-2)',
    '&:hover': {
      color: 'var(--clr-mocha-3)',
    },
  };

  return (
    <Stack spacing={2}>
      <Pagination
        sx={paginationStyle}
        count={numOfPages}
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
};
