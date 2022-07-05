import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState, useRef } from 'react';
import RegisterBtn from '../components/domains/RegistBtn';

function Company() {

    const dataInit = {
      name: '',
      short_name: '',
      url: '',
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
        <Container maxWidth="md">
          <Box sx={{ bgcolor: 'aliceblue', p: '20px', }} >
            <form>
            <Stack spacing={5}>
                {/* {textFields.map(e => {
                    return (
                        <Stack direction="row" justifyContent="center" spacing={5} key={e.name}>
                            <TextField 
                                error={inputError}
                                inputProps={{ maxLength: 4, pattern: "^[a-zA-Z0-9_]+$" }}
                                inputRef={inputRef}
                                required
                                name={e.name}
                                label={e.label} 
                                variant="filled"
                                sx={{ width: '50%' }} 
                                value={data[e.name]}
                                onChange={handleChange}
                                helperText={inputRef?.current?.validationMessage}
                                />
                        </Stack>
                    )
                })} */}
                <Stack direction="row" justifyContent="center" spacing={5} >
                  <TextField 
                    error={inputError}
                    inputProps={{ maxLength: 50 }}
                    inputRef={inputRef}
                    required
                    name="name"
                    label="企業名" 
                    variant="filled"
                    sx={{ width: '50%' }} 
                    value={data.name}
                    onChange={handleChange}
                    helperText={inputRef?.current?.validationMessage}
                  />
                </Stack>
                <Stack direction="row" justifyContent="center" spacing={5} >
                  <TextField 
                    inputProps={{ maxLength: 30 }}
                    name="short_name"
                    label="企業名（略称）" 
                    variant="filled"
                    sx={{ width: '50%' }} 
                    value={data.short_name}
                    onChange={handleChange}
                  />
                </Stack>
                <Stack direction="row" justifyContent="center" spacing={5}>
                  <TextField 
                    inputProps={{ maxLength: 255, }}
                    name="url"
                    label="url"
                    variant="filled"
                    sx={{ width: '50%' }} 
                    value={data.url}
                    onChange={handleChange}
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
                      endpoint={'/company'}
                      data={data}
                      validation={validation}
                    /> 
                </Stack>
            </Stack>
            </form>
          </Box>
        </Container>
    );
}

export default Company;
