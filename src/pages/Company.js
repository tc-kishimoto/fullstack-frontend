import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import RegisterBtn from '../components/domains/RegistBtn';

function Company() {

    const dataInit = {
      name: '',
      short_name: '',
      url: '',
    }

    const [data, setData] = useState(dataInit);

    const handleChange = (event) => {
        const { name, value } = event.target
        setData(
            {...data, [name]: value}
        )
    }

    return (
        <Container maxWidth="md">
          <Box sx={{ bgcolor: 'aliceblue', p: '20px', }} >
            <Stack spacing={5}>
                <Stack direction="row" justifyContent="center" spacing={5}>
                    <TextField 
                        required
                        name="name"
                        label="企業名" 
                        variant="filled"
                        sx={{ width: '50%' }} 
                        value={data.name}
                        onChange={handleChange}
                        />
                </Stack>
                <Stack direction="row" justifyContent="center" spacing={5}>
                    <TextField       
                        required
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
                        required
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
                    /> 
                </Stack>
            </Stack>
          </Box>
        </Container>
    );
}

export default Company;
