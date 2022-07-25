import Pagination from '@mui/material/Pagination';
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';

export const PaginationMUI = ({ page, getPage, numOfPages }) => {
  const handleChange = (event, value) => {
    getPage(+value);
  };

  return (
    <Stack spacing={2}>
      <Pagination count={numOfPages} page={page} onChange={handleChange} />
    </Stack>
  );
};
