import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState, useRef } from 'react';
import RegisterBtn from './RegistBtn';

const CourseForm = () => {

  const dataInit = {
    name: '',
  }

  const [data, setData] = useState(dataInit);
  const [inputError, setInputError] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target
    setData(
        {...data, [name]: value}
    )
  }

  const validation = () => {
    if (inputRef.current) {
      const ref = inputRef.current;
      if (!ref.validity.valid) {
        setInputError(true);
        return false;
      } else {
        setInputError(false);
        return true;
      }
    }
  }

  return (
      <Box sx={{ bgcolor: 'aliceblue', p: '20px', }}>
        <Stack spacing={5}>
          <Stack direction="row" justifyContent="center" spacing={5}>
            <TextField 
              error={inputError}
              inputProps={{ maxLength: 50 }}
              inputRef={inputRef}
              required
              name="name"
              label="コース名" 
              variant="filled"
              sx={{ width: '50%' }} 
              value={data.name}
              onChange={handleChange}
              helperText={inputRef?.current?.validationMessage}
            />
          </Stack>
          <Stack direction="row" justifyContent="center">
            <Button 
              margin="normal" 
              variant="contained" 
              color="secondary"
              sx={{ m: 2 }}
              onClick={() => setData(dataInit)}
              >
              クリア
            </Button>
            <RegisterBtn 
              endpoint={'/course'}
              data={data}
              validation={validation}
            /> 
          </Stack>
        </Stack>
      </Box>
  );
}

export default CourseForm;