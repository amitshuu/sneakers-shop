import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_BY_TITLE } from '../../graphql/Queries/productQueries';
import { useEffect } from 'react';
const options = ['Option 1', 'Option 2'];

export const AutoComplete = () => {
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = useState('');

  const { data } = useQuery(GET_PRODUCTS_BY_TITLE, {
    variables: { searchQuery: inputValue },
  });

  useEffect(() => {
    if (data?.getProductsByTitle) {
      setValue(data?.getProductsByTitle?.title);
    }
  }, [data?.getProductsByTitle]);

  return (
    <div>
      <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
      <br />
      <Autocomplete
        value={value}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id='controllable-states-demo'
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label='Controllable' />}
      />
    </div>
  );
};
