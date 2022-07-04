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

    const textFields = [
        {name: 'name', label: '企業名'},
        {name: 'short_name', label: '企業名（略称）'},
        {name: 'url', label: 'url'},
    ]

    return (
        <Container maxWidth="md">
          <Box sx={{ bgcolor: 'aliceblue', p: '20px', }} >
            <Stack spacing={5}>
                {textFields.map(e => {
                    return (
                        <Stack direction="row" justifyContent="center" spacing={5} key={e.name}>
                            <TextField 
                                required
                                name={e.name}
                                label={e.label} 
                                variant="filled"
                                sx={{ width: '50%' }} 
                                value={data[e.name]}
                                onChange={handleChange}
                                />
                        </Stack>
                    )
                })}
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
