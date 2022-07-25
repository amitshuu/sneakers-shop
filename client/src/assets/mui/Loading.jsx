import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading(widthProp) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        color: 'var(--clr-mocha)',
        alignItems: 'center',
        width: '100%' || widthProp,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
