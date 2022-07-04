import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAxios } from '../service/axios';
import RegisterBtn from '../components/domains/RegistBtn';

function User() {

    const axios = useAxios();
    const dataInit = {
        email: '',
        login_id: '',
        name: '',
        name_kana: '',
        password: '',
        rePassword: '',
        role: 4,
        company_id: '',
    }

    const roles = [
        {id: 1, name: 'システム管理者'},
        {id: 2, name: '企業担当者'},
        {id: 3, name: '講師'},
        {id: 4, name: '一般'},
    ]

    const [data, setData] = useState(dataInit);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchDate = async () => {
            const result = await axios.get('/getCompanies');
            setCompanies(result.data);
        }
        fetchDate();
    })

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
                        name="email"
                        label="メールアドレス" 
                        variant="filled"
                        sx={{ width: '50%' }} 
                        value={data.email}
                        onChange={handleChange}
                        />
                </Stack>
                <Stack direction="row" justifyContent="center" spacing={5}>
                    <TextField       
                        required
                        name="login_id"      
                        label="ログインID" 
                        variant="filled"
                        sx={{ width: '50%' }}
                        value={data.login_id}
                        onChange={handleChange}
                        />
                </Stack>
                <Stack direction="row" justifyContent="center" spacing={5}>
                    <TextField 
                        required
                        name="name"
                        label="名前" 
                        variant="filled"
                        sx={{ width: '50%' }} 
                        value={data.name}
                        onChange={handleChange}
                        />
                </Stack>
                <Stack direction="row" justifyContent="center">
                    <TextField 
                        name="name_kana" 
                        label="名前（カナ）" 
                        variant="filled" 
                        sx={{ width: '50%' }}
                        value={data.name_kana}
                        onChange={handleChange}
                        />
                </Stack>
                <Stack direction="row" justifyContent="center">
                    <TextField 
                        required
                        name="password" 
                        label="パスワード" 
                        variant="filled" 
                        sx={{ width: '50%' }}
                        value={data.password}
                        onChange={handleChange}
                        />
                </Stack>
                <Stack direction="row" justifyContent="center">
                    <TextField 
                        required
                        name="rePassword" 
                        label="パスワード（確認用）" 
                        variant="filled" 
                        sx={{ width: '50%'}}
                        value={data.rePassword}
                        onChange={handleChange}
                        />
                </Stack>
                <Stack direction="row" justifyContent="center">
                    <FormControl sx={{ width: '50%'}}>
                        <InputLabel>権限</InputLabel>
                        <Select
                            required
                            name="role"
                            label="権限"
                            value={data.role}
                            onChange={handleChange}
                        >
                                {roles.map(e => {
                                    return (
                                        <MenuItem 
                                            value={e.id}
                                            key={e.id}
                                        >
                                            {e.name}
                                        </MenuItem>
                                    );
                                })}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction="row" justifyContent="center">
                    <FormControl sx={{ width: '50%'}}>
                        <InputLabel>所属企業</InputLabel>
                        <Select
                            required
                            name="company_id"
                            label="所属企業"
                            value={data.company_id}
                            onChange={handleChange}
                        >
                                {companies.map(e => {
                                    return (
                                        <MenuItem 
                                            value={e.id}
                                            key={e.id}
                                        >
                                            {e.name}
                                        </MenuItem>
                                    );
                                })}
                        </Select>
                    </FormControl>
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
                      endpoint={'/user'}
                      data={data}
                    /> 
                </Stack>
            </Stack>
          </Box>
        </Container>
    );
}

export default User;
