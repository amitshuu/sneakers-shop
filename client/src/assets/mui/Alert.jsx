import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function MuiError({
  value,
  type,
  width,
  margin,
  alignItems,
  children,
}) {
  return (
    <Stack
      sx={{ width: '100%' }}
      spacing={1}
      style={{
        padding: '0.5rem 0 0.30rem',
        display: 'flex',
        width: width,
        margin: margin,
        alignItems: alignItems,
      }}
    >
      <Alert severity={type} style={{ justifyContent: 'start' }}>
        {value || children}
      </Alert>
    </Stack>
  );
}
