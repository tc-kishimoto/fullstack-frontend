import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function User() {

    const userInit = {
        mail: '',
        loginId: '',
        name: '',
        nameKana: '',
        password: '',
        rePassword: '',
        role: 4,
    }

    const roles = [
        {id: 1, name: 'システム管理者'},
        {id: 2, name: '企業担当者'},
        {id: 3, name: '講師'},
        {id: 4, name: '一般'},
    ]

    const [user, setUser] = useState(userInit);

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
                        name="mail"
                        label="メールアドレス" 
                        variant="filled"
                        sx={{ width: '50%' }} 
                        value={user.mail}
                        onChange={handleChange}
                        />
                </Stack>
                <Stack direction="row" justifyContent="center" spacing={5}>
                    <TextField       
                        name="loginId"      
                        label="ログインID" 
                        variant="filled"
                        sx={{ width: '50%' }}
                        value={user.loginId}
                        onChange={handleChange}
                        />
                </Stack>
                <Stack direction="row" justifyContent="center" spacing={5}>
                    <TextField 
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
                        name="nameKana" 
                        label="名前（カナ）" 
                        variant="filled" 
                        sx={{ width: '50%' }}
                        value={user.nameKana}
                        onChange={handleChange}
                        />
                </Stack>
                <Stack direction="row" justifyContent="center">
                    <TextField 
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
                                        >{e.name}</MenuItem>
                                    );
                                })}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction="row" justifyContent="center">
                    <Button 
                        margin="normal" 
                        variant="contained" 
                        sx={{ m: 2 }}
                        onClick={() => setUser(userInit)}
                        >
                        クリア
                    </Button>
                    <Button 
                        margin="normal" 
                        variant="contained" 
                        sx={{ m: 2 }}
                        onClick={() => console.log(user)}
                        >
                        新規登録
                    </Button>
                </Stack>
            </Stack>
          </Box>
        </Container>
    );
}

export default User;
