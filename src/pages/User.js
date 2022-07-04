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
import RegisterDialog from '../components/domains/RegisterDialog';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CustomizedSnackbars from '../components/domains/CustomizedSnackbarsSnackbar';

function User() {

    const axios = useAxios();
    const userInit = {
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

    const [user, setUser] = useState(userInit);
    const [open, setOpen] = useState(false);
    const [progressOpen, setProgressOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchDate = async () => {
            const result = await axios.get('/getCompanies');
            setCompanies(result.data);
        }
        fetchDate();
    })

    const handleSubmit = () => {
        setOpen(false)
        setProgressOpen(true)
        axios.post('/user', {
            ...user
        }).then(res => {
            console.log(res)
            setSeverity('success')
            setMessage('更新完了しました。')
            setSnackbarOpen(true);
        }).catch(error => {
            console.log(error)
            setSeverity('error')
            setMessage('更新に失敗しました。')
            setSnackbarOpen(true);
        }
        ).finally(() => setProgressOpen(false))
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setUser(
            {...user, [name]: value}
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
                        value={user.email}
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
                        value={user.login_id}
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
                        value={user.name}
                        onChange={handleChange}
                        />
                </Stack>
                <Stack direction="row" justifyContent="center">
                    <TextField 
                        name="name_kana" 
                        label="名前（カナ）" 
                        variant="filled" 
                        sx={{ width: '50%' }}
                        value={user.name_kana}
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
                        value={user.password}
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
                        value={user.rePassword}
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
                            value={user.role}
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
                            value={user.company_id}
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
                        onClick={() => setUser(userInit)}
                        >
                        クリア
                    </Button>
                    <Button 
                        margin="normal" 
                        variant="contained" 
                        color="secondary"
                        sx={{ m: 2 }}
                        onClick={() => setOpen(true)}
                        >
                        登録
                    </Button>
                    <RegisterDialog 
                        open={open}
                        setOpen={setOpen}
                        handleSubmit={handleSubmit}
                    />
                </Stack>
            </Stack>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={progressOpen}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <CustomizedSnackbars 
                open={snackbarOpen}
                setOpen={setSnackbarOpen}
                severity={severity}
                message={message}                    
            />
          </Box>
        </Container>
    );
}

export default User;
