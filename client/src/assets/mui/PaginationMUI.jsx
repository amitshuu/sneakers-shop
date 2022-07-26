import Pagination from '@mui/material/Pagination';
import React from 'react';
import Stack from '@mui/material/Stack';

export const PaginationMUI = ({ page, getPage, numOfPages }) => {
  const handleChange = (event, value) => {
    getPage(+value);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        '.MuiPaginationItem-root.Mui-selected': {
          color: 'white',
          backgroundColor: 'var(--clr-mocha-2)',
          '&:hover': {
            backgroundColor: 'var(--clr-mocha-3)',
          },
        },
        '.MuiPaginationItem-root': {
          '&:hover': {
            backgroundColor: 'var(--clr-mocha-3)',
            color: 'white',
          },
        },
      }}
    >
      <Pagination count={numOfPages} page={page} onChange={handleChange} />
    </Stack>
  );
};
